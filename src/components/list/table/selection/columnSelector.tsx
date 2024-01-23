import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLineColumns,
  faGripDotsVertical,
  faRotateLeft,
} from "@fortawesome/pro-solid-svg-icons";
import { ToggleSwitch } from "@/components/generic/toggle-switch";
import { ModelField } from "@/api/data/modelField";
import { Model } from "@/api/data/model";
import FilterButton from "@/components/generic/button/filterButton";
import SortableList, { SortableItem } from "react-easy-sort";
import { arrayMoveMutable } from "array-move";
import { useLogger } from "@/utils/loggerService";
import equal from "fast-deep-equal";
import copy from "fast-copy";
import { useTranslation } from "react-i18next";

export interface FieldVisibility {
  field: ModelField;
  visible: boolean;
}

export interface ColumnSelectorProps {
  /**
   * Model dont provient les champs à afficher à l'aide du composant
   */
  model?: Model;
  /**
   * Tableau contenant la visibilité de chaque champs "listable" d'un model
   */
  fieldVisibilityList?: FieldVisibility[];
  /**
   * Evénement qui permet de détecter le changement de visibilité des champs
   */
  onFieldVisibilityUpdate: any;
}

export interface ColumnSelectorMenuProps extends ColumnSelectorProps {
  /**
   * Evénement qui permet de détecter le changement d'ordre de visibilité des champs
   */
  onFieldOrderUpdate: any;
}

/**
 * Custom menu for Column selector
 * @param param0
 */
function ColumnSelectorMenu({
  model,
  fieldVisibilityList,
  onFieldVisibilityUpdate,
  onFieldOrderUpdate,
}: ColumnSelectorMenuProps) {
  const { logger } = useLogger();
  const { t } = useTranslation(["common", model?.code as string]);

  const allFieldsControl: FieldVisibility = useMemo(
    () => ({
      field: { code: "show_all", field: "" },
      visible: true,
    }),
    [t]
  );

  const [editedFieldVisibility, setEditedFieldsVisibility] = useState<
    FieldVisibility[]
  >(fieldVisibilityList || []);

  /**
   * Rajout fonctionnalité "Afficher tout"
   */
  const computeFieldVisibilityProps = useCallback(() => {
    allFieldsControl.visible =
      fieldVisibilityList?.every((f) => {
        return f.visible;
      }) || false;

    const additionalFields = fieldVisibilityList || [];

    const allFieldsVisibility = [allFieldsControl, ...additionalFields];
    setEditedFieldsVisibility(allFieldsVisibility);
  }, [fieldVisibilityList, allFieldsControl]);

  useEffect(() => {
    computeFieldVisibilityProps();
  }, [computeFieldVisibilityProps]);

  const toggleFieldVisibility = useCallback(
    (field: string, visibility: boolean) => {
      if (onFieldVisibilityUpdate) {
        const updatedFieldVisiblity =
          fieldVisibilityList?.map((fv) => copy(fv)) || [];

        updatedFieldVisiblity.forEach((element) => {
          element.visible =
            !field || element.field.field_name === field
              ? visibility
              : element.visible;
        });

        logger.debug(
          "[COLUMNSELECTOR] - Mise à jour de la visiblité des champs",
          updatedFieldVisiblity
        );
        onFieldVisibilityUpdate(updatedFieldVisiblity);
      }
    },
    [fieldVisibilityList, onFieldVisibilityUpdate]
  );

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newVisibilityList = [...(fieldVisibilityList || [])].filter(
      (f) => f.field.field_name !== ""
    );

    arrayMoveMutable(newVisibilityList, oldIndex, newIndex);

    logger.debug(
      "[COLUMNSELECTOR] - Mise à jour de l'ordre des colonnes",
      newVisibilityList
    );
    onFieldVisibilityUpdate(newVisibilityList);
  };

  const computeVisibleFields = useCallback(() => {
    return (
      fieldVisibilityList &&
      fieldVisibilityList
        .filter((f) => {
          return f.field.field_name !== "";
        })
        .sort((a, b) => {
          const firstOrder: string = (a.field.order_list || 0) as string;
          const secondtOrder: string = (b.field.order_list || 0) as string;
          return parseInt(firstOrder) - parseInt(secondtOrder);
        })
        .map((fv) => ({ field: fv.field, visible: true }))
    );
  }, [fieldVisibilityList]);

  const revertList = () => {
    const fields = computeVisibleFields();
    onFieldVisibilityUpdate(fields);
  };

  return (
    <ul className="overflow-y-auto max-h-80">
      <SortableList
        onSortEnd={onSortEnd}
        className="list"
        draggedItemClassName="dragged"
      >
        {editedFieldVisibility?.map((fieldVisibility) => {
          return (
            <div key={fieldVisibility.field.code}>
              {fieldVisibility.field.field === "" ? (
                <li className={`mt-2 content-[' '] w-full "`}>
                  <span className="flex flex-row px-2  items-center mb-2">
                    <FontAwesomeIcon
                      icon={faRotateLeft}
                      className="cursor-pointer"
                      onClick={revertList}
                      color="var(--color-sec)"
                    />
                    <i className=" px-2">
                      <ToggleSwitch
                        label={t(`${fieldVisibility.field.code}`, {
                          ns: "common",
                        })}
                        status={fieldVisibility.visible}
                        onToggle={(visibility: boolean) => {
                          toggleFieldVisibility(
                            fieldVisibility.field.field_name as string,
                            visibility
                          );
                        }}
                        labelClassName={`text-[0.9rem] `}
                      />
                    </i>
                  </span>
                  <hr className="bg-[var(--separator-border-color)] h-[2px] " />
                </li>
              ) : (
                <SortableItem>
                  <li className={`flex flex-col py-1  `}>
                    <span className="flex flex-row items-center px-4 ">
                      <FontAwesomeIcon
                        icon={faGripDotsVertical}
                        color="var(--color-sec)"
                        className="mr-2 cursor-move "
                      />
                      <ToggleSwitch
                        label={t(`labels.${fieldVisibility.field.field_name}`, {
                          ns: model?.code,
                        })}
                        status={fieldVisibility.visible}
                        onToggle={(visibility: boolean) => {
                          toggleFieldVisibility(
                            fieldVisibility.field.field_name as string,
                            visibility
                          );
                        }}
                        labelClassName={`text-[0.9rem]`}
                        hiddable={[true, "true", "1", 1].includes(
                          fieldVisibility.field.hiddable || false
                        )}
                      />
                    </span>
                  </li>
                </SortableItem>
              )}
            </div>
          );
        })}
      </SortableList>
    </ul>
  );
}

