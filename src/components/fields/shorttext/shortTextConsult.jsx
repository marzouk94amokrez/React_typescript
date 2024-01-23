import { useMemo } from "react";

/** <b>Composant de consultation d'un champ de type shorttext</b> */
export default function ShortTextConsult({ fieldName, record}) {
  const value = useMemo(() => {
    const r = record || {};
    const v = r[fieldName];

    return v || ''
  }, [record, fieldName])

  return (
    <span className="flex items-center">
      <span name={fieldName} className="">{value}</span>
    </span>
  );
}
