import MediumTextEdit from "@/components/fields/mediumtext/mediumTextEdit"

/** <b>Composant d'édition d'un champ de type texte longue</b> */
export default function LongTextEdit({ record, fieldName, onUpdate, validations, fieldClassName }) {
  return (
    <MediumTextEdit
      fieldClassName={fieldClassName}
      record={record}
      fieldName={fieldName}
      validations={validations}
      onUpdate={onUpdate}
    />
  )
}
