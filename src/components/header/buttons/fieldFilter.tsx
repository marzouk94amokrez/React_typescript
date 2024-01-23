import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBarsFilter,
  faCheck,
  faClose,
} from "@fortawesome/pro-solid-svg-icons";
import { HandleChange } from "@/components/generic/button/searchButton";
import FilterButton from "@/components/generic/button/filterButton";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";

export interface FieldFilterProps extends HandleChange {
  /**
   * Représente une modèle
   */
  model?: Model;
  /**
   * Liste des champs à filtrer d'une modèle
   */
  filters?: Object;
  /**
   * Liste des métadonnées des champs du modèle
   */
  fieldsMetadataMap?: Map<string, ModelField>; // List of model fields metadata
  /** Afficher les champs du filtre visible */
  fieldFilterVisible?: boolean;
  /** Fonction appeler lors de la validation de filtre */
  onCommitFilterSearch?: Function;
  /** Fonction appeler lors de l'annulation de filtre  */
  onRevertFilterSearch?: Function;
}

/**
 * FieldFilter component
 *
 * @param param0
 * @returns
 */
function FieldFilterMenu({
  model,
  filters,
  fieldsMetadataMap,
  onCommitFilterSearch,
  onRevertFilterSearch,
}: FieldFilterProps) {
  const [value, setValue] = useState(filters);

  return (
    <div className="pb-2">
      <div className="p-2 overflow-x-visible overflow-y-auto max-h-48">
        {fieldsMetadataMap &&
          Array.from(fieldsMetadataMap?.values()).map((f) => {
            return (
              <DisplayField
                key={f.code}
                hideLabel={true}
                fieldName={f.code}
                fieldLabel={`${model?.code}_${f.code}_label`}
                record={value}
                fetchedRecord={value}
                fieldMetadata={f}
                fieldsMetadataMap={fieldsMetadataMap}
                viewType={FieldViewType.FILTER}
                onUpdate={(e: any) => {
                  const updatedFilters = { ...value, ...e };
                  setValue(updatedFilters);
                }}
              />
            );
          })}
      </div>
      <div className="flex flex-col flex-none py-1 before:mb-2 before:content-['\ '] before:w-full before:h-[2px] before:bg-[color:var(--separator-border-color)]">
        <div className="flex items-center justify-center space-x-3">
          <FontAwesomeIcon
            icon={faCheck}
            className="border rounded-sm text-[var(--color-princ)] cursor-pointer text-xs"
            onClick={() => {
              onCommitFilterSearch && onCommitFilterSearch(value);
            }}
          />
          <FontAwesomeIcon
            icon={faClose}
            className="text-[var(--color-princ)] cursor-pointer border rounded-sm px-[2px] text-xs"
            onClick={() => {
              onRevertFilterSearch && onRevertFilterSearch(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * <b>Composant permettant d'effectuer des filtres sur les champs d'une modèle donnée.</b>
 * On pourra afficher ou masquer certains champs selon le besoin
 */
export function FieldFilter({
  model,
  filters,
  fieldsMetadataMap,
  onChange,
  fieldFilterVisible = true,
}: FieldFilterProps) {
  const { t } = useTranslation(["common"]);
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [filtersTemp, setFiltersTemp] = useState(filters);

  function commitFilterSearch(values: any) {
    onChange && onChange(values);
    setMenuIsOpened(false);
  }

  function revertFilterSearch() {
    setFiltersTemp({});
    onChange && onChange({});
    setMenuIsOpened(false);
  }

  useEffect(() => {
    setFiltersTemp(filters);
  }, [filters]);

  return (
    <>
      {fieldFilterVisible ? (
        <FilterButton
          label={t("actions.filter", { ns: "common" })}
          overFlowStrategy="visible"
          menuIsOpen={menuIsOpened}
          onMenuOpened={() => setMenuIsOpened(true)}
          onMenuClosed={() => setMenuIsOpened(false)}
          className={"w-full"}
          filterClassName={"p-0"}
          icon={
            <FontAwesomeIcon
              icon={faBarsFilter}
              className="text-[var(--color-princ)]"
            />
          }
          component={{
            Menu: (
              <FieldFilterMenu
                model={model}
                filters={filtersTemp}
                fieldsMetadataMap={fieldsMetadataMap}
                onChange={(e: any) => {
                  setFiltersTemp(e);
                }}
                onCommitFilterSearch={(value: any) =>
                  commitFilterSearch && commitFilterSearch(value)
                }
                onRevertFilterSearch={revertFilterSearch}
              />
            ),
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
