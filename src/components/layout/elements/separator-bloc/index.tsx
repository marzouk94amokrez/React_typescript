import { LayoutElement } from "@/api/data/layoutElement";
import { useMemo } from "react";
import { LayoutElementDisplay } from "../layoutElementDisplay";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";

/**
 * <b>Composant de rendu des dispositions d'affichages 'separator_bloc'</b>
 *
 * @param param0
 */
export function SeparatorBloc({
  model,
  modelFields,
  viewType,
  record,
  fetchedRecord,
  layouts,
  onUpdate,
  validations,
}: LayoutElementProps) {
  const blocElement = useMemo(() => layouts[0] || {}, [layouts]);
  const childElements: LayoutElement[] = useMemo(
    () => blocElement.elements || [],
    [blocElement]
  );
  return (
    <div className="flex flex-col space-y-2 border border-[var(--color-sec)] border-solid rounded-md mb-2 px-6 py-4">
      <span className="text-[var(--title-color)] text-[1.15rem]">
        {blocElement.label}
      </span>
      <div className="flex flex-col flex-auto">
        <LayoutElementDisplay
          model={model}
          modelFields={modelFields}
          viewType={viewType}
          record={record}
          fetchedRecord={fetchedRecord}
          layouts={childElements}
          onUpdate={onUpdate}
          fieldClassName={"text-[var(--color-sec)]"}
          validations={validations}
        />
      </div>
    </div>
  );
}

layoutElementsDictionary.registerLayoutElement("separator_bloc", SeparatorBloc);
