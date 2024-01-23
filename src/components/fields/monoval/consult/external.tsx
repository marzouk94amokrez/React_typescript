import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { useAppSelector } from "@/hooks/store";
import { useGetModelDefinitionQuery } from "@/store/api";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import DisplayField from "../../displayField";
import { FieldViewType } from "../../fieldViewType";
import { MultivalProps } from "../../multival/multivalProps";
import { useCallback, useEffect, useMemo, useState } from "react";
/** <b>Composant de consultation monoval de type tab-external</b> */
export const MonovalTabExternalDisplay = ({ fieldMetadata, record, fieldName, fieldsMetadataMap, selectedOptions }: MultivalProps) => {
  // TODO: A remplacer par la gestion des champs external
  // Le modèle devra être déduit du champ external nature ?
  const externalModelName = useMemo(() => fieldMetadata?.nature || '', [fieldMetadata])
  
  const {
    data: modelDefinitions,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetModelDefinitionQuery(externalModelName, { skip: !externalModelName });
  
  const externalModel: Model = modelDefinitions?.data?.definitions;
  
  // Chargement des champs du model
  const fields = useAppSelector((state) => state.objectsDefinitions[externalModel?.code as string]?.fields);
  const externalmodelFieldsMap = useMemo(() => {
    return new Map<string, ModelField>(fields);
  }, [fields]);

  // Liste des propriétés spéciaux avec titre
  const specialFieldsList = useAppSelector((state) =>
  state.objectsDefinitions[externalModel?.code]?.specialFields?.map(([prop, fields]) =>
    [prop, fields.map((f) => externalmodelFieldsMap.get(f)!)]) || []);

  const specialFieldsMap: any = Object.fromEntries(specialFieldsList);
  const externalmodelFieldsList: ModelField[] = specialFieldsMap?.inexternallist || [];
  const [fieldValues, setFieldValues] = useState<any[]>([]);

  useEffect(() => {
    const r = record || {};
    const v = r[fieldName || ""];
    const records = v ? (Array.isArray(v) ? v : [v]) : [];
    setFieldValues(records);
  }, [record, fieldName]);

  return (<>
  
      <table className="w-full">
        <thead>
          <tr >
            {externalmodelFieldsList && externalmodelFieldsList?.map((field: ModelField) => {
              return <th key={field.field_name} className="bg-[var(--bleu-secondaire)] text-white border-2">{field.field_name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {fieldValues && fieldValues.map((row: any) => (
            <tr key={row[OBJECTS_ID_FIELD]} >
              {externalmodelFieldsList && externalmodelFieldsList?.map((field: ModelField) => {
                return <td key={`${row[OBJECTS_ID_FIELD]}_${field.field_name}`}>
                  <DisplayField
                    model={externalModel}
                    fieldMetadata={field}
                    fieldsMetadataMap={externalmodelFieldsMap}
                    fieldName={field.field_name}
                    className={"text-xs"}
                    record={row}
                    fetchedRecord={row}
                    viewType={FieldViewType.LIST}
                    isExternal={true}
                  />
                </td>
              })}
            </tr>
          )
          )
          }
        </tbody>
      </table>

  </>)
}
