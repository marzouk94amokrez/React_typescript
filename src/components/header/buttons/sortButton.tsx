import { useTranslation } from "react-i18next";
import { HandleChange } from "@/components/generic/button/searchButton";
import FilterButton from "@/components/generic/button/filterButton";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import {
  faCircle,
  faCircleCheck,
  faCheckSquare,
  faClose,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ToggleSwitch } from "@/components/generic/toggle-switch";
import { useCallback, useEffect, useState } from "react";

/**
 * Sort button component props
 */
export interface SortButtonProps extends HandleChange {
  /** Pour effectuer le tri sur les champs d'une modèle avec l'ordre croissant ou décroissant */
  sort?: any;
  /** Représentation d'un modèle */
  model?: Model;
  /** Liste des métadonnées des champs du modèle */
  fieldsMetadataMap?: Map<string, ModelField>;
  /** Afficher ou masquer le composant en question */
  sortButtonVisible?: boolean;
  /** Evènement appellé lors de la validation de tri à effectuer */
  onCommitSortConfig?: Function;
  /** Evènement appellé lors de l'annulation de tri, ce dernier va revenir vers le précedent tri selectioné  */
  onRevertSortConfig?: Function;
}

/**
 * <b>Composant qui permet d'afficher un bouton contenant un menu pour effectuer le tri </b>
 * @param param0
 * @returns
 */
export function SortButtonMenu({
  sort,
  model,
  fieldsMetadataMap,
  onChange,
  onCommitSortConfig,
  onRevertSortConfig,
}: SortButtonProps) {
  const { t } = useTranslation(["common"]);

  /**
   * Callback for when field has been checked or unchecked
   */
  const sortFieldUpdated = useCallback(
    (field: string, checked: boolean) => {
      const sortedField = sort.field === field && !checked ? "" : field;
      onChange && onChange({ field: sortedField, order: sort.order });
    },
    [sort, onChange]
  );

  /**
   * Called for when sort order has been  checked or unchecked
   */
  const sortOrderUpdated = useCallback(
    (order: string, checked: boolean) => {
      const sortOrder = sort.order === order && !checked ? "" : order;
      onChange && onChange({ field: sort.field, order: sortOrder });
    },
    [sort, onChange]
  );

  return (
    <div className="flex flex-col overflow-hidden max-h-80">
      <ul className="flex-auto overflow-y-auto">
        {sort && (
          <li className="flex flex-col py-1 after:mt-2 after:content-['\ '] after:w-full after:h-[2px] after:bg-[color:var(--separator-border-color)]">
            <span className="flex flex-row px-4">
              <ToggleSwitch
                label={t("actions.sort_default_field")}
                status={"" === sort.field}
                iconActive={faCircleCheck}
                iconInactive={faCircle}
                iconActiveClassName={`text-[var(--toggle-alt-active-color)]`}
                onToggle={(sorted: boolean) => {
                  sortFieldUpdated("", sorted);
                }}
                labelClassName={`text-[0.9rem]`}
              />
            </span>
          </li>
        )}
        {fieldsMetadataMap &&
          Array.from(fieldsMetadataMap.values()).map((field) => {
            return (
              field.listable && (
                <li key={field.code} className={`flex flex-col py-1`}>
                  <span className="flex flex-row px-4">
                    <ToggleSwitch
                      label={field.code}
                      status={field.code === sort.field}
                      iconActive={faCircleCheck}
                      iconInactive={faCircle}
                      iconActiveClassName={`text-[var(--toggle-alt-active-color)]`}
                      onToggle={(sorted: boolean) => {
                        sortFieldUpdated(field.code || "", sorted);
                      }}
                      labelClassName={`text-[0.9rem]`}
                    />
                  </span>
                </li>
              )
            );
          })}

        {sort && (
          <li className="flex flex-col py-1 before:mb-2 before:content-['\ '] before:w-full before:h-[2px] before:bg-[color:var(--separator-border-color)]">
            <span className="flex flex-row px-4">
              <ToggleSwitch
                label={t("actions.sort_asc")}
                status={["", "asc"].includes(sort.order)}
                iconActive={faCircleCheck}
                iconInactive={faCircle}
                iconActiveClassName={`text-[var(--toggle-alt-active-color)]`}
                onToggle={(sorted: boolean) => {
                  sortOrderUpdated("asc", sorted);
                }}
                labelClassName={`text-[0.9rem]`}
              />
            </span>
          </li>
        )}

        {sort && (
          <li className="flex flex-col py-1">
            <span className="flex flex-row px-4">
              <ToggleSwitch
                label={t("actions.sort_desc")}
                status={"desc" === sort.order}
                iconActive={faCircleCheck}
                iconInactive={faCircle}
                iconActiveClassName={`text-[var(--toggle-alt-active-color)]`}
                onToggle={(sorted: boolean) => {
                  sortOrderUpdated("desc", sorted);
                }}
                labelClassName={`text-[0.9rem]`}
              />
            </span>
          </li>
        )}
      </ul>
      <div className="flex flex-col flex-none py-1 before:mb-2 before:content-['\ '] before:w-full before:h-[2px] before:bg-[color:var(--separator-border-color)]">
        <div className="flex justify-center space-x-3">
          <FontAwesomeIcon
            icon={faCheckSquare}
            className="text-[var(--color-princ)] cursor-pointer text-lg"
            onClick={() => onCommitSortConfig && onCommitSortConfig(sort)}
          />
          <FontAwesomeIcon
            icon={faClose}
            className="text-[var(--color-princ)] cursor-pointer border rounded-sm px-[2px]"
            onClick={() => onRevertSortConfig && onRevertSortConfig(sort)}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Composant pour effectuer le tri sur les champs d'une modèle ainsi que le tri par ordre croissant ou décroissant
 */
export function SortButton({
  sort,
  model,
  fieldsMetadataMap,
  onChange,
  sortButtonVisible = true,
}: SortButtonProps) {
  const { t } = useTranslation(["common"]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    field: "",
    order: "",
    ...sort,
  });

  useEffect(() => {
    setSortConfig({ ...sort });
  }, [sort]);

  function commitSortSettings() {
    onChange && onChange({ ...sortConfig });
    setMenuOpen(false);
  }

  function revertSortSettings() {
    setSortConfig({ ...sort });
    setMenuOpen(false);
  }

  return (
    <>
      {sortButtonVisible ? (
        <FilterButton
          label={t("actions.sort", { ns: "common" })}
          overFlowStrategy="visible"
          menuIsOpen={menuOpen}
          icon={
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-[var(--color-princ)]"
            />
          }
          onMenuOpened={() => setMenuOpen(true)}
          onMenuClosed={() => setMenuOpen(false)}
          component={{
            Menu: (
              <SortButtonMenu
                model={model}
                sort={sortConfig}
                fieldsMetadataMap={fieldsMetadataMap}
                onChange={(e: any) => setSortConfig({ ...e })}
                onCommitSortConfig={commitSortSettings}
                onRevertSortConfig={revertSortSettings}
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
