import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/pro-regular-svg-icons";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ModelField } from "@/api/data/modelField";
import DisplayField from "@/components/fields/displayField";
import { FieldVisibility } from "@/components/list/table/selection/columnSelector";
import { ListTabHeader } from "@/components/header/buttons";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { DisplayTool } from "@/components/list/table/selection/displayTool";
import { DensityValue } from "@/components/list/table/selection/densityListSelector";
import { ToggleSwitch } from "@/components/generic/toggle-switch";
import templatesDictionary from "./templatesDictionary";
import { TemplateProps } from "./templateProps";
import { faCheck, faSquareCheck } from "@fortawesome/pro-solid-svg-icons";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useLogger } from "@/utils/loggerService";
import { useSearchModelQuery } from "@/store/api";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  updateScreenFilters,
  updateScreenSettings,
} from "@/store/screenContextSlice";
import { useTranslation } from "react-i18next";

/**
 * <b>Composant qui regroupe les composants nécessaires pour faire le rendu d'une liste en tableau</b>
 * <li>En-tête</li>
 * <li>Liste des éléments</li>
 * <li>Composant de séléction des lignes, densité, colonnes et pagination</li>
 */
export function ListTab({
  model,
  modelFields,
  endpoint,
  isChild = false,
  parentViewType,
}: TemplateProps) {
  const { t } = useTranslation();
  const { logger } = useLogger();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [records, setRecords] = useState<any[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const [totalResultCount, setTotalResultCount] = useState(0);

  const searchString = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.filters?.searchString || ""
  );
  const filters = useAppSelector(
    (state) => state.screenContext[location.pathname]?.filters?.filters || {}
  );
  const period = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.filters?.period || {
        start: "",
        end: "",
      }
  );
  const currentPage = useAppSelector(
    (state) => state.screenContext[location.pathname]?.filters?.currentPage || 1
  );
  const pageSize = useAppSelector(
    (state) => state.screenContext[location.pathname]?.filters?.pageSize || 25
  );
  const sortParams = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.filters?.sortParams || {
        field: "",
        order: "asc",
      }
  );

  const filtersVisible = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.settings?.filtersVisible || false
  );
  const lineDensity = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.settings?.lineDensity ||
      DensityValue.STANDARD
  );

  // Transformation des filtres de recherche
  const searchFilters = useMemo(() => {
    // Calcul des filtres
    const sf = Object.entries(filters)
      .map(([k, v]) => {
        const modelField: ModelField | undefined = modelFields.get(k);
        if (!modelField) {
          return [];
        }

        let value = v;
        if (typeof v === "object" && !Array.isArray(v)) {
          const filterValue: any = v;
          value = [
            (filterValue.start || "").split("T")[0] || filterValue.min || "",
            (filterValue.end || "").split("T")[0] || filterValue.max || "",
          ];
        }

        return [k, value];
      })
      .filter((f) => f && f.length > 0 && f[1]);

    // Application du filtre sur les périodes
    if (period.start || period.end) {
      Array.from(modelFields.values())
        .filter((f) => {
          return f.datefilter === true || f.datefilter === "1";
        })
        .forEach((f) => {
          sf.push([
            f.code,
            [
              (period.start || "").split("T")[0] || "",
              (period.end || "").split("T")[0] || "",
            ],
          ]);
        });
    }
    return sf;
  }, [filters, period]);

  // Transformation des paramètres de tri
  const searchSortParams = useMemo(() => {
    return sortParams && sortParams.field
      ? [sortParams.field, sortParams.order]
      : [];
  }, [sortParams]);

  const selectedMenu: any = useAppSelector(
    (state) => state.appContext.menu?.at(0) || {}
  );
  const currentObject = useMemo(
    () => selectedMenu?.object || model?.code ,  
    [selectedMenu?.object]
  );
  const queryEndpoint = useMemo(
    () =>
    isChild
        ? endpoint
        : selectedMenu?.endpoint || currentObject
          ? selectedMenu?.endpoint || `/objects/${currentObject}`
          : undefined,
    [currentObject, selectedMenu?.endpoint, endpoint]
  );

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useSearchModelQuery(
    {
      url: queryEndpoint,
      objectName: model?.endpoint,
      params: {
        search: searchString,
        filters: searchFilters,
        sortParams: searchSortParams,
        page: currentPage,
        pageSize,
      },
    
    },
    { skip: !queryEndpoint }
  );

  useEffect(() => {
    const data = objectData?.data;

    setRecords(data?.records || []);
    setResultCount(data?.count || data?.query?.count || 0);
    setTotalResultCount(data?.total_count || data?.query?.total_count || 0);
  }, [objectData]);

  // Liste des champs disponibles, avec leurs ordres et leurs visibilités
  const availableFields = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.settings?.availableFields ||
      Array.from<ModelField>(modelFields?.values())
        .filter((field) => {
          return (field.listable || false) === true;
        })
        .map((field) => {
          return { field, visible: true };
        })
        .sort((a, b) => {
          const firstOrder: string = (a.field.order_list || 0) as string;
          const secondtOrder: string = (b.field.order_list || 0) as string;

          return parseInt(firstOrder) - parseInt(secondtOrder);
        })
  );

  const [periodeFilterVisible, setPeriodeFilterVisible] = useState(false);
  const ckeckPeriodFilterVisible = () => {
    const p = Array.from<ModelField>(modelFields?.values()).filter((field) => field.datefilter);
    if (p.length > 0) {
      setPeriodeFilterVisible(true);
    }
    if (p.length === 0) {
      setPeriodeFilterVisible(false);
    }
  };

  useEffect(()=>{
    ckeckPeriodFilterVisible();
  },[modelFields]);

  // Liste des champs visibles
  const visibleFields = useMemo(() => {
    return availableFields
      .filter((fieldVisibility: FieldVisibility) => fieldVisibility.visible)
      .map((fieldVisibility: FieldVisibility) => fieldVisibility.field);
  }, [availableFields]);



  // Ids des éléments sélectionnés
  const selectedIds = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.settings?.selectedIds || []
  );
  // Ids des éléments non sélectionnés
  const unselectedIds = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.settings?.unselectedIds || []
  );
  // Flag de selection de tous les éléments
  const allSelected = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.settings?.allSelected || false
  );

  const lightMode = isChild;
  const readonly = isChild && parentViewType === FieldViewType.CONSULT;
  const onRestFilter=() => {
   
    dispatch(
      updateScreenFilters({
        path: location.pathname,
        params: {
          filters: null,
          currentPage: 1,
        },
      })
    );
  }
  return (
    <div className="flex flex-col w-full ">
    
        <div className="flex-none">
          <ListTabHeader
            title={lightMode ? "" : t(`${model.code}_list_title`) as string}
            subtitle={lightMode ? "" : t(`${model.code}_list_subtitle`) as string}
            model={model}
            records={records}
            modelFields={modelFields}
            search={searchString}
            sort={sortParams}
            sortButtonVisible={false}
            periodFilterVisible={periodeFilterVisible}
            filters={filters}
            period={period}
            onRestFilter={onRestFilter}
            addButtonVisible={!lightMode || !readonly}
            onAdd={() => {
              isChild? navigate(`/${currentObject}/new/${id}`): navigate(`/${currentObject}/new`);
             // navigate(`/${currentObject}/new`, { state: { uid: '014' });
            }}
            onSearchUpdate={(searchString: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { searchString, currentPage: 1 },
                })
              );
            }}
            onSortUpdate={(sortParams: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { sortParams, currentPage: 1 },
                })
              );
            }}
            onPeriodUpdate={(period: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { period, currentPage: 1 },
                })
              );
            }}
            onFiltersButtonClicked={() => {
              dispatch(
                updateScreenSettings({
                  path: location.pathname,
                  params: { filtersVisible: !filtersVisible },
                })
              );
            }}
            onFiltersUpdate={(filters: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { filters, currentPage: 1 },
                })
              );
            }}
            availableFields={availableFields}
            selectedIds={selectedIds}
            resultCount={resultCount}
            totalResultCount={totalResultCount}
          />
        </div>
        {records.length !== 0 ?  
      <>
        <div className="flex-none w-full">
          <DisplayTool
            className="my-8"
            model={model}
            availableFields={availableFields}
            currentPage={currentPage - 1}
            totalResult={totalResultCount}
            pageSize={pageSize}
            hideDensity={lightMode}
            hideColumn={lightMode}
            onChangeLine={(e: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { pageSize: e.value, currentPage: 1 },
                })
              );
            }}
            onChangePagination={({ selected }: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { currentPage: selected + 1 },
                })
              );
            }}
            onFieldVisibilityUpdate={(availableFields: any) => {
              dispatch(
                updateScreenSettings({
                  path: location.pathname,
                  params: { availableFields },
                })
              );
            }}
            onChangeDensity={(lineDensity: any) => {
              dispatch(
                updateScreenSettings({
                  path: location.pathname,
                  params: { lineDensity },
                })
              );
            }}
          />
        </div>
        <div className="relative flex-auto w-full">
          <div className="w-full overflow-x-scroll">
            <table className="min-w-full border-none">
              <thead>
                <tr>
                  <th className="sticky top-[-2rem] w-8 ">
                    <span className="flex items-center justify-center w-full h-full pr-[0.7rem]">
                      <ToggleSwitch
                        status={
                          allSelected &&
                          unselectedIds &&
                          unselectedIds.length === 0
                        }
                        iconActive={faCheck}
                        iconInactive={faCheck}
                        iconActiveClassName="text-[color:var(--toggle-alt-active-color)]"
                        onToggle={(v: boolean) => {
                          dispatch(
                            updateScreenSettings({
                              path: location.pathname,
                              params: {
                                allSelected: v,
                                selectedIds: [],
                                unselectedIds: [],
                              },
                            })
                          );
                        }}
                      />
                    </span>
                  </th>
                  {visibleFields.map((field: ModelField) => (
                    <th
                      key={field.code as string}
                      className="sticky top-[-2rem] pr-[0.7rem]"
                    >
                      <div className="flex flex-col justify-between">
                        <span
                          className="flex flex-row items-center"
                          onClick={() => {
                            const fieldName = field.field_name;
                            let order: string = sortParams.order;

                            if (sortParams.field !== fieldName) {
                              order = "asc";
                            } else {
                              order = sortParams.order === "asc" ? "desc" : "asc";
                            }

                            const newSortParams = { field: fieldName, order };
                            dispatch(
                              updateScreenFilters({
                                path: location.pathname,
                                params: {
                                  sortParams: newSortParams,
                                  currentPage: 1,
                                },
                              })
                            );
                          }}
                        >
                          {t(`fields.${field.field_name}`)}
                          {sortParams?.field &&
                            sortParams.field === field.code ? (
                            <FontAwesomeIcon
                              className="ml-[5px]"
                              icon={
                                sortParams.order === "asc"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          ) : (
                            <></>
                          )}
                        </span>
                        {filtersVisible && (
                          <DisplayField
                            className={`px-0`}
                            key={field.field_name}
                            hideLabel={true}
                            fieldName={field.code}
                            // fieldLabel={`${model?.code}_${field.code}_label`}
                            record={filters}
                            fetchedRecord={filters}
                            fieldMetadata={modelFields.get(field.field_name!)}
                            fieldsMetadataMap={modelFields}
                            viewType={FieldViewType.FILTER}
                            onUpdate={(record: any) => {
                              const updatedFilters = { ...filters, ...record };
                              dispatch(
                                updateScreenFilters({
                                  path: location.pathname,
                                  params: {
                                    filters: updatedFilters,
                                    currentPage: 1,
                                  },
                                })
                              );
                            }}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records?.map((record: any) => (
                  <tr key={record[OBJECTS_ID_FIELD]}>
                    <td>
                      <span className="flex items-center justify-center w-full h-full pr-[0.7rem]">
                        <ToggleSwitch
                          status={
                            (allSelected ||
                              selectedIds.includes(record[OBJECTS_ID_FIELD])) &&
                            !unselectedIds.includes(record[OBJECTS_ID_FIELD])
                          }
                          iconActive={faSquareCheck}
                          iconInactive={faSquare}
                          iconActiveClassName="text-[color:var(--toggle-alt-active-color)]"
                          onToggle={(selected: boolean) => {
                            const recordId = record[OBJECTS_ID_FIELD];
                            let idsOfSelected = selectedIds;
                            let idsOfUnselected = unselectedIds;

                            if (selected) {
                              // Suppression depuis les non sélectionnés
                              idsOfUnselected = idsOfUnselected.filter(
                                (id) => id !== recordId
                              );

                              // Rajout de l'objet dans la liste des sélectionnés
                              idsOfSelected = [...idsOfSelected, recordId];
                            } else {
                              // Suppression depuis les sélectionnés
                              idsOfSelected = idsOfSelected.filter(
                                (id) => id !== recordId
                              );

                              // Rajout de l'objet dans la liste des non sélectionnés
                              idsOfUnselected = [...idsOfUnselected, recordId];
                            }

                            dispatch(
                              updateScreenSettings({
                                path: location.pathname,
                                params: {
                                  selectedIds: idsOfSelected,
                                  unselectedIds: idsOfUnselected,
                                },
                              })
                            );
                          }}
                        />
                      </span>
                    </td>
                    {visibleFields.map((field: ModelField) => (
                      <td
                        key={`${field.code} ${record[OBJECTS_ID_FIELD]}`}
                        className={` whitespace-nowrap pr-[0.7rem]
                        ${lineDensity === DensityValue.COMPACT ? " h-[1rem] " : ""
                          }
                        ${lineDensity === DensityValue.STANDARD
                            ? "h-[2.25rem]"
                            : ""
                          }
                        ${lineDensity === DensityValue.CONFORTABLE
                            ? "h-[3.3rem]"
                            : ""
                          }
                      `}
                      >
                        <DisplayField
                          model={model}
                          fieldMetadata={field}
                          hideLabel={true}
                          viewType={FieldViewType.LIST}
                          record={record}
                          fetchedRecord={record}
                          fieldName={field.code}
                          fieldsMetadataMap={modelFields}
                          className={""}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-none w-full">
          <DisplayTool
            className="my-8"
            model={model}
            availableFields={availableFields}
            currentPage={currentPage - 1}
            totalResult={totalResultCount}
            pageSize={pageSize}
            hideDensity={lightMode}
            hideColumn={lightMode}
            onChangeLine={(e: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { pageSize: e.value, currentPage: 1 },
                })
              );
            }}
            onChangePagination={({ selected }: any) => {
              dispatch(
                updateScreenFilters({
                  path: location.pathname,
                  params: { currentPage: selected + 1 },
                })
              );
            }}
            onFieldVisibilityUpdate={(availableFields: any) => {
              dispatch(
                updateScreenSettings({
                  path: location.pathname,
                  params: { availableFields },
                })
              );
            }}
            onChangeDensity={(lineDensity: any) => {
              dispatch(
                updateScreenSettings({
                  path: location.pathname,
                  params: { lineDensity },
                })
              );
            }}
          />
        </div>
      </>
      :
        <div style={{ display:"flex",
                      justifyContent: "center",
                      height: "15vh",
                      alignItems: "end"
                    }}>
         <span className="text-[var(--title-bloc-list)] text-[1.7rem]">
          {t(`La liste est vide`)}
        </span>
        </div>
}
    </div>
  );
}

templatesDictionary.registerTemplate("list_tab", ListTab);
