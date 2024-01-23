import { useCallback, useEffect, useState } from "react";
import { MultivalProps } from "../multivalProps";
import { ToggleSwitch } from "@/components/generic/toggle-switch";

/** <b>Composant de consultation multival de type sélection</b> */
export const MultivalSelectorDisplay = ({
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
  return (
    <ul
      className={`border border-solid border-[var(--multi-enum-border-color)] rounded-2xl text-center p-1 ml-12`}
    >
      ss
      {availableValues &&
        availableValues?.map((option: any) => {
          return (
            <li className="inline-flex m-0.5" key={option.data.value}>
              {option.data.label}{" "}
              <ToggleSwitch
                status={selectedOptions.some(
                  (obj) => obj[valueField] === option.data.value
                )}
                className={""}
                iconInactiveClassName={"text-[var(--color-sec)] m-1"}
                iconActiveClassName={"m-1"}
              />
            </li>
          );
        })}
    </ul>
  );
};
