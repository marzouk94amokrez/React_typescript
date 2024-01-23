import fieldsDictionary from '../fieldsDictionary';
import { FieldViewType } from "../fieldViewType";
import ShortTextFilter from '../shorttext/shortTextFilter';
import LongTextConsult from './longTextConsult';
import LongTextList from './longTextList';
import LongTextEdit from './longTextEdit';

/** <b>Composant qui contient l'affichage d'un champ de type longText en: </b> 
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
*/
export function LongText() {return(<></>)}

const field = 'longtext';
fieldsDictionary.registerField(FieldViewType.LIST, field, LongTextList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, LongTextConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, LongTextEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, ShortTextFilter);
