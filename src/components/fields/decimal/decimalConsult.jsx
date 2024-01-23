import numeral from "numeral";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * Format numérique par défaut
 */
const defaultFormat = '0,0.00';

/** <b>Composant de consultation d'un champ de type décimal</b> */
export default function DecimalConsult({ fieldName, record, fieldClassName, componentClassName, format = defaultFormat, fieldsMetadataMap, fieldMetadata }) {
  const { t } = useTranslation(['common']);

  // Valeur par défaut du champ
  const defaultValue = useMemo(() => {
    const r = record || {};
    const v = r[fieldName];

    return v || ''
  }, [record, fieldName])

  const [value, setValue] = useState('');


  // Champ de devise
  const currencyField = useMemo(() => {
    if (!fieldsMetadataMap) {
      return undefined
    }

    if (fieldMetadata?.amount) {
      const fields = Array.from(fieldsMetadataMap.values()).filter((f) => f.devise === true);
      return fields[0] || undefined;
    }
  }, [fieldsMetadataMap, fieldMetadata]);

  // Symbole de devise
  const currencySymbol = useMemo(() => {
    if (!record || !currencyField) {
      return '';
    }

    // Champ d'affichage de l'enum
    const displayField = currencyField.title_field || 'name';
    if (!record[currencyField.field_name]) {
      return '';
    }

    return record[currencyField.field_name][displayField];
  }, [record, currencyField]);

  useEffect(() => {
    const decimalSeparator = t('settings.number.delimiters.decimal');
    const localizedDecimal = defaultValue.toString().replace('.', decimalSeparator);
    const value = numeral(localizedDecimal);
    setValue(value.format(format));
  }, [defaultValue, format, t]);

  return (
    <span className={`flex items-center ${fieldClassName ? fieldClassName : ''}`}>
      <span className={`${componentClassName ? componentClassName : ''}`}>{value}</span>
      {currencySymbol &&
        <span className="rounded text-xs bg-[var(--multi-enum-background-color)] px-1 items-center uppercase ml-1">
          {currencySymbol}
        </span>
      }
    </span>
  );
}
