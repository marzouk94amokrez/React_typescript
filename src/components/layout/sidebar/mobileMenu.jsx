import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";

/**
 * <b>Composant contenant le menu de la page compatible à l'affichage mobile</b>
 */
export default function MobileMenu({ opened, onClick, className }) {
  return (
    <button className={`cursor-pointer ${className}`} onClick={onClick}>
      <FontAwesomeIcon icon={opened? faClose : faBars} size="xl" />
    </button>
  )
}
