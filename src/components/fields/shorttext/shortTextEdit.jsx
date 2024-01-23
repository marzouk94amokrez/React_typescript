import { useEffect, useMemo, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

/** <b>Composant d'édition d'un champ de type shorttext</b> */
export default function ShortTextEdit({ fieldName, record, onUpdate, fieldClassName, componentClassName, fieldMetadata }) {
  /**
   * Valuer par défaut du champ
   */
  const defaultValue = useMemo(() => {
    const r = record || {}
    return fieldName && r[fieldName];
  }, [record, fieldName]);
  
  const [value, setValue] = useState('');
  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  if (fieldMetadata.changeable === false) {
    return (
      <div className={`flex-1 ${fieldClassName ? fieldClassName : ''}`}>
        <input
          type="text"
          value={value}
          className={`text-right w-full ${componentClassName ? componentClassName : ''} cursor-not-allowed`}
          readOnly
        >
        </input>
      </div>
    )
  }

  if (fieldMetadata.phone) {
    return (
      <div className={`float-left ${fieldClassName ? fieldClassName : ''}`}>
        <PhoneInput
          country={'fr'}
          value={value}
          onChange={(value) => {
            const newValue = value;
            setValue(newValue);
            if (onUpdate) {
              onUpdate({ [fieldName]: newValue });
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className={`flex-1 ${fieldClassName ? fieldClassName : ''}`}>
      <input
        type="text"
        id={fieldName}
        value={value}
        className={` w-full ${componentClassName ? componentClassName : 'text-right'}`}
        onChange={(event) => {
          const newValue = event.target.value;
          setValue(newValue);
          if (onUpdate) {
            onUpdate({ [fieldName]: newValue });
          }
        }}
      >
      </input>
    </div>
  );
}
