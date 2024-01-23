import fieldsDictionary from "../fieldsDictionary";
import { FieldViewType } from "../fieldViewType";
import ProcessList from "./processList";

/** <b>Composant qui contient l'affichage d'un champ de type process</b>
 * <li>Liste</li>
 */
export function Process() {return(<></>)}

const field = "process";
fieldsDictionary.registerField(FieldViewType.LIST, field, ProcessList as any);
