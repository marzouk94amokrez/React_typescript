import { useCallback, useEffect, useMemo, useState } from "react";
import CheckReferencing from "@/pages/referencing/checkReferencing";
import { useParams } from "react-router-dom";
import { Model } from "@/api/data/model";
import { useGetModelDefinitionQuery, useGetObjectByIdQuery } from "@/store/api";
import { useAppSelector } from "@/hooks/store";
import { ModelField } from "@/api/data/modelField";


export default function CheckReferencingRequest() {
  const { id } = useParams();

  const modelCode = "referencing";
  
  const {
    data: modelDefinitions,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetModelDefinitionQuery(modelCode, { skip: !modelCode });

  // Chargement des champs du model
  const model: Model = modelDefinitions?.data?.definitions;
  const fields = useAppSelector((state) => state.objectsDefinitions[model?.code as string]?.fields);
  const modelFields = useMemo(() => {
    return new Map<string, ModelField>(fields);
  }, [fields]);

  const modelEndpoint = useMemo(() => model?.endpoint || "", [model]);
  const {
    data: objectData,
    isLoading: isDataLoading,
    isSuccess: isDataLoaded,
    isError: isDataError,
    error: dataError,
  } = useGetObjectByIdQuery(
    { objectName: modelEndpoint, id },
    { skip: !modelEndpoint || !id }
  );
  
  /**
   * Enregistrement à afficher
   */
  const record = useMemo(() => {
    return objectData?.data?.records?.at(0);
  }, [objectData]);

  return (
    <>
      {model ? (
        <CheckReferencing record={record} model={model} fieldsMetadataMap={modelFields} />
      ) : (
        <span>...Loading... {JSON.stringify(modelDefinitions)}</span>
      )}
    </>
  );
}
