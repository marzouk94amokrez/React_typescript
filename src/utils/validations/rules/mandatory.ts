import {sprintf} from "sprintf-js";
import { ModelField } from "@/api/data/modelField";
import validationRules from "../validationRules";
import { logger } from "@/utils/loggerService";

validationRules.register("mandatory", (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldName: string,
  t:Function
  )=>{
    if(record[fieldName] ){
      return true;
    }
    //return sprintf(t("validation.error.mandatory"), { field: fieldName });
    return sprintf(t("validation.error.mandatory"));
})
