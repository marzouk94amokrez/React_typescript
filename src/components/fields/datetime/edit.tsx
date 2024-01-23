import { useCallback, useEffect, useMemo, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { useTranslation } from "react-i18next";
import { DateTimeProps, defaultDateTimeFormat } from "./consult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/pro-solid-svg-icons";

/**
 <b> Composant d'édition d'un champ de type Datetime</b>
 */
export default function DateTimeEdit({ record, fieldName, onUpdate, format = defaultDateTimeFormat }: DateTimeProps) {
  const { t } = useTranslation(['common']);
  const dateFormat = useMemo(() => format || `${t('settings.date.dateformat')} ${t('settings.date.timeformat')}`, [t, format]);

  /**
   * Valuer par défaut du champ
   */
  const defaultValue = useMemo(() => {
    const r = record || {}
    return fieldName && r[fieldName] ? new Date(r[fieldName]) : undefined;
  }, [record, fieldName]);
  
  /**
   * Valeur à afficher sur le champ
   */
  const [value, setValue] = useState<Date|undefined>();
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  /**
   * Gestion de la mise à jour du champ
   * Envoyer la mise à jour au parent
   */
  const onDatetimeUpdate = useCallback((dateTime: any) => {
    if (!onUpdate) {
      return;
    }

    onUpdate({
      [fieldName as string]: dateTime && !isNaN(dateTime) ? dateTime.toISOString() : '',
    })
  }, [fieldName, onUpdate]);
  
  return (
    <div>
      <DateTimePicker
        className={`border-none w-full ml-1`}
        onChange={onDatetimeUpdate}
        value={value}
        format={dateFormat.replaceAll('D', 'd')}
        calendarIcon={<FontAwesomeIcon icon={faCalendarDays} />}
      />
    </div>
  )
}
