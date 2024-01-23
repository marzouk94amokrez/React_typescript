import React, { useCallback, useMemo, useState } from "react";
import { DisplayFieldProps } from "../../displayFieldProps";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { replaceVariables } from "@/utils/funcs";
import { useSearchModelQuery } from "@/store/api";
import { MonovalConsultList } from "./list";
import { MonovalSelectorDisplay } from "./selector";
import { MonovalTabExternalDisplay } from "./external";

const editableThreshold = 10;

interface MonovalConsultComponent {
  component: any,
  pageSize: number,
}

/** <b>Composant de consultation d'un champ de type monoval (énumération)</b> */
export default function MonovalConsult({  model,
  record,
  fieldLabel,
  fieldMetadata,
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  viewType
}: DisplayFieldProps) {
  
  const titleField = useMemo(() => fieldMetadata?.title_field || 'name', [fieldMetadata]);
  const valueField = useMemo(() => fieldMetadata?.value_field || OBJECTS_ID_FIELD, [fieldMetadata]);
  const [isHasMore, setIsHasMore] = useState<boolean | undefined>(undefined)
  
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
      { value: v[valueField], label: v[titleField] }
    ))

  }, [fieldValues, titleField, valueField]);

  const queryEndpoint = useMemo(() => record&& replaceVariables(fieldMetadata?.source, record), [record, fieldMetadata?.source]);
  const [searchString, setSearchString] = useState('');

  const componentMap: Record<string, MonovalConsultComponent> = {
    "": { component: MonovalConsultList, pageSize: editableThreshold },
    "selector": { component: MonovalSelectorDisplay, pageSize: -1 },
    "table": { component: MonovalTabExternalDisplay, pageSize: -1 },
  }

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
          value: record[valueField], label: record[titleField],
        }));

        if (isHasMore === undefined) {
          setIsHasMore(hasMore)
        }

      return options;
    },
    [objectData, model, record, titleField, valueField]
  );
  
  const fieldComponent = componentEntry?.component || MonovalConsultList;

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
    isHasMore,
  } as React.ClassAttributes<{}>)

}
