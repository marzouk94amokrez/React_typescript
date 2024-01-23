
/** <b>Composant de consultation d'un champ de type mediumText</b> */
export default function MediumTextConsult({ record, fieldName }) {
  const value = (record || {})[fieldName];
  return (
    <span>
      <span className="text-[var(--color-sec)] text-[0.8rem]"></span>
      <span className="">{value}</span>
    </span>
  )
}
