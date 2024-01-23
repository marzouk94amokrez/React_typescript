import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import DateList from "./list";
import DateEdit from "./edit";
import DateConsult from "./consult";
import DateFilter from "./filter";

/** <b>Composant qui contient l'affichage d'un champ de type Date en :</b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function Date() {
  return (<>Date</>)
}

const field = "date";
fieldsDictionary.registerField(FieldViewType.LIST, field, DateList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, DateConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, DateEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, DateFilter);
