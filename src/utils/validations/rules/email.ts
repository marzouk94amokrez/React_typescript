import { ModelField } from "@/api/data/modelField";
import validationRules from "../validationRules";

validationRules.register("email", (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldName: string,
  t: Function
) => {
  const email = record[fieldName];

  if (!email) {
    return true;
  }
  
  const result = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  if (result) {
    return true;

  }

  return t("validation.error.email");

})
