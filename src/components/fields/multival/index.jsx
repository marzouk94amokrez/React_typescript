import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import MultivalList from "./multivalList";
import MultivalFilter from "./multivalFilter";
import MultivalEdit from "./edit";
import MultivalConsult from "./consult";

/** <b>Composant qui contient l'affichage d'un champ de type multival (énumération)</b>
 * <li>Affichage liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function Multival(){return(<></>)}

const field = "multival";
fieldsDictionary.registerField(FieldViewType.LIST, field, MultivalList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, MultivalConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, MultivalEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, MultivalFilter);
