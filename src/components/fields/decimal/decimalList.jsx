import DecimalConsult from "./decimalConsult";

/** <b>Composant de liste d'un champ de type décimal</b>*/
export default function DecimalList({ fieldName, record, fieldsMetadataMap, format, fieldMetadata }) {
  return (
    <DecimalConsult
      fieldMetadata={fieldMetadata}
      fieldName={fieldName}
      record={record}
      fieldsMetadataMap={fieldsMetadataMap}
      format={format}
    />
  )
}
