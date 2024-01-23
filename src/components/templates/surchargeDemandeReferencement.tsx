import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FieldViewType } from "../../components/fields/fieldViewType";
import {
  validateRecord,
  ValidationResult,
  ValidationRule,
} from "@/utils/validations/validationRules";
import templatesDictionary from "./templatesDictionary";
import copy from "fast-copy";
import { ConsultationHeader } from "@/components/header/buttons/consultationHeader";
import { useNavigate } from "react-router-dom";
import { LayoutElementDisplay } from "@/components/layout/elements/layoutElementDisplay";
import { TemplateProps } from "./templateProps";
import equal from "fast-deep-equal";
import { useLogger } from "@/utils/loggerService";
import {
  useCreateObjectMutation,
  useDeleteObjectByIdMutation,
  useGetObjectByIdQuery,
  useUpdateObjectByIdMutation,
} from "@/store/api";
import { useAppSelector } from "@/hooks/store";
import { toast } from "react-hot-toast";
import { OBJECTS_ID_FIELD } from "@/utils/const";

/**
 * 
 * <b>Composant qui permet d'afficher une formulaire de demande de référencement</b>
 */
export const SurchargeDemandeReferencement = ({
  model,
  modelFields,
  modelLayouts,
}: TemplateProps) => {
  const { t } = useTranslation("validation");
  const navigate = useNavigate();
  const { id } = useParams();
  const { logger } = useLogger();

  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetObjectByIdQuery(
    { objectName: modelEndpoint, id },
    { skip: !modelEndpoint || !id }
  );

  const fetchedRecord = useMemo(() => {
    return objectData?.data?.records?.at(0);
  }, [objectData]);

  const [validations, setValidations] = useState<Map<string, ValidationResult>>(
    new Map<string, ValidationResult>()
  );

  // Liste des propriétés spéciaux avec titre
  const specialFieldsList = useAppSelector(
    (state) =>
      state.objectsDefinitions[model.code]?.specialFields?.map(
        ([prop, fields]) => [prop, fields.map((f) => modelFields.get(f)!)]
      ) || []
  );

  const specialFieldsMap: any = useMemo(
    () => Object.fromEntries(specialFieldsList),
    [specialFieldsList]
  );
  const title = specialFieldsMap?.title?.at(0);
  const additionalTitle = specialFieldsMap?.titlebis;
  const subtitles = specialFieldsMap?.subtitle;
  const additionalSubtitles = specialFieldsMap?.header;

  /**
   * Enregistrement à afficher
   */
  const [record, setRecord] = useState<any>({});
  useEffect(() => {
    setRecord(copy(fetchedRecord));
  }, [fetchedRecord]);

  const modelDetailsURL = useMemo(() => `/${modelEndpoint}/`, [modelEndpoint]);
  const validationRules = useMemo(() => {
    const validationRules = new Map<string, ValidationRule>();

    modelFields &&
      modelFields.forEach((field, fieldName) => {
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
  }, [modelFields]);

  /**
   * Gestion de la sauvegarde
   */
  const validate = useCallback(() => {
    const result: any =
      modelFields && validateRecord(record, modelFields, validationRules, t);
    setValidations(result);

    return result;
  }, [record, modelFields, setValidations, t, validationRules]);

  const [createObject, createObjectResult] = useCreateObjectMutation();
  const [updateObject, updateObjectResult] = useUpdateObjectByIdMutation();
  const saveRecord = useCallback(async () => {
    if (!record) {
      toast.error("Pas d'enregistrement disponible pour la sauvegarde.");
      return;
    }

    const validationResult = validate();

    if (validationResult.size > 0) {
      toast.error(
        `L'enregistrement ne peut être enregistré tant qu'il y a des erreurs au niveau des champs.`
      );
      logger.error("Erreur validation", validationResult);
      return;
    }

    // return await update(modelEndpoint, record);
    const persistObject = record?.id ? updateObject : createObject;

    const { data: result, error }: any = await persistObject({
      objectName: model.endpoint,
      id: record?.id,
      data: record,
      t
    });

    if (result.status === "success") {
      const updatedRecord = result?.data?.records?.at(0);
      // Redirection après création
      if (updatedRecord[OBJECTS_ID_FIELD] && !record?.id) {
        const redirectUrl = `/${modelEndpoint}/view/${updatedRecord[OBJECTS_ID_FIELD]}`;
        logger.debug(`Redirection vers ${redirectUrl}`);
        navigate(redirectUrl);
      }
    } else {
      logger.debug(`Une erreur est survenue lors de la sauvegarde ${error}`);
    }
  }, [
    modelEndpoint,
    record,
    validate,
    createObject,
    navigate,
    logger,
    updateObject,
    model?.endpoint,
  ]);
  const lastPathSelected = useAppSelector(
    (state) => state.appContext.selectedPathInMenu
  );
  const [deleteObject, deleteObjectResult] = useDeleteObjectByIdMutation();
  const deleteRecord = useCallback(async () => {
    const { data: result, error }: any = await deleteObject({
      objectName: modelEndpoint,
      id,
    });

    // TODO : Implémenter un retour sur la liste car un "back" pourrait tout simplement étre une op�ration invalide
    // TODO : gérer les alias d'URL
    navigate(`${lastPathSelected}`);
  }, [id, deleteObject, modelEndpoint, navigate]);

  const onRecordUpdate = useCallback(
    (patch: any) => {
      const patchedRecord: any = copy(record);

      for (const field in patch) {
        patchedRecord[field] = patch[field];
      }

      if (!equal(patchedRecord, record)) {
        setRecord(patchedRecord);
      }
    },
    [record]
  );

  return (
    <div className="w-full">
      <ConsultationHeader
        model={model}
        modelFields={modelFields}
        record={record}
        title={title}
        additionalTitle={additionalTitle}
        subtitles={subtitles}
        additionalSubtitles={additionalSubtitles}
        actionButtonVisible={false}
        backButtonVisible={true}
        editButtonVisible={false}
        onSave={saveRecord}
        onBack={() => navigate(modelDetailsURL, { replace: true })}
        onDelete={deleteRecord}
      />
      <div className="bg-[var(--background-color-modal)] px-14 py-5 rounded-[18px] overflow-y-scroll w-1/2 ">
        <div className="items-center">
          {model && modelLayouts && modelFields && (
            <li className={`flex flex-col py-1`}>
              <LayoutElementDisplay
                viewType={FieldViewType.EDIT}
                record={fetchedRecord}
                fetchedRecord={fetchedRecord}
                modelFields={modelFields}
                onUpdate={onRecordUpdate}
                model={model}
                layouts={modelLayouts}
                validations={validations}
              />
            </li>
          )}
        </div>
      </div>
    </div>
  );
};

templatesDictionary.registerTemplate(
  "surcharge_demande_referencement",
  SurchargeDemandeReferencement
);
