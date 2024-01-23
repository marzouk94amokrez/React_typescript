import { useMemo, useState } from "react";
import { DisplayFieldProps } from "../displayFieldProps";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useSearchModelQuery } from "@/store/api";
import Select from "react-select";
import { replaceVariables } from "@/utils/funcs";

// Editable after this many options
const editableThreshold = 10;

export interface MultivalFilterProps extends DisplayFieldProps {
  isMulti: boolean;
}

/**
 * <b> Composant de filtre d'un champ de type multival (énumération) </b>
 */
export default function MultivalFilter({
  model,
  record,
  fieldLabel,
  fieldMetadata,
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  isMulti = true,
}: MultivalFilterProps) {
  const customStyles = {
    container: (base: any) => ({
      ...base,
      width: "100%",
    }),

    control: (base: any, state: any) => ({
      ...base,
      minHeight: 32,
      background: "transparent",
      boxShadow: state.isFocused ? null : null,
      border: "none",
      cursor: "pointer",
    }),

    clearIndicator: (base: any) => ({
      ...base,
      color: "var(--color-sec)",
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      color: "var(--color-sec)",
    }),

    indicatorSeparator: (base: any) => ({
      ...base,
      display: "none",
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      minHeight: 20,
      paddingTop: 0,
      background: "transparent",
      paddingLeft: 0,
    }),

    multiValue: (base: any) => ({
      ...base,
      borderRadius: "0.5rem",
      background: "var(--fields-border-color)",
    }),

    multiValueLabel: (base: any) => ({
      ...base,
      color: "var(--color-sec)",
    }),

    multiValueRemove: (base: any) => ({
      ...base,
      ":hover": {
        backgroundColor: "var(--fields-background)",
      },
    }),

    singleValue: (provided: any) => ({
      ...provided,
      color: "var(--color-sec)",
    }),

    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "var(--color-sec)",
      };
    },

    option: (provided: any, state: any) => ({
      ...provided,
      background: "transparent",
      color: "var(--color-sec)",
      cursor: "pointer",
      paddingBottom: "1px",
    }),

    menu: (base: any) => ({
      ...base,
      fontSize: "0.9rem",
      border: "2px solid var(--fields-border-color)",
      borderRadius: "4px",
      display: "flex",
      minWidth: "max-content",
    }),
  };

  const titleField = useMemo(() => fieldMetadata?.title_field || 'name', [fieldMetadata]);
  const valueField = useMemo(() => fieldMetadata?.value_field || OBJECTS_ID_FIELD, [fieldMetadata]);
  const queryEndpoint = useMemo(() => replaceVariables(fieldMetadata?.source, record), [record, fieldMetadata?.source]);
  const [searchString, setSearchString] = useState('');

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error
  } = useSearchModelQuery({
    url: queryEndpoint,
    objectName: model?.endpoint,
    params: {
      search: searchString,
      filters: [],
      sortParams: [],
      page: -1,
      pageSize: editableThreshold,
    }
  }, { skip: !queryEndpoint });

  // Plus de résultat que ce qui est retourné
  const hasMore = useMemo(() => objectData?.data?.has_mode || objectData?.data?.query?.has_more || false, [objectData]);

  /**
   * Valeurs sélectionnées dans l'enregistrement
   */
  const fieldValues = useMemo(() => {
    const r = record || {};
    const v = r[fieldName || ""];

    if (Array.isArray(v)) {
      return v;
    }

    return (v ? [v] : []);
  }, [record, fieldName]);

  /**
   * Adaptation valeur selectionnée pour le dropdown
  */
  const selectedOptions = useMemo(() => {
    return fieldValues.map((v) => (
      { value: v, label: v }
    ))

  }, [fieldValues]);

  function onValueUpdate(items: any) {
    if (!onUpdate || !fieldName) {
      return;
    }

    const values = isMulti ? items.map((v: any) => v.value) : items?.value;

    onUpdate({
      [fieldName]: values,
    });
  }

  const options = useMemo(() => {
    const v = objectData?.data?.records?.map((record: any) => ({ value: record[valueField], label: record[titleField] }))
    return v;
  }, [objectData]);

  return (
    <div className={
      `
        flex flex-col items-center w-full text-sm text-[var(--color-sec)] after:content-[' '] after:w-full after:h-[2px] after:bg-[var(--fields-background)] after:inline-block
        ${fieldClassName ? fieldClassName : ''}
      `
    }>
      <Select
        isMulti={isMulti}
        isSearchable={hasMore}
       // placeholder={fieldName}
        isClearable={true}
        styles={customStyles}
        className={componentClassName}
        value={selectedOptions}
        menuPortalTarget={document.body}
        options={options}
        onChange={onValueUpdate}
        onInputChange={(newValue) => setSearchString(newValue)}
      />
    </div>
  );
}
