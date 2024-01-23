import { ModelField } from "@/api/data/modelField";
import validationRules from "../validationRules";

validationRules.register("hexadecimal", (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldName: string,
  t:Function
  )=>{
    const hexadecimal = record[fieldName] || '';
    const result = /[0-9A-Fa-f]{6}/g.test(hexadecimal);
    
    if(result){
      return true;
    }
    
    return t("validation.error.hexadecimal");
})
