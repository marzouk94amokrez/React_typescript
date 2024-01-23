import MultivalFilter from '../multival/multivalFilter';
import { DisplayFieldProps } from "../displayFieldProps";

/**
 * <b> Composant de filtre d'un champ de type monoval (énumération) </b>
 */
export default function MonovalFilter(props: DisplayFieldProps) {
  return (
    <MultivalFilter
      {...props}
      isMulti={false}
    />
  )
}
