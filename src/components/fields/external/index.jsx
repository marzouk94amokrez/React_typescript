import fieldsDictionary from '../fieldsDictionary';
import { FieldViewType } from "../fieldViewType";
import ExternalList from './externalList';
import ExternalFilter from './externalFilter';
import ExternalEdit from './externalEdit';
import ExternalConsult from './externalConsult';

/** <b>Composant qui contient l'affichage d'un champ de type external en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function External(){return(<></>)}

const field = 'external';
fieldsDictionary.registerField(FieldViewType.LIST, field, ExternalList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, ExternalConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, ExternalEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, ExternalFilter);
