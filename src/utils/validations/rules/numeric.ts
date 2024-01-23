import { ModelField } from "@/api/data/modelField";
import validationRules from "../validationRules";

validationRules.register("numeric", (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldName: string,
  t:Function
  )=>{
    const numeric = record[fieldName];

    if (!numeric) {
      return true;
    }
   
    const result = /^[0-9]+$/.test(numeric);
    
    if(result){
      return true;
    }
    
    return t("validation.error.numeric");
})
