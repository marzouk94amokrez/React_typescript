import DateTimeEdit from "@/components/fields/datetime/edit";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { defaultDateFormat } from "./consult";

/**
 <b> Composant d'édition d'un champ de type Date</b>
 */
export default function DateEdit({ record, fieldName, onUpdate }) {
  const { t } = useTranslation(['common']);
  const dateFormat = useMemo(() => t('settings.date.dateformat') || defaultDateFormat, [t]);

  return (
    <DateTimeEdit
      record={record}
      fieldName={fieldName}
      onUpdate={onUpdate}
      format={dateFormat}
    />
  )
}
