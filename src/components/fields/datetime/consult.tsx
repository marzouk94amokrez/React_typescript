import moment from "moment";
import { DisplayFieldProps } from "@/components/fields/displayFieldProps";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const defaultDateTimeFormat = "DD/MM/yyyy HH:mm";

export interface DateTimeProps extends DisplayFieldProps {
  format?: string,
}

/** <b>Composant de consultation d'un champ de type datetime</b>*/
export default function DateTimeConsult({ fieldName, record, format = defaultDateTimeFormat }:DateTimeProps) {
  const { t } = useTranslation(['common']);
  const dateFormat = useMemo(() => format || `${t('settings.date.dateformat')} ${t('settings.date.timeformat')}`, [t, format]);

  const value = useMemo(() => {
    if (!record) {
      return '';
    }

    return record[fieldName || ''] || ""
  }, [record]);
  const momentDate = useMemo(() => moment(value), [value]);
  const date = useMemo(() => momentDate.isValid() ? momentDate.format(dateFormat) : '', [momentDate, dateFormat]);

  return <span>{date}</span>;
}
