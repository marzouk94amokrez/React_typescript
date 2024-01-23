import fieldsDictionary from '../fieldsDictionary';
import { FieldViewType } from "../fieldViewType";
import ShortTextFilter from '../shorttext/shortTextFilter';
import HtmlTextList from './htmlTextList';
import HtmlTextConsult from './htmlTextConsult';
import HtmlTextEdit from './htmlTextEdit';

/** <b>Composant qui contient l'affichage d'un champ de type html en:</b>
 * <li>Liste</li>
 * <li>Consultation</li>
 * <li>Édition</li>
 * <li>Filtre</li>
 */
export function HtmlText() {
  return(
    <>HtmlText</>
  )
}

const field = 'htmltext';
fieldsDictionary.registerField(FieldViewType.LIST, field, HtmlTextList);
fieldsDictionary.registerField(FieldViewType.CONSULT, field, HtmlTextConsult);
fieldsDictionary.registerField(FieldViewType.EDIT, field, HtmlTextEdit);
fieldsDictionary.registerField(FieldViewType.FILTER, field, ShortTextFilter);
