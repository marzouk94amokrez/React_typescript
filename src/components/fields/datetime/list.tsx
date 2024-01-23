import DateTimeConsult, { DateTimeProps } from "@/components/fields/datetime/consult";
import { FieldViewType } from "../fieldViewType";


/** <b>Composant de liste d'un champ de type datetime</b>*/
export default function DateTimeList({ fieldName, record, format }: DateTimeProps) {
  return (
    <DateTimeConsult
      fieldName={fieldName}
      record={record}
      format={format}
      viewType={FieldViewType.LIST}
    />
  )
}
