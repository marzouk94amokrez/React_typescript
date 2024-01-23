import { ModelField } from "@/api/data/modelField";
import validationRules from "../validationRules";

validationRules.register("phone", (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldName: string,
  t:Function
  )=>{
    const phone = record[fieldName] || '';
    const result = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{5})$/.test(phone);
    
    if(result){
      return true;
    }
    
    return t("validation.error.phone");
})
