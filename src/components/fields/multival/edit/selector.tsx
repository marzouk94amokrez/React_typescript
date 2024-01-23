import { useCallback, useEffect, useState } from "react";
import { ToggleSwitch } from "@/components/generic/toggle-switch";
import { MultivalProps } from "../multivalProps";

/** <b>Composant d'édition multival de type sélection</b> */
export const MultivalSelectorEdit = ({
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  loadOptions,
  selectedOptions,
  valueField,
  titleField,
}: MultivalProps) => {
  const [availableValues, setAvailableValues] = useState([]);

  const setupAvailableOptions = useCallback(async () => {
    const options = await loadOptions("");
    setAvailableValues(options.data);
  }, [loadOptions]);

  useEffect(() => {
    setupAvailableOptions();
  }, [setupAvailableOptions]);

  const selectorItemToggled = useCallback(
    (option: any, selected: any) => {
      if (!onUpdate) {
        return;
      }

      let selectionList = [...selectedOptions];
      if (!selected) {
        selectionList = selectionList.filter((v) => v.value !== option.value);
      } else {
        selectionList.push({ ...option });
      }

      onUpdate({
        [fieldName]: selectionList.map((selection) => ({
          [valueField]: selection.value,
          [titleField]: selection.label,
        })),
      });
    },
    [fieldName, onUpdate, selectedOptions, titleField, valueField]
  );

  return (
    <ul
      className={`border border-solid border-[var(--multi-enum-border-color)] rounded-2xl text-center p-1 ml-12`}
    >
      {availableValues &&
        availableValues.map((option: any) => {
          return (
            <li className="inline-flex m-0.5" key={option.data.value}>
              {option.data.label}{" "}
              <ToggleSwitch
                status={selectedOptions.some(
                  (obj) => obj.value === option.data.value
                )}
                className={""}
                iconInactiveClassName={
                  "text-[var(--color-sec)] m-1 cursor-pointer"
                }
                iconActiveClassName={"m-1 cursor-pointer"}
                onToggle={(selected) => {
                  selectorItemToggled(option.data, selected);
                }}
              />
            </li>
          );
        })}
    </ul>
  );
};
