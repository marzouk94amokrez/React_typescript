import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { faSquare } from "@fortawesome/pro-regular-svg-icons";
import { faCheck, faSquareCheck } from "@fortawesome/pro-solid-svg-icons";
import { ModelField } from "@/api/data/modelField";
import { ListTabHeader } from "@/components/header/buttons";
import { Bloc } from "@/components/list/bloc";
import { DisplayTool } from "@/components/list/table/selection/displayTool";
import { ToggleSwitch } from "@/components/generic/toggle-switch";
import templatesDictionary from "./templatesDictionary";
import { TemplateProps } from "./templateProps";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useLogger } from "@/utils/loggerService";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  updateScreenFilters,
  updateScreenSettings,
} from "@/store/screenContextSlice";
import { useDeleteObjectByIdMutation, useSearchModelQuery } from "@/store/api";
import { useTranslation } from "react-i18next";

/**
<b>Composant qui regroupe les composants nécessaires pour faire le rendu d'une liste en bloc</b>
<li>En-tête</li>
<li>Liste des éléments</li>
<li>Composant de séléction des lignes, densité, colonnes et pagination</li>
*/
export function ListBloc({ model, modelFields, isChild }: TemplateProps) {
  const { logger } = useLogger();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const { t } = useTranslation(['common', model?.code as string]);

  const [records, setRecords] = useState<any[]>([]);
  const [resultCount, setResultCount] = useState(0);
  const [totalResultCount, setTotalResultCount] = useState(0);

  // const [searchString, setSearchString] = useState('');
  const searchString = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.filters?.searchString || ""
  );
  // const [filters, setFilters] = useState({});
  const filters = useAppSelector(
    (state) => state.screenContext[location.pathname]?.filters?.filters || {}
  );
  // const [period, setPeriod] = useState({ start: '', end: '' });
  const period = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.filters?.period || {
        start: "",
        end: "",
      }
  );
  // const [currentPage, setCurrentPage] = useState(1);
  const currentPage = useAppSelector(
    (state) => state.screenContext[location.pathname]?.filters?.currentPage || 1
  );
  // const [pageSize, setPageSize] = useState(25);
  const pageSize = useAppSelector(
    (state) => state.screenContext[location.pathname]?.filters?.pageSize || 25
  );
  // const [sortParams, setSortParams] = useState({ field: "", order: "asc" }); // Sort params
  const sortParams = useAppSelector(
    (state) =>
      state.screenContext[location.pathname]?.filters?.sortParams || {
        field: "",
        order: "asc",
      }
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
          searchFilters.push([
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
    () => selectedMenu?.object,
    [selectedMenu?.object]
  );
  const queryEndpoint = useMemo(
    () =>
      selectedMenu?.endpoint || currentObject
        ? selectedMenu?.endpoint || `/objects/${currentObject}`
        : undefined,
    [currentObject, selectedMenu?.endpoint]
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
  const availableFields = useMemo(() => {
    return new Map<string, ModelField>(
      Array.from<ModelField>(modelFields?.values())
        .filter((field) => {
          return (field.listable || false) === true && !field.special;
        })
        .sort((a, b) => {
          const firstOrder: string = (a.order_list || 0) as string;
          const secondtOrder: string = (b.order_list || 0) as string;
          return parseInt(firstOrder) - parseInt(secondtOrder);
        })
        .map((field) => [field.field_name!, field])
    );
  }, [modelFields]);

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


  // Liste des propriétés spéciaux avec titre
  const specialFieldsList = useAppSelector(
    (state) => state.objectsDefinitions[model.code]?.specialFields
  );
  const specialFieldsMap = useMemo(
    () => new Map<string, string[]>(specialFieldsList),
    [specialFieldsList]
  );

  const titleField = useMemo(
    () => specialFieldsMap.get("title")?.at(0) || "",
    [specialFieldsMap]
  );
  const dateCreateField = useMemo(
    () => specialFieldsMap.get("datecreate")?.at(0) || "",
    [specialFieldsMap]
  );
  const dateStartField = useMemo(
    () => specialFieldsMap.get("datestart")?.at(0) || "",
    [specialFieldsMap]
  );
  const dateEndField = useMemo(
    () => specialFieldsMap.get("dateend")?.at(0) || "",
    [specialFieldsMap]
  );
  const statusField = useMemo(
    () => specialFieldsMap.get("status")?.at(0) || "",
    [specialFieldsMap]
  );
  const errorField = useMemo(
    () => specialFieldsMap.get("error")?.at(0) || "",
    [specialFieldsMap]
  );
  const filetodownloadField = useMemo(
    () => specialFieldsMap.get("filetodownload")?.at(0) || "",
    [specialFieldsMap]
  );


  const lastPathSelected = useAppSelector(
    (state) => state.appContext.selectedPathInMenu
  );

  const [deleteObject, deleteObjectResult] = useDeleteObjectByIdMutation();

  const deleteRecord = useCallback(async (idRecord: any) => {
    const { data: result, error }: any = await deleteObject({
      objectName: modelEndpoint,
      id: idRecord,
    });

    // TODO : Implémenter un retour sur la liste car un "back" pourrait tout simplement étre une op�ration invalide
    // TODO : gérer les alias d'URL
    navigate(`${lastPathSelected}`);
  }, [OBJECTS_ID_FIELD, deleteObject, modelEndpoint, navigate]);


  async function onEditRecord(record: any) {
    const modelEditsURL = `/${model.endpoint}/edit/${record[OBJECTS_ID_FIELD]}`;
    navigate(`${modelEditsURL}`);
  }

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

  if (!model) {
    return <span>Loading...</span>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex-none">
        <ListTabHeader
          title={t(`${model.code}_list_title`) as string}
          subtitle={t(`${model.code}_list_subtitle`) as string}
          model={model}
          modelFields={modelFields}
          search={searchString}
          sort={sortParams}
          onSortUpdate={(sortParams: any) => {
            dispatch(
              updateScreenFilters({
                path: location.pathname,
                params: { sortParams, currentPage: 1 },
              })
            );
          }}
          filters={filters}
          period={period}
          onAdd={() => {
            navigate(`/${modelEndpoint}/new`);
          }}
          onSearchUpdate={(searchString: any) => {
            dispatch(
              updateScreenFilters({
                path: location.pathname,
                params: { searchString, currentPage: 1 },
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
          filtersButtonVisible={false}
          searchButtonVisible={true}
          periodFilterVisible={periodeFilterVisible}
          fieldFilterVisible={false}
          selectedIds={selectedIds}
          resultCount={resultCount}
          totalResultCount={totalResultCount}
        />
      </div>
      <div className="flex-none w-full">
        <DisplayTool
          className="my-8"
          model={model}
          currentPage={currentPage - 1}
          totalResult={totalResultCount}
          pageSize={pageSize}
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
          hideColumn={true}
          hideDensity={true}
        />
      </div>
      <div className="flex flex-col items-start flex-auto">
        <span className="items-center justify-center flex-none">
          <ToggleSwitch
            status={allSelected && unselectedIds && unselectedIds.length === 0}
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
        <div className="relative flex-auto w-full h-full">
          <div className="w-full overflow-x-scroll">
            {records && modelFields ? (
              records.map((record: any) => (
                <div
                  key={record[OBJECTS_ID_FIELD]}
                  className="flex flex-row items-center"
                >
                  <span className="flex items-center justify-center flex-none">
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
                  <Bloc
                    model={model}
                    modelFields={modelFields}
                    availableFields={availableFields}
                    record={record}
                    indexField="__idx"
                    titleField={titleField}
                    dateCreateField={dateCreateField}
                    dateStartField={dateStartField}
                    dateEndField={dateEndField}
                    statusField={statusField}
                    errorField={errorField}
                    filetodownloadField={filetodownloadField}
                    onDeleteRecord={(record: any) => {
                      deleteRecord(record[OBJECTS_ID_FIELD]);
                    }}
                    onEditRecord={(record: any) => { onEditRecord(record) }
                    }
                  />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

templatesDictionary.registerTemplate("list_bloc", ListBloc);
