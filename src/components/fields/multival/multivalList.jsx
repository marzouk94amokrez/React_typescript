import MultivalConsult from "./consult";


/** <b>Composant de liste d'un champ de type multival (énumération)</b> */
export default function MultivalList({ record, fieldName, fieldMetadata }) {
  return <MultivalConsult record={record} fieldName={fieldName} fieldMetadata={fieldMetadata} selector={false} />;
}
