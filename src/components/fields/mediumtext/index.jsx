import fieldsDictionary from '../fieldsDictionary';
import { FieldViewType } from "../fieldViewType";
import ShortTextFilter from '../shorttext/shortTextFilter';
import MediumTextConsult from './mediumTextConsult';
import MediumTextEdit from './mediumTextEdit';
import MediumTextList from './mediumTextList';

/** <b>Composant qui contient l'affichage d'un champ de type mediumText en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function MediumText(){return(<></>)}

const field = 'mediumtext';
fieldsDictionary.registerField(FieldViewType.LIST, field, MediumTextList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, MediumTextConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, MediumTextEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, ShortTextFilter);
