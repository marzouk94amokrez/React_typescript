import { useTranslation } from "react-i18next";
import Select from "react-select";

/**
 * <b>Composant de filtre d'un champ de type booléen</b>
 */
export default function BooleanFilter({ fieldName, record, onUpdate }) {
  const value = record[fieldName] || "";

  const { t } = useTranslation(["common"]);

  const booleanOptions = [
    { value: "", label: t("labels.select", { ns: "common" }) },
    { value: "1", label: t("labels.yes", { ns: "common" }) },
    { value: "0", label: t("labels.no", { ns: "common" }) },
  ];

  const defaultValue = booleanOptions.filter(
    (option) => option.value === value
  )[0];

  /**
   * Boolean filter change handler
   */
  function onChangeHandler(event) {
    if (!onUpdate) {
      return;
    }
    onUpdate({
      [fieldName]: event.value,
    });
  }

  const customStyles = {
    container: (base) => ({
      ...base,
      width: "100%",
    }),

    control: (base, state) => ({
      ...base,
      background: "transparent",
      boxShadow: state.isFocused ? null : null,
      border: "none",
      cursor: "pointer",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      color: "var(--color-sec)",
    }),

    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),

    valueContainer: (provided) => ({
      ...provided,
      minHeight: 20,
      paddingTop: 0,
      background: "transparent",
      paddingLeft: 0,
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "var(--color-sec)",
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "var(--color-sec)",
      };
    },

    option: (provided, state) => ({
      ...provided,
      background: "transparent",
      color: "var(--color-sec)",
      cursor: "pointer",
      paddingBottom: "1px",
    }),

    menu: (base) => ({
      ...base,
      border: "2px solid var(--fields-border-color)",
      padding: "0",
      borderRadius: "4px",
      display: "flex",
      minWidth: "100%",
    }),
  };

  return (
    <div className="flex flex-col items-center w-full text-sm text-[var(--color-sec)] after:content-['\ '] after:w-full px-2 after:h-[2px] after:bg-[var(--fields-background)] after:inline-block">
      <Select
        placeholder={""}
        styles={customStyles}
        options={booleanOptions}
        onChange={onChangeHandler}
        value={defaultValue}
      />
    </div>
  );
}
