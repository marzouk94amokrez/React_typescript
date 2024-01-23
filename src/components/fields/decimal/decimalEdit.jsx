import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { NumericFormat } from "react-number-format";
import numeral from "numeral";

/**
 * Format numérique par défaut
 */
const defaultFormat = '0,0.00';

/** <b>Composant d'édition d'un champ de type décimal</b> */
export default function DecimalEdit({ fieldName, record, onUpdate, format = defaultFormat, fieldClassName, componentClassName, fieldsMetadataMap, fieldMetadata }) {
  const { t } = useTranslation(['common']);
  const defaultValue = useMemo(() => {
    const r = record || {};
    return (r[fieldName] || '').toString();
  }, [record, fieldName]);
  const [value, setValue] = useState('');
  const decimalScale = useMemo(() => {
    const f = format.split('.');
    if (f.length !== 2) return 0;

    return f[1].length;
  }, [format]);


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
    const localizedDecimal = defaultValue.replace('.', decimalSeparator);
    const value = numeral(localizedDecimal);
    setValue(value.value());
  }, [defaultValue, format, t]);

  const onChange = useCallback((event) => {
    const value = event.target.value;
    const numeralValue = numeral(value);

    setValue(value);

    if (onUpdate) {
      onUpdate(
        {
          [fieldName]: numeralValue.value(),
        }
      );
    }
  }, [onUpdate, fieldName]);

  return (
      <div className={`flex-1 ${fieldClassName ? fieldClassName : ''}`}>
        <NumericFormat
          value={value}
          className={`text-right w-full ${componentClassName ? componentClassName : ''}`}
          allowLeadingZeros
          thousandSeparator={t('settings.number.delimiters.thousands')}
          decimalSeparator={t('settings.number.delimiters.decimal')}
          decimalScale={decimalScale}
          onChange={onChange}
          suffix={ ` ${currencySymbol}` }
        />
      </div>
  );
}
