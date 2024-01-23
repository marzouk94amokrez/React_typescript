import { useTranslation } from "react-i18next";
import DateTimeConsult from "../datetime/consult";
import { useMemo } from "react";
import { FieldViewType } from "../fieldViewType";

/**
 * Format de date par défaut
 */
export const defaultDateFormat = "DD/MM/YYYY";

/** <b>Composant de liste d'un champ de type Date</b> */
export default function DateList({ fieldName, record }) {
  const { t } = useTranslation(['common']);
  const dateFormat = useMemo(() => t('settings.date.dateformat') || defaultDateFormat, [t]);

  return (
    <DateTimeConsult
      fieldName={fieldName}
      record={record}
      format={dateFormat}
      viewType={FieldViewType.LIST}
    />
  )
}
