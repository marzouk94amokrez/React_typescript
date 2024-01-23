import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import "./datetime.scss";
import DateTimeConsult from "./consult";
import DateTimeFilter from "./filter";
import DateTimeEdit from "./edit";
import DateTimeList from "./list";

/** <b>Composant qui contient l'affichage d'un champ de type datetime en: </b>
 *  <li>Liste</li>
 *  <li>Consultation</li>
 *  <li>Édition</li>
 *  <li>Filtre</li>
 */
export function DateTime() { return (<></>) }

const field = "datetime";
fieldsDictionary.registerField(FieldViewType.LIST, field, DateTimeList as any);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, DateTimeConsult as any);
fieldsDictionary.registerField(FieldViewType.EDIT, field, DateTimeEdit as any);
fieldsDictionary.registerField(FieldViewType.FILTER, field, DateTimeFilter as any);
