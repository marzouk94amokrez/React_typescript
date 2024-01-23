import { useTranslation } from "react-i18next";
import { useLogger } from "@/utils/loggerService";
import { useCallback, useEffect, useState } from "react";
import FilterButton from "@/components/generic/button/filterButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckSquare,
  faCirclePlus,
  faClose,
  faSquare,
  faSearch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import SearchButton from "@/components/generic/button/searchButton";
import { ToggleSwitch } from "@/components/generic/toggle-switch";
import { MultivalProps } from "../multivalProps";

/** <b>Composant d'édition multival de type dropdown</b> */
export const MultivalDropdownEdit = ({
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  loadOptions,
  selectedOptions,
  valueField,
  titleField,
  objectData
}: MultivalProps) => {
  const { t } = useTranslation(["common"]);
  const { logger } = useLogger();

  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [availableValues, setAvailableValues] = useState([]);
  const [tempSelectedValues, setTempSelectedValues] = useState([
    ...selectedOptions,
  ]);
  const [ishasMore, setIshasMore] = useState();

  const resetTempSelectedValues = useCallback(() => {
    setTempSelectedValues([...selectedOptions]);
  }, [selectedOptions]);

  useEffect(() => {
    resetTempSelectedValues();
  }, [resetTempSelectedValues]);

  const setupAvailableOptions = useCallback(async () => {
    const options = await loadOptions("");
    setAvailableValues(options.data);
    setIshasMore(options.hasMore);
  }, [loadOptions,objectData]);

  useEffect(() => {
    setupAvailableOptions();
  }, [setupAvailableOptions]);

  const removeOption = useCallback(
    (option: any) => {
      if (!onUpdate) {
        return;
      }

      onUpdate({
        [fieldName]: selectedOptions
          .filter((sv: any) => sv.value !== option.value)
          .map((selected) => ({
            [valueField]: selected.value,
            [titleField]: selected.label,
          })),
      });
    },
    [selectedOptions, onUpdate, fieldName, titleField, valueField]
  );

  async function searchOption(event: any) {
    const options = await loadOptions(event.target.value);
    setAvailableValues(options.data);
    logger.log(event.target.value);
  }

  return (
    <div className="flex flex-row items-center justify-between flex-1">
      <FilterButton
        label=""
        overFlowStrategy="visible"
        menuIsOpen={menuIsOpened}
        className={`border-0 hover:bg-transparent px-0`}
        icon={
          <FontAwesomeIcon
            icon={faCirclePlus}
            className="text-[var(--color-princ)]"
          />
        }
        onMenuOpened={() => setMenuIsOpened(true)}
        onMenuClosed={() => setMenuIsOpened(false)}
        component={{
          Menu: (
            <div className="min-w-[8rem] left-0 rounded-[18px]  text-sm text-[var(--text-color)] p-2 space-y-2 bg-white">
              <ul>
                {ishasMore ? (
                  <SearchButton
                    placeholder={t("actions.search", { ns: "common" })}
                    icon={<FontAwesomeIcon icon={faSearch} />}
                    onChange={(event: any) => {
                      searchOption(event);
                    }}
                    className={"mb-2"}
                  />
                ) : (
                  <></>
                )}
                {availableValues &&
                  availableValues.map((option: any) => (
                    <li key={option.data.value}>
                      <ToggleSwitch
                        label={option.data.label}
                        status={tempSelectedValues.some(
                          (av: any) => av.value === option.data.value
                        )}
                        iconActive={faCheckSquare}
                        iconInactive={faSquare}
                        iconActiveClassName={`text-[var(--toggle-alt-active-color)]`}
                        iconInactiveClassName={
                          "border border-[var(--multi-enum-border-color)] text-[white] text-xs"
                        }
                        onToggle={(selected) => {
                          let values = tempSelectedValues.filter((sv: any) => {
                            return sv.value !== option.data.value;
                          });

                          if (selected) {
                            values.push({ ...option.data });
                          }

                          setTempSelectedValues(values);
                        }}
                        labelClassName={`text-[0.9rem]`}
                      />
                    </li>
                  ))}
              </ul>
              <div className="flex flex-col flex-none py-1 before:mb-2 before:content-['\ '] before:w-full before:h-[2px] before:bg-[color:var(--separator-border-color)]">
                <div className="flex items-center justify-center space-x-3">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="border rounded-sm text-[var(--color-princ)] cursor-pointer text-xs"
                    onClick={() => {
                      setMenuIsOpened(false);
                      onUpdate &&
                        onUpdate({
                          [fieldName]: tempSelectedValues.map((selected) => ({
                            [valueField]: selected.value,
                            [titleField]: selected.label,
                          })),
                        });
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faClose}
                    className="text-[var(--color-princ)] cursor-pointer border rounded-sm px-[2px] text-xs"
                    onClick={() => {
                      resetTempSelectedValues();
                      setMenuIsOpened(false);
                    }}
                  />
                </div>
              </div>
            </div>
          ),
        }}
      />
      <ul className={`text-center`}>
        {selectedOptions.map((option) => (
          <li
            key={option.value}
            className={`inline rounded bg-[var(--multi-enum-background-color)] px-2 py-1 text-xs items-center uppercase ml-2`}
          >
            {option.label}{" "}
            <FontAwesomeIcon
              icon={"xmark"}
              className="text-[var(--bleu-icd)] ml-2 cursor-pointer"
              onClick={() => removeOption(option)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
