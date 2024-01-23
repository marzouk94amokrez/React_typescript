import { useCallback, useEffect } from "react";
import { MonovalProps } from "../monovalProps";
import debounce from "lodash.debounce";
import AsyncSelect from "react-select/async";

/** <b>Composant d'édition monoval de type dropdown</b> */
export const MonovalDropdownEdit = ({
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  loadOptions: getAsyncOptionsOLD,// je l'ai supprimer pour eviter le retard de chargement des donnees
  selectedOptions,
  valueField,
  titleField,
  isHasMore,
  objectData,
  fieldMetadata,
}: MonovalProps) => {


  const getAsyncOptions = useCallback(async (inputValue: any) => {

    const options = objectData ? objectData?.data?.records?.map((record: any) => (
      { value: record[valueField], label: record[titleField] }
    )):fieldMetadata?.field_values;
    return options;
  }, [ fieldMetadata, valueField, titleField, isHasMore,objectData]);


  const onValueUpdate = useCallback((event: any) => {
    if (!onUpdate) {
      return;
    }
    const value = { [valueField]: event.value, [titleField]: event.label };
    onUpdate({
      [fieldName]: value,
    });
  }, [onUpdate, fieldName, titleField, valueField]);

  const customStyles = {
    container: (base: any) => ({
      ...base,
      width: "100%",
      minWidth: 100
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
      paddingRight: 0,
    }),

    singleValue: (provided: any) => ({
      ...provided,
      textAlign: "right",
      paddingLeft: "0",
    }),

    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "var(--color-sec)",
      };
    },

    option: ({ provided, state }: any) => ({
      ...provided,
      background: "transparent",
      color: "var(--color-sec)",
      cursor: "pointer",
      paddingBottom: "1px",
      padding: 4,
    }),

    menu: (base: any) => ({
      ...base,
      fontSize: "0.9rem",
      border: "2px solid var(--fields-border-color)",
      borderRadius: "4px",
      display: "flex",
      minWidth: "6rem",
      right: 0,
    }),
  };

  // eslint-disable-next-line
  const loadOptions = useCallback(debounce(
    (inputValue, callback) => {
      getAsyncOptions(inputValue).then((options: any) => callback(options));
    }, 50), []);

  useEffect(() => {
    return () => loadOptions.cancel();
  }, [loadOptions]);

  
  return (
    <div className="flex-wrap">
      <div className={
        `
    flex-1 flex-col items-center w-full text-sm text-[var(--color-sec)] after:h-[2px]
      ${fieldClassName ? fieldClassName : ''}
    `
      }>
        <AsyncSelect
          cacheOptions
          defaultOptions
          isSearchable={isHasMore ? true : false}
          placeholder={""}
          loadOptions={loadOptions}
          onChange={onValueUpdate}
          styles={customStyles}
          className={`${componentClassName}`}
          value={selectedOptions}
          menuPortalTarget={document.body}
        />
      </div>
    </div>
  )
}
