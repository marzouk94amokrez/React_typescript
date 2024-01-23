import {sprintf} from "sprintf-js";
import { ModelField } from "@/api/data/modelField";
import GenericDictionary from "../genericDictionary";

export type ValidationFunction = (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldName: string,
  t:Function,
  ...args: any
) => boolean | string | object

export type ValidationResult = Array<string>;
export type ValidationRule = Array<string | ValidationFunction>;

const validationRules = new GenericDictionary<ValidationFunction>();

export const validateRecord = (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldRulesMap: Map<string, ValidationRule>,
  t?:Function,
): Map<string, ValidationResult> => {
  const result: Map<string, ValidationResult> = new Map<string, ValidationResult>();

  fieldMetadataMap.forEach((field, fieldName) => {
    const fieldValidationResult: Array<string> = validateField(record, fieldMetadataMap, fieldRulesMap, fieldName, t);
  
    if (fieldValidationResult.length > 0) {
      result.set(fieldName, fieldValidationResult)
    }
  })

  return result;
}

export const validateField = (
  record: any,
  fieldMetadataMap: Map<string, ModelField>,
  fieldRulesMap: Map<string, ValidationRule>,
  fieldName: string,
  t?:Function,
): ValidationResult => {
  const validationResults: string[] = [];
  const fieldRules = fieldRulesMap.get(fieldName);
  const translate = t ? t : (key:string)=> key;
 
  if (!fieldRules) {
    return []; 
  }
 

  fieldRules.forEach((rule:any) => {
    // func
    // if (typeof rule !== "string") {
    //   const result = rule(record, fieldMetadataMap, fieldName, translate)

    //   if (result === true) { return; }

    //   validationResults.push(typeof result === "string" ? result : translate('validation.error.function'));
    //   return
    // }

    // string
    const args = rule?.split(':')||[]

    if (args.length <= 0) {
      return
    }

    const ruleName: string = args.shift() || ""
    const ruleFunction = validationRules.get(ruleName);

    if (!ruleFunction) {
      return
    }

    const result = ruleFunction(record, fieldMetadataMap, fieldName, translate, ...args)

    if (result === true) { return; }

    validationResults.push(typeof result === "string" ? result : sprintf(translate(`validation.error.rule`), {rule: ruleName}));
  })
  return validationResults;
}

export default validationRules;
