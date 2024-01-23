import React, { useCallback, useMemo, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/generic/button/primaryButton";
import { useTranslation } from "react-i18next";
import { ModelField } from "@/api/data/modelField";
import { Model } from "@/api/data/model";
import DisplayField from "../../components/fields/displayField";
import { FieldViewType } from "../../components/fields/fieldViewType";
import {
  validateRecord,
  ValidationResult,
  ValidationRule,
} from "@/utils/validations/validationRules";
import CancelButton from "@/components/generic/button/cancelButton";
import { useLogger } from "@/utils/loggerService";

interface ReferencingProps {
  model: Model;
  fieldsMetadataMap?: Map<string, ModelField>;
}

const Referencing = ({ model, fieldsMetadataMap }: ReferencingProps) => {
  const { t } = useTranslation(["validation", "supplier"]);
  const { logger } = useLogger();

  const [record, setRecord] = useState({});
  const [validations, setValidations] = useState<Map<string, ValidationResult>>(
    new Map<string, ValidationResult>()
  );

  const validationRules = useMemo(() => {
    const validationRules = new Map<string, ValidationRule>();

    fieldsMetadataMap &&
      fieldsMetadataMap.forEach((field, fieldName) => {
        const controls =
          field.controls === undefined || field.controls === ""
            ? []
            : field.controls;
        const rules: string[] = Array.isArray(controls) ? controls : [controls];

        if (field.mandatory) {
          rules.push("mandatory");
        }

        if (rules.length <= 0) {
          return;
        }

        validationRules.set(fieldName, rules);
      });
    return validationRules;
  }, [fieldsMetadataMap]);

  const validate = useCallback(() => {
    const result: any =
      fieldsMetadataMap &&
      validateRecord(record, fieldsMetadataMap, validationRules, t);
    setValidations(result);

    return result;
  }, [record, fieldsMetadataMap, setValidations, t, validationRules]);

  const save = useCallback(async () => {
    const validationResult = validate();

    if (validationResult.size > 0) {
      logger.log("Erreur validation");
      return;
    }
  }, [record, validate]);

  return (
    <div className="p-4 app">
      <div className="bg-[var(--background-color-modal)] px-14 py-5 rounded-[18px] overflow-y-scroll w-full lg:w-1/2 ">
        <Link to="#" className="flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/logos/rotiflexLogo.png`}
            alt="logo"
          />
        </Link>
        <p className="text-right text-[0.8rem] italic text-[var(--color-sec)]">
          {t("labels.required", { ns: "supplier" })}
        </p>
        <div className="items-center">
          {fieldsMetadataMap &&
            Array.from(fieldsMetadataMap.values()).map((field) => {
              return (
                field.editable && (
                  <li key={field.code} className={`flex flex-col py-1`}>
                    <DisplayField
                      fieldMetadata={field}
                      fieldLabel={field.code}
                      viewType={FieldViewType.EDIT}
                      record={record}
                      fetchedRecord={record}
                      fieldName={field.code}
                      fieldsMetadataMap={fieldsMetadataMap}
                      onUpdate={(e: any) => {
                        // setRecord(e);
                        const patched = { ...record, ...e };
                        setRecord(patched);
                      }}
                      componentClassName={"text-left"}
                      validations={validations}
                    />
                    {["multival", "file"].includes(field.type || "") ? (
                      <></>
                    ) : (
                      <hr className=" border border-[var(--separator-border-color)]" />
                    )}
                  </li>
                )
              );
            })}
        </div>
        <span className="flex items-center justify-center space-x-4 ">
          <a>
            <PrimaryButton
              label={t("buttons.sendRequest", { ns: "supplier" })}
              className=" border-[2px]"
              onClick={save}
            />
          </a>
          <CancelButton
            label={t("buttons.cancel", { ns: "supplier" })}
            className=" border-[2px]"
          />
        </span>
        <br />
        <p className="text-[var(--color-princ)] text-center text-[0.7rem] pt-2">
          ©2023 ICD INTERNATIONAL
        </p>
      </div>
    </div>
  );
};

export default Referencing;
