import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";

/**
 * <b>Composants de rendu des dispositions d'affichage `separator_blank`</b>
 * 
 * @param param0 
 */
export function SeparatorBlank({ model, modelFields, viewType, record, fetchedRecord, layouts }: LayoutElementProps) {
  return(<div className="py-[10px]"></div>);
}

layoutElementsDictionary.registerLayoutElement('separator_blank', SeparatorBlank);
