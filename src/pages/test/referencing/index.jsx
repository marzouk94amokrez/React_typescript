import { useMemo } from "react";
import Referencing from "@/pages/referencing";
import { useGetModelDefinitionQuery } from "@/store/api";

export default function FormReferencing() {
  const modelCode = "referencing";
  const {
    data: modelDefinitions,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetModelDefinitionQuery(modelCode, { skip: !modelCode });

  // Chargement du layout du modèle
  const model = modelDefinitions?.data?.definitions;

  // Chargement des champs du model
  const fields = useMemo(
    () =>
      model?.structure?.map((f) => [
        f.field_name,
        { ...f, code: f.field_name, type: f.field_type },
      ]),
    [model?.structure]
  );
  const modelFields = useMemo(() => {
    return new Map(fields);
  }, [fields]);

  return (
    <>
      {model ? (
        <Referencing model={model} fieldsMetadataMap={modelFields} />
      ) : (
        <span>Loading...</span>
      )}
    </>
  );
}
