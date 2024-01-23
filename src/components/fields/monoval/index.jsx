import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import MonovalList from "./monovalList";
import MonovalFilter from "./monovalFilter";
import MonovalEdit from "./edit";
import MonovalConsult from "./consult";

/** <b>Composant qui contient l'affichage d'un champ de type monoval (énumération) en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function Monoval(){ return(<></>)}

const field = "monoval";
fieldsDictionary.registerField(FieldViewType.LIST, field, MonovalList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, MonovalConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, MonovalEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, MonovalFilter);
