import {useMemo} from "react";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";
import DisplayField from "@/components/fields/displayField";
import { Console } from "console";

/**
 * <b>Composant de rendu des dispositions d'affichages 'tabExternal'</b>
 * 
 * @param param0 
 */
export function TabExternal({ model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate, fieldName, validations }: LayoutElementProps) {
  
  const elementLayout = useMemo(() => layouts[0] || {}, [layouts]);
  const fieldsMetadataMap = useMemo(() => {
    const map = new Map(modelFields);
    map.set(elementLayout.field, { ...map.get(elementLayout.field), component: 'table' });
    return map;
  }, [modelFields, elementLayout]);
  const fieldMetadata = useMemo(() => fieldsMetadataMap.get(elementLayout.field),
  [fieldsMetadataMap, elementLayout]);

  return (
    <div>
      <DisplayField
        fieldMetadata={fieldMetadata}
        fieldLabel={fieldMetadata?.field_name}
        model={model}
        fieldName={fieldMetadata?.field_name}
        fieldsMetadataMap={fieldsMetadataMap}
        viewType={viewType}
        record={record}
        fetchedRecord={record}
        onUpdate={onUpdate}
        validations={validations}
      ></DisplayField>
    </div>
  )
}

layoutElementsDictionary.registerLayoutElement('tab_external', TabExternal);
