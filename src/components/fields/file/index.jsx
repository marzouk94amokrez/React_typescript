import fieldsDictionary from '../fieldsDictionary';
import { FieldViewType } from "../fieldViewType";
import FileList from './fileList';
import FileConsult from './fileConsult';
import FileEdit from './fileEdit';
import FileFilter from './fileFilter';

/** <b>Composant qui contient l'affichage d'un champ de type file en: </b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function File(){return(<></>)}

const field = 'file';
fieldsDictionary.registerField(FieldViewType.LIST, field, FileList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, FileConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, FileEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, FileFilter);
