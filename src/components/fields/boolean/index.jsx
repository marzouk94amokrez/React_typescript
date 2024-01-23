import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import BooleanList from "./list";
import BooleanConsult from "./consult";
import BooleanEdit from "./edit";
import BooleanFilter from "./filter";

/** <b>Composant qui contient l'affichage d'un champ de type booléen en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function Boolean(){
  return (<>Boolean</>)
}
const field = "boolean";
fieldsDictionary.registerField(FieldViewType.LIST, field, BooleanList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, BooleanConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, BooleanEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, BooleanFilter);