/**
 * <b>Composant qui permet d'afficher/cacher les champs dites "listable" dans une liste en tableau</b>
 * @returns {ColumnSelector} Composant ColumnSelector
 */
export function ColumnSelector({
  model,
  fieldVisibilityList,
  onFieldVisibilityUpdate: emitFieldVisiblityUpdate,
}: ColumnSelectorProps) {
  const { logger } = useLogger();

  const onFieldVisibilityUpdate = useCallback(
    (updatedFieldVisiblityList: FieldVisibility[]) => {
      setEditedFieldVisibilityList(updatedFieldVisiblityList);

      const fieldVisibilityListMap = new Map(
        fieldVisibilityList?.map((fv) => [fv.field.code, copy(fv)])
      );

      updatedFieldVisiblityList.forEach((element) => {
        const visiblity = fieldVisibilityListMap.get(element.field.code);
        visiblity!.visible = element.visible;
        fieldVisibilityListMap.set(element.field.code, visiblity!);
      });

      const updatedFieldVisiblity = Array.from(
        fieldVisibilityListMap.values()
      ).filter((fv) => fv.field.field !== "");

      logger.debug("Application", updatedFieldVisiblity);

      emitFieldVisiblityUpdate(updatedFieldVisiblity);
    },
    [fieldVisibilityList]
  );

  const onFieldOrderUpdate = useCallback(
    (updatedFieldOrderList: FieldVisibility[]) => {
      setEditedFieldVisibilityList(updatedFieldOrderList);
    },
    []
  );

  const [editedFieldVisibilityList, setEditedFieldVisibilityList] = useState<
    FieldVisibility[]
  >([]);

  useEffect(() => {
    const fieldVisibilityListMap = new Map(
      editedFieldVisibilityList?.map((fv) => [fv.field.code, copy(fv)])
    );

    fieldVisibilityList!.forEach((fieldVisibility) => {
      const element = fieldVisibilityListMap.get(fieldVisibility.field.code);

      if (!element) {
        fieldVisibilityListMap.set(fieldVisibility.field.code, fieldVisibility);
      } else {
        element.visible = fieldVisibility.visible;
        fieldVisibilityListMap.set(element.field.code, element);
      }
    });

    const updatedVisibility = Array.from(fieldVisibilityListMap.values());
    if (!equal(updatedVisibility, editedFieldVisibilityList)) {
      logger.debug(
        "[COLUMNSELECTOR] - Application modification visibilité",
        editedFieldVisibilityList,
        updatedVisibility
      );
      setEditedFieldVisibilityList(updatedVisibility);
    }
  }, [fieldVisibilityList, editedFieldVisibilityList]);

  return (
    <>
      <FilterButton
        label={"Colonnes"}
        overFlowStrategy="visible"
        className={`flex flex-row-reverse text-[0.9rem] text-[var(--color-sec)] border-none hover:bg-transparent px-[8px] py-[2px] pt-0`}
        iconClassName={`pl-0 pr-1`}
        labelClassName={`first-letter:uppercase`}
        icon={<FontAwesomeIcon icon={faLineColumns} />}
        onMenuClosed={() =>
          emitFieldVisiblityUpdate &&
          emitFieldVisiblityUpdate(
            editedFieldVisibilityList.filter((fv) => fv.field.field !== "")
          )
        }
        component={{
          Menu: (
            <ColumnSelectorMenu
              model={model}
              fieldVisibilityList={editedFieldVisibilityList}
              onFieldVisibilityUpdate={onFieldVisibilityUpdate}
              onFieldOrderUpdate={onFieldOrderUpdate}
            />
          ),
        }}
      />
    </>
  );
}
