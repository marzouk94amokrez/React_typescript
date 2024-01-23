import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useMemo } from "react";
import DisplayField from "../../displayField";
import { FieldViewType } from "../../fieldViewType";
import { MultivalProps } from "../multivalProps";
import { useAppSelector } from "@/hooks/store";
import { useGetModelDefinitionQuery } from "@/store/api";

/** <b>Composant de consultation multival de type tab-external</b> */
export const MultivalTabExternalDisplay = ({ fieldMetadata, record, fieldName, fieldsMetadataMap, selectedOptions }: MultivalProps) => {
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
  const specialFieldsList = useAppSelector((state) => {
    return  state.objectsDefinitions[externalModel?.code]?.specialFields?.map(
        ([prop, fields]) => [prop, fields.map((f:any) => externalmodelFieldsMap.get(f)!)]
      ) || []
    } 
  );

  const specialFieldsMap: any = Object.fromEntries(specialFieldsList);
  const externalmodelFieldsList: ModelField[] = specialFieldsMap?.inexternallist || [];
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
        {selectedOptions && selectedOptions.map((row: any) => (
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
                  hideLabel={true}
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
