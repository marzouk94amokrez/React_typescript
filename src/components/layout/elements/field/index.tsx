import DisplayField from "@/components/fields/displayField";
import { useMemo } from "react";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";

/**
 * <b>Composant de rendu des dispositions d'affichages des champs</b>
 * 
 * @param param0 
 */
export function Field({ model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate, validations}: LayoutElementProps) {
  const fieldMeta = useMemo(() => layouts[0] || {}, [layouts]);
  const fieldMetadata = useMemo(() => modelFields.get(fieldMeta.field), [modelFields, fieldMeta]);

  return(
    <div className="min-h-[1.25rem] mb-2">
      <DisplayField
        model={model}
        fieldsMetadataMap={modelFields}
        viewType={viewType}
        fieldMetadata={fieldMetadata}
        fieldLabel={fieldMeta.field}
        fieldName={fieldMeta.field}
        record={record}
        fetchedRecord={fetchedRecord}
        onUpdate={onUpdate}
        className={"w-full justify-between text-[0.9rem] text-[var(--color-default)]"}
        labelClassName=""
        fieldClassName={""}
        componentClassName={""}
        validations={validations}
      />
    </div>
  );
}

layoutElementsDictionary.registerLayoutElement('field', Field);
