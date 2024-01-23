import DecimalConsult from "@/components/fields/decimal/decimalConsult";


/** <b>Composant de consultation d'un champ de type integer</b> */
export default function IntegerConsult({ record, fieldName, fieldClassName, componentClassName, fieldsMetadataMap, fieldMetadata }) {
  return (
    <DecimalConsult
      record={record}
      fieldMetadata={fieldMetadata}
      fieldName={fieldName}
      fieldsMetadataMap={fieldsMetadataMap}
      fieldClassName={fieldClassName}
      componentClassName={componentClassName}
      format="0,0"
    />
  );
}
