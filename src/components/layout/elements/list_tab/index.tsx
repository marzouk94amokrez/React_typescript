import { useMemo } from "react";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import Template from "@/components/templates/template";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";
import { useGetModelDefinitionQuery } from "@/store/api";
import { useAppSelector } from "@/hooks/store";
import { replaceVariables } from "@/utils/funcs";

/**
 * <b>Composant de rendu des dispositions d'affichages de 'list_tab'</b>
 * 
 * @param param0 
 */
export function ListTab({ model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate }: LayoutElementProps) {
  //
  const elementLayout = useMemo(() => layouts[0] || {}, [layouts]);

  // Chargement du nom d'objet depuis 
  const externalModelName = useMemo(() => elementLayout.object || '', [elementLayout]);
  // URL de chargement des données
  const layoutEndpoint = useMemo(() => elementLayout.endpoint, [elementLayout]);

  const externalModelEndpoint = useMemo(() => record&&replaceVariables(layoutEndpoint, record), [layoutEndpoint, record]);


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
  const externalModelFields: Map<string, ModelField> = new Map((specialFieldsMap?.inexternallist || [])
    .map((field: any) => [field.field_name, field]));

  return (
    externalModel && externalModelFields
      ? (
        <div>
          <Template name='list_tab' model={externalModel} modelFields={externalModelFields} endpoint={externalModelEndpoint} isChild={true} parentViewType={viewType} />
        </div>
      )
      : <></>
  )
}

layoutElementsDictionary.registerLayoutElement('list_tab', ListTab);
