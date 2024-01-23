import { GenericDateTimeFilter } from "../datetime/genericDateTimeFilter";

/** <b>Composant de filtre d'un champ de type Date</b>
*/
export default function DateFilter({ fieldName, record, onUpdate }) {
  return (
    <GenericDateTimeFilter
      fieldName={fieldName}
      record={record}
      onUpdate={onUpdate}
      format="dd/MM/yyyy"
    />
  );
}
