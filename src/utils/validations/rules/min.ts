import { ModelField } from "@/api/data/modelField";
import validationRules from "../validationRules";
import {sprintf} from "sprintf-js";

validationRules.register("min", (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldName: string,
  t: Function,
  ...args
) => {

  const length = args[0] || undefined
  const value = record[fieldName] || '';
  const fieldLabel = fieldName;
  const fieldMetadata = fieldMetadataMap.get(fieldName);

  if (!fieldMetadata || !length || value.length >= length) {
    return true
  }

  if (['integer', 'decimal'].includes(fieldMetadata.type || '')) {
    if (length > parseFloat(value)) {
      return sprintf(t("validation.error.min"), { field: fieldLabel, value: length })
    }
  } else if (length > value.length) {
    return sprintf(t("validation.error.minlength"), { field: fieldLabel, value: length })
  }

  return true;
})
