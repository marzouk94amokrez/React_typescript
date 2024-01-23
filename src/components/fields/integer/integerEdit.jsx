import DecimalEdit from "@/components/fields/decimal/decimalEdit";

/** <b>Composant d'édition d'un champ de type integer</b> */
export default function IntegerEdit({ record, fieldName, fieldClassName, onUpdate, componentClassName, fieldsMetadataMap, fieldMetadata }) {
  return (
      <DecimalEdit
        record={record}
        fieldMetadata={fieldMetadata}
        fieldName={fieldName}
        fieldsMetadataMap={fieldsMetadataMap}
        fieldClassName={fieldClassName}
        componentClassName={componentClassName}
        format="0,0"
        onUpdate={onUpdate}
      />
  );
}
