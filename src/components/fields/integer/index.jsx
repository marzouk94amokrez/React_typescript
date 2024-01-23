import  DecimalFilter  from '../decimal/decimalFilter';
import fieldsDictionary from '../fieldsDictionary';
import { FieldViewType } from "../fieldViewType";
import IntegerList from './integerList';
import IntegerConsult from './integerConsult';
import  IntegerEdit from './integerEdit';

/** <b>Composant qui contient l'affichage d'un champ de type integer en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function Integer(){return(<></>)}

const field = 'integer';
fieldsDictionary.registerField(FieldViewType.LIST, field, IntegerList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, IntegerConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, IntegerEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, DecimalFilter);
