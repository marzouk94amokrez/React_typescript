import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import ShortTextList from "./shortTextList";
import ShortTextConsult from "./shortTextConsult";
import ShortTextEdit from "./shortTextEdit";
import ShortTextFilter from "./shortTextFilter";
import "./shorttext.scss";

/** <b>Composant qui contient l'affichage d'un champ de type shorttext en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function ShortText(){return(<></>)}

const field = "shorttext";
fieldsDictionary.registerField(FieldViewType.LIST, field, ShortTextList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, ShortTextConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, ShortTextEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, ShortTextFilter);
