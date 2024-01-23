import { useCallback, useEffect, useMemo, useState } from "react";
import { ModelField } from "@/api/data/modelField";
import { Model } from "@/api/data/model";
import DisplayField from "../../displayField";
import { FieldViewType } from "../../fieldViewType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { useGetModelDefinitionQuery } from "@/store/api";
import { useAppSelector } from "@/hooks/store";
import { useParams } from "react-router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { MultivalProps } from "../../multival/multivalProps";

/** <b>Composant d'édition monoval de type dropdown</b> */
export const MonovalTabExternalEdit = ({
  fieldMetadata,
  record,
  fieldName,
  fieldsMetadataMap,
  valueField,  
  validations,
  onUpdate,
}: MultivalProps) => {
  // const { modelName: fallbackModelName } = useParams();

  // const model: Model | undefined = useAppSelector((state) => state.appContext.model);

  // const selectedMenu: any[] = useAppSelector((state) => state.appContext.menu || []);
 
  // const modelName = useMemo(() => selectedMenu?.at(0)?.object || fallbackModelName, [selectedMenu?.at(0)?.object, fallbackModelName]);

  // const {
  //   data: modelDefinitions,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error
  // } = useGetModelDefinitionQuery(modelName ?? skipToken);


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
  /**
   * Valeurs sélectionnées dans l'enregistrement
   */
  const [fieldValues, setFieldValues] = useState<any[]>([]);

  useEffect(() => {
    const r = record || {};
    const v = r[fieldName || ""];
    const records = v ? (Array.isArray(v) ? v : [v]) : [];
    setFieldValues(records);
  }, [record, fieldName]);

  /**
   * Load model object and fields based on path
   */
  // const loadModelAndFields = useCallback(async () => {
  //   setExternalModel(model);

  //   setExternalModelFieldsMap(modelFields);

  //   const fieldsIntabExternal = Array.from(fields.values()).filter(
  //     (field: ModelField) => field.inexternallist === true
  //   );
  //   setExternalModelFieldsList(fieldsIntabExternal);
  // }, [externalModelName, model, modelFields]);

  // update model & components
  // useEffect(() => {
  //   loadModelAndFields();
  // }, [loadModelAndFields]);

  //Delete element in table
  const deleteRowTab = useCallback(
    async (row: any) => {
      const index = fieldValues.findIndex(
        (r) => r[valueField] === row[valueField]
      );
      const tempValues = [...fieldValues];
      tempValues.splice(index, 1);
      setFieldValues(tempValues);
      onUpdate &&
        onUpdate({
          [fieldName]: tempValues,
        });
    },
    [fieldValues, valueField, fieldName, onUpdate]
  );

  let countKeys = 0;
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            {externalmodelFieldsList &&
              externalmodelFieldsList?.map((field: ModelField) => {
                return (
                  <th
                    key={field.field_name}
                    className="bg-[var(--bleu-secondaire)] text-white border-2"
                  >
                    {field.field_name}
                  </th>
                );
              })}
          </tr>
        </thead>
        <tbody>
          {fieldValues && fieldValues.map((row: any) => {
            countKeys++;
            return (
              <tr key={`${row[OBJECTS_ID_FIELD]}_${countKeys}`}>
                {externalmodelFieldsList && externalmodelFieldsList?.map((field: ModelField) => {
                  return (
                    <td key={`${row[OBJECTS_ID_FIELD]}_${field.field_name}`}>
                      <DisplayField
                        model={externalModel}
                        fieldMetadata={field}
                        fieldsMetadataMap={externalmodelFieldsMap}
                        fieldName={field.field_name}
                        className={"overflow-x-auto"}
                        record={row}
                        fetchedRecord={row}
                        viewType={FieldViewType.EDIT}
                        onUpdate={(updatedRowFields: any) => {
                          const updatedRow = { ...row };
                          for (const uf in updatedRowFields) {
                            updatedRow[uf] = updatedRowFields[uf];
                            const fv = [...fieldValues];
                            const indexRowChange = fv.findIndex(
                              (r) => r[valueField] === row[valueField]
                            );
                            fv[indexRowChange] = updatedRow;
                            onUpdate &&
                              onUpdate({
                                [fieldName]: fv,
                              });
                          }
                        }}
                        validations={validations}
                        isExternal={true}
                      />
                    </td>
                  );
                })}
                <td className="pl-2 text-red-500" onClick={() => deleteRowTab(row)}>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    </>
  );
};
