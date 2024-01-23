import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";

/**
 * <b>Composants de rendu des dispositions d'affichage `separator_line`</b>
 * 
 * @param param0 
 */
export function SeparatorLine({ model, modelFields, viewType, record, fetchedRecord, layouts, label }: LayoutElementProps) {
  return (
    <div className="border-b-[2px] border-[var(--border-bloc-dashboard)] mb-2">
      { label ? <span className="text-[var(--label-color)] text-right">{label}</span> : <></> }
    </div>);
}

layoutElementsDictionary.registerLayoutElement('separator_line', SeparatorLine);
