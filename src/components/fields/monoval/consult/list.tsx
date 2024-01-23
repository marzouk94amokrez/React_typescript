import { useMemo } from "react";

/** <b>Composant de consultation monoval de type liste </b> */
export function MonovalConsultList({ record, fieldName, fieldMetadata }: any) {
  // Champ à utiliser pour avoir une traduction textuelle du modèle
  const titleField = useMemo(() => fieldMetadata?.title_field || 'name', [fieldMetadata]);

  // Valeur du champ
  const value = useMemo(() => {
    const r = record || {};
    const v = r[fieldName];

    return v || ''
  }, [record, fieldName])

  // Titre de la valeur du champ
  const displayValue = useMemo(() => {
    return value[titleField] || '';
  }, [value, titleField]);
  
  return <span className="">{displayValue}</span>
}
