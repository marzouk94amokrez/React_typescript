import { LayoutElement } from "@/api/data/layoutElement";
import { useMemo } from "react";
import { LayoutElementDisplay } from "../layoutElementDisplay";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";

/**
 * <b>Composant de rendu des dispositions d'affichages `separator_col`</b>
 * 
 * @param param0 
 */
export function SeparatorCol({ model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate, validations }: LayoutElementProps) {
  const blocElement = useMemo(() => layouts[0] || {}, [layouts]);
  const childElements: LayoutElement[] = useMemo(() => blocElement.elements || [], [blocElement]);
   
  let childIndex = 0;
  return(
    <div className="flex flex-col">
      <span>{blocElement.label}</span>
      <div className="flex flex-row flex-auto space-x-12">
        {
          childElements.map((c) =>
            <div
              key={`element_${c.type}_${childIndex++}`}
              className="w-full"
            >
              <LayoutElementDisplay
                model={model}
                modelFields={modelFields}
                viewType={viewType}
                record={record}
                fetchedRecord={fetchedRecord}
                layouts={[c]}
                onUpdate={onUpdate}
                validations={validations}
              
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

layoutElementsDictionary.registerLayoutElement('separator_col', SeparatorCol);
