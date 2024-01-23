import React, { useCallback, useMemo, useState ,useEffect} from "react";
import { DisplayFieldProps } from "../../displayFieldProps";
import { replaceVariables } from "@/utils/funcs";
import { useSearchModelQuery } from "@/store/api";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { MonovalDropdownEdit } from "./dropdown";
import { MonovalSelectorEdit } from "./selector";
import { MonovalTabExternalEdit } from "./external";
import { use } from "i18next";

// Editable after this many options
const editableThreshold = 10;

interface MonovalEditComponent {
  component: any,
  pageSize: number,
}

/**
 * <b>Composant d'édition d'un champ de type monoval (énumération)</b>
 */
export default function MonovalEdit({
  model,
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

  const componentMap: Record<string, MonovalEditComponent> = {
    "": { component: MonovalDropdownEdit, pageSize: editableThreshold },
    "selector": { component: MonovalSelectorEdit, pageSize: -1 },
    "table": { component: MonovalTabExternalEdit, pageSize: -1 },
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
  const [data, setData] = useState<any>();
  useEffect(() => {
  setData(objectData)
}, [objectData])
  // Plus de résultat que ce qui est retourné
  const hasMore = useMemo(() => objectData?.data?.has_mode || objectData?.data?.query?.has_more || false, [objectData]);

  const loadOptions = useCallback(async (inputValue: any) => {

    const options = objectData ? objectData?.data?.records?.map((record: any) => (
      { value: record[valueField], label: record[titleField] }
    )):fieldMetadata?.field_values;

    if (isHasMore === undefined) {
      setIsHasMore(hasMore)
    }

    return options;
  }, [model, record, fieldMetadata, valueField, titleField, isHasMore,data]);

  const fieldComponent = componentEntry?.component || MonovalDropdownEdit;
if(objectData||fieldMetadata?.field_values){
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
    objectData,
    
    
  } as React.ClassAttributes<{}>)
}

}
