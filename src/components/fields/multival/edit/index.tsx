import { useLogger } from "@/utils/loggerService";
import { DisplayFieldProps } from "../../displayFieldProps";
import React, { useCallback, useMemo, useState } from "react";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { replaceVariables } from "@/utils/funcs";
import { useSearchModelQuery } from "@/store/api";
import { MultivalDropdownEdit } from "./dropdown";
import { MultivalSelectorEdit } from "./selector";
import { MultivalFileEdit } from "./file";
import { MultivalTabExternalEdit } from "./external";

// Editable after this many options
const editableThreshold = 10;

interface MultivalEditComponent {
  component: any,
  pageSize: number,
}
/**
 * <b>Composant d'édition d'un champ de type multival (énumération)</b>
 */
export default function MultivalEdit({
  model,
  record,
  fieldLabel,
  fieldMetadata,
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  viewType,
}: DisplayFieldProps) {

  const { logger } = useLogger();

  const titleField = useMemo(
    () => fieldMetadata?.title_field || "name",
    [fieldMetadata]
  );
  const valueField = useMemo(
    () => fieldMetadata?.value_field || OBJECTS_ID_FIELD,
    [fieldMetadata]
  );

  // TODO: A remplacer par la gestion des champs external
  // Le modèle devra être déduit du champ external nature ?
  // const modelName = useMemo(() => fieldMetadata?.nature || "", [fieldMetadata]);

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

  /**
   * Adaptation valeur selectionnée pour le dropdown
   */
  const selectedOptions = useMemo(() => {
    return fieldValues.map((v) => ({
      value: v[valueField],
      label: v[titleField],
      ...v,
    }));
  }, [fieldValues, titleField, valueField]);

  /**
   * Async select handler
   *
   * @param {*} inputValue
   * @returns
   */

  // const queryEndpoint = useMemo(() => viewType=="edit" ?record["uid"]?replaceVariables(fieldMetadata?.source, record):null:replaceVariables(fieldMetadata?.source, record)
  // ,[record, fieldMetadata?.source]);

  const queryEndpoint = useMemo(() => replaceVariables(fieldMetadata?.source, record), [record, fieldMetadata?.source]);
  const [searchString, setSearchString] = useState('');


  const componentMap: Record<string, MultivalEditComponent> = {
    "": { component:MultivalDropdownEdit, pageSize: editableThreshold },
    selector: { component:MultivalSelectorEdit, pageSize: -1 },
    file: { component:MultivalFileEdit, pageSize: -1 },
    table: { component:MultivalTabExternalEdit, pageSize: -1 }
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
      page: -1,
      pageSize: componentEntry?.pageSize || editableThreshold,
    }
  }, { skip: !queryEndpoint });

  // Plus de résultat que ce qui est retourné
  const hasMore = useMemo(() => objectData?.data?.has_mode || objectData?.data?.query?.has_more || false, [objectData]);

  const loadOptions = useCallback(
    async (inputValue: any) => {

      const options =
        objectData &&
        objectData?.data?.records?.map((record: any) => ({
          data: { value: record[valueField], label: record[titleField] },
        }));

      const result = { data: options, hasMore };

      return result;
    },
    [model, record, titleField, valueField,objectData]
  );
  

  const fieldComponent = componentEntry?.component || MultivalDropdownEdit;
if(objectData){
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
    selectedOptions,
    titleField,
    valueField,
    objectData,
  } as React.ClassAttributes<{}>);
}
}
