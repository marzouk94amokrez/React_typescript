
/** <b>Composant de consultation d'un champ de type texte longue</b> */
export default function LongTextConsult({ record, fieldName }) {
  const value = (record || {})[fieldName];

  return (
    <div className="p-1"> {value}</div>
  )
}
