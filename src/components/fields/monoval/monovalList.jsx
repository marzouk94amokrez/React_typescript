import { useMemo } from "react";

/** <b> Composant de liste d'un champ de type monoval (énumération) </b> */
export default function MonovalList({
  record,
  fieldName,
  fieldClassName,
  fieldMetadata,
}) {

  // Champ à utiliser pour avoir une traduction textuelle du modèle
  const titleField = useMemo(() => fieldMetadata?.title_field || 'name', [fieldMetadata]);

  // Valeur du champ
  const value = useMemo(() => {
    const r = record || {};
    const v = r[fieldName];
    return v || '';
  }, [record, fieldName]);


  // Titre de la valeur du champ
  const displayValue = useMemo(() => {
    return value[titleField] ||value|| '';
  }, [value, titleField]);

  return <span className={`${fieldClassName || ''}`}>{displayValue}</span>;
}
