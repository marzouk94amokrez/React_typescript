import { ModelField } from "@/api/data/modelField";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MultivalProps } from "../multivalProps";
import { useAppSelector } from "@/hooks/store";
import { Model } from "@/api/data/model";

/** <b>Composant de consultation multival de type file</b> */
export const MultivalFileDisplay = ({
  fieldMetadata,
  fieldName,
  fieldClassName,
  componentClassName,
  onUpdate,
  loadOptions,
  selectedOptions,
  valueField,
  titleField,
}: MultivalProps) => {

  const model: Model | undefined = useAppSelector((state) => state.appContext.model);

   // Chargement des champs du model
 const fields = useAppSelector((state) => state.objectsDefinitions[model?.code as string]?.fields);
 const modelFields = useMemo(() => {
   return new Map<string, ModelField>(fields);
 }, [fields]);

  const [urlField, setUrlField] = useState("");

  const setupUrlField = useCallback(async () => {
    const fileFields = Array.from(modelFields?.values() || []).filter(
      (field: ModelField) => field.type === "file"
    );
    setUrlField(fileFields[0]?.field_name || "");
  }, [fieldMetadata, modelFields]);

  useEffect(() => {
    setupUrlField();
  }, [setupUrlField]);
  return (
    <ul>
      {selectedOptions.map((f) => {
        return (
          <li key={f[valueField]}>
            <a target="_blank" href={f[urlField]} rel="noreferrer">
              {f[titleField]}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
