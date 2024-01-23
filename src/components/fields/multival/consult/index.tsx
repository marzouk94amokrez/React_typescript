import React, { useCallback, useMemo, useState } from "react";
import { DisplayFieldProps } from "../../displayFieldProps";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { replaceVariables } from "@/utils/funcs";
import { useSearchModelQuery } from "@/store/api";
import { MultivalDropdownDisplay } from "./dropdown";
import { MultivalSelectorDisplay } from "./selector";
import { MultivalFileDisplay } from "./file";
import { MultivalTabExternalDisplay } from "./external";

// Editable after this many options
const editableThreshold = 10;


interface MultivalConsultComponent {
  component: any,
  pageSize: number,
}

/** <b>Composant de consultation d'un champ de type multival (énumération)</b> */
export default function MultivalConsult({
  viewType,
  record,
  fieldLabel,
  fieldMetadata,
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
}: DisplayFieldProps) {


  

  // Champ à utiliser pour le titre d'un élément
  const titleField = useMemo(
    () => fieldMetadata?.title_field || "name",
    [fieldMetadata]
  );

  // Champ à utiliser pour la valeur d'un élément
  const valueField = useMemo(
    () => fieldMetadata?.value_field || OBJECTS_ID_FIELD,
    [fieldMetadata]
  );

  // Sources des valeurs de l'objet lié
  const fieldValuesSource = useMemo(
    () => fieldMetadata?.source || "",
    [fieldMetadata]
  );

  /**
   * Valeurs sélectionnées dans l'enregistrement
   */
  const fieldValues = useMemo(() => {
    const r = record || {};
    const v = r[fieldName || ""];

    if (Array.isArray(v)) {
      return v;
    }

    return v ? [v] : [];
  }, [record, fieldName]);


  const queryEndpoint = useMemo(() => record&& replaceVariables(fieldMetadata?.source, record), [record, fieldMetadata?.source]);


  const [searchString, setSearchString] = useState('');

  const componentMap: Record<string, MultivalConsultComponent> = {
    "": {component: MultivalDropdownDisplay, pageSize: editableThreshold},
    selector: {component: MultivalSelectorDisplay, pageSize: -1},
    file: {component: MultivalFileDisplay, pageSize: -1},
    table: {component: MultivalTabExternalDisplay, pageSize: -1}
  };

  const componentEntry = componentMap[fieldMetadata?.component || ""];

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error
  } = useSearchModelQuery({
    url: queryEndpoint,
    params: {
      search: searchString,
      filters: [],
      sortParams: [],
      page: 0,
      pageSize: componentEntry?.pageSize || editableThreshold,
    }
  }, { skip: !queryEndpoint });

  // Plus de résultat que ce qui est retourné
  const hasMore = useMemo(() => objectData?.data?.has_mode || objectData?.data?.query?.has_more || false, [objectData]);

  /**
   * Async select handler
   *
   * @param {*} inputValue
   * @returns
   */
  const loadOptions = useCallback(
    async (inputValue: any) => {

      const options =
      objectData &&
      objectData?.data?.records?.map((record: any) => ({
          data: { value: record[valueField], label: record[titleField] },
        }));

      const result = { data: options, hasMore: hasMore };

      return result;
    },
    [titleField, valueField, fieldValuesSource]
  );

  const fieldComponent = componentEntry?.component || MultivalDropdownDisplay;
  return React.createElement(fieldComponent, {
    viewType,
    record,
    fieldLabel,
    fieldMetadata,
    fieldName,
    fieldClassName,
    componentClassName,
    onUpdate,
    loadOptions,
    selectedOptions: fieldValues,
    titleField,
    valueField,
  } as React.ClassAttributes<{}>);

}
