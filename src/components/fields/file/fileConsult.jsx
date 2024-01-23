import { useMemo } from "react";

/** <b>Composant de consultation  d'un champ de type file</b> */
export default function FileConsult({ model, record, fieldName }) {
  const documents = useMemo(() => {
    const r = record || {};
    const v = r[fieldName];

    if (Array.isArray(v)) {
      return v;
    }

    return v !== undefined ? [v] : [];
  }, [record, fieldName]);

  return (
    <span>{documents.map((d) => <a key={d} href={d} target="_blank" rel="noreferrer">{d.split('/').pop()}</a>)}</span>
  )
}
