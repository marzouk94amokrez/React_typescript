import { GenericDateTimeFilter } from "./genericDateTimeFilter";

/** <b>Composant de filtre pour le champ de type Datetime </b>
*/
export default function DateTimeFilter({ fieldName, record, onUpdate }:any) {
  return (
    <GenericDateTimeFilter
      fieldName={fieldName}
      record={record}
      onUpdate={onUpdate}
      format="dd/MM/yyyy"
    />
  );
}
