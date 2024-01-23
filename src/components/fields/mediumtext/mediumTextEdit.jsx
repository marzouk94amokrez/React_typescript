import { useEffect, useMemo, useState } from "react"

/** <b>Composant d'édition d'un champ de type mediumText</b> */
export default function MediumTextEdit({ record, fieldName, onUpdate, validations, fieldClassName }) {
  const defaultValue = useMemo(() => (record || {})[fieldName], [record, fieldName]);
  const [value, setValue] = useState(record[fieldName]);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className={`flex w-full border border-solid border-[var(--gris)] rounded-lg render ${fieldClassName ? fieldClassName : ''}`}>
      <textarea
        value={value}
        className="w-full p-2 rounded-lg"
        rows={8}
        onChange={(event) => {
          const newValue = event.target.value;
          setValue(newValue);
          if (onUpdate) {
            onUpdate({ [fieldName]: newValue });
          }
        }}
      ></textarea>
    </div>
  )
}
