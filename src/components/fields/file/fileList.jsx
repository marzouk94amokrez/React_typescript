import { faFile } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/** <b>Composant de liste d'un champ de type file</b> */
export default function FileList({record, fieldName}) {
  const value = (record || {})[fieldName];
  const nameSplit = value && value.split("/");
  const name = nameSplit && nameSplit[nameSplit.length - 1];
  return (
    <span className="inline-flex items-center">
      <span>
        <a href={value} download={name} className="text-[color:var(--color-sec)]">
          <FontAwesomeIcon icon={faFile} />
        </a>
      </span>
    </span>
  )
}
