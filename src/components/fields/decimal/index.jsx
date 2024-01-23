import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import DecimalList from "./decimalList";
import DecimalConsult from "./decimalConsult";
import DecimalEdit from "./decimalEdit";
import DecimalFilter from "./decimalFilter";

/** <b>Composant qui contient l'affichage d'un champ de type décimal en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function Decimal() {return(<></>)}

const field = "decimal";
fieldsDictionary.registerField(FieldViewType.LIST, field, DecimalList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, DecimalConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, DecimalEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, DecimalFilter);
