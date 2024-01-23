import DecimalList from "@/components/fields/decimal/decimalList";

/** <b>Composant d'affichage d'un champ de type integer</b> */
export default function IntegerList({ record, fieldName, fieldsMetadataMap, fieldMetadata }) {
  return (
    <DecimalList
      record={record}
      fieldMetadata={fieldMetadata}
      fieldName={fieldName}
      fieldsMetadataMap={fieldsMetadataMap}
      format="0,0"
    />
  )
}
