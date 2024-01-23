import { useCallback, useEffect, useState } from "react";
import { MonovalProps } from "../monovalProps";
import { ToggleSwitch } from "@/components/generic/toggle-switch";

/** <b>Composant de consultation monoval de type sélection</b> */
export const MonovalSelectorDisplay = ({
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  loadOptions,
  selectedOptions,
  valueField,
  titleField,
}: MonovalProps) => {
  const [availableValues, setAvailableValues] = useState([]);

  const setupAvailableOptions = useCallback(async () => {
    const options = await loadOptions("");
    setAvailableValues(options);
  }, [loadOptions]);

  useEffect(() => {
    setupAvailableOptions();
  }, [setupAvailableOptions]);

  const selectorItemToggled = useCallback(
    (option: any, selected: any) => {
      if (!onUpdate) {
        return;
      }

      const selection = selected
        ? { [valueField]: option.value, [titleField]: option.label }
        : {};

      onUpdate({
        [fieldName]: selection,
      });
    },
    [fieldName, onUpdate, titleField, valueField]
  );

  return (
    <ul
      className={`border border-solid border-[var(--multi-enum-border-color)] rounded-2xl text-center pt-2 pl-2`}
    >
      {availableValues &&
        availableValues.map((option: any) => {
          return (
            <li className="inline-flex m-0.5" key={option.value}>
              {option.label}{" "}
              <ToggleSwitch
                status={selectedOptions.some(
                  (obj) => obj.value === option.value
                )}
                className={""}
                iconInactiveClassName={
                  "text-[var(--color-sec)] m-1 cursor-pointer"
                }
                iconActiveClassName={"m-1 cursor-pointer"}
                onToggle={(selected) => {
                  selectorItemToggled(option, selected);
                }}
              />
            </li>
          );
        })}
    </ul>
  );
};
