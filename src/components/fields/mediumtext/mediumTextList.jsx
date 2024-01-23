import MediumTextConsult from "./mediumTextConsult";

/** <b>Composant de liste d'un champ de type mediumText </b> */
export default function MediumTextList({ record, fieldName }) {
  return (
    <MediumTextConsult record={record} fieldName={fieldName} />
  )
}
