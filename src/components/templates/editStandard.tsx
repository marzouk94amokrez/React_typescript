import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import copy from "fast-copy";
import equal from "fast-deep-equal";
import toast from "react-hot-toast";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { LayoutElementDisplay } from "@/components/layout/elements/layoutElementDisplay";
import { TemplateProps } from "./templateProps";
import templatesDictionary from "./templatesDictionary";
import {
  validateRecord,
  ValidationResult,
  ValidationRule,
} from "@/utils/validations/validationRules";
import "@/utils/validations/rules";
import { useTranslation } from "react-i18next";
import { ConsultationHeader } from "@/components/header/buttons/consultationHeader";
import ZoneTimeline from "../header/zone-timeline";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useLogger } from "@/utils/loggerService";
import { useAppSelector } from "@/hooks/store";
import {
  useCreateObjectMutation,
  useDeleteObjectByIdMutation,
  useGetObjectByIdQuery,
  useUpdateObjectByIdMutation,
} from "@/store/api";

/**
 * <b>Composant d'affichage d'une vue d'édition standard</b>
 */
export function EditStandard({
  model,
  modelFields,
  modelLayouts : modelLayoutsStart,
  layoutActions,
}: TemplateProps) {
  const { t } = useTranslation();
  const { id } = useParams();
  const { logger } = useLogger();
  const modelLayouts = id?modelLayoutsStart:modelLayoutsStart?.filter((layout) => layout.hiddenIfNew == false);
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const [validations, setValidations] = useState<Map<string, ValidationResult>>(
    new Map<string, ValidationResult>()
  );

  const navigate = useNavigate();
  /**
   * Enregistrement charg� depuis le stockage
   */
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
    return objectData?.data?.records?.at(0) || {};
  }, [objectData]);

  /**
   * Enregistrement � afficher
   */
  const [record, setRecord] = useState<any>({});
  useEffect(() => {
    setRecord(copy(fetchedRecord));
  }, [fetchedRecord]);

  const validationRules = useMemo(() => {
    const validationRules = new Map<string, ValidationRule>();
    modelFields.forEach((field, fieldName) => {
      if (!field.editable || !field.changeable) {
        return;
      }

      const controls =
        field.controls === undefined || field.controls === ""
          ? []
          : field.controls;
      const rules: string[] = Array.isArray(controls) ? controls : [controls];
      if (field.mandatory && !["boolean"].includes(field.type || "")) {
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
    const result = validateRecord(record, modelFields, validationRules, t);
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
    const persistObject = record?.uuid ? updateObject : createObject;

    const { data: result, error }: any = await persistObject({
      objectName: model.endpoint,
      uid: record?.uuid,
      data: record,
      t,
    });
    if (result.status === "success") {
      const updatedRecord = result?.data?.records?.at(0);
      // Redirection après création
      if (updatedRecord && updatedRecord[OBJECTS_ID_FIELD] && !record?.id) {
        const redirectUrl = `/${modelEndpoint}/view/${updatedRecord[OBJECTS_ID_FIELD]}`;
        logger.debug(`Redirection vers ${redirectUrl}`);
        navigate(redirectUrl);
      }
    } else {
      navigate(-1)
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

  /**
   * Mise à jour de l'enregistrement en fonction des champs mis à jour
   */
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

  return (
    <div className="w-full">
      <ConsultationHeader
        model={model}
        modelFields={modelFields}
        layoutActions={layoutActions}
        record={record}
        title={title}
        additionalTitle={additionalTitle}
        subtitles={subtitles}
        additionalSubtitles={additionalSubtitles}
        actionButtonVisible={false}
        backButtonVisible={true}
        editButtonVisible={false}
        onSave={saveRecord}
        onBack={() => navigate(-1)}
        onDelete={deleteRecord}
      />
      <ZoneTimeline />
      {model && modelFields && modelLayouts && (
        <LayoutElementDisplay
          model={model}
          modelFields={modelFields}
          layouts={modelLayouts}
          viewType={FieldViewType.EDIT}
          record={record}
          fetchedRecord={fetchedRecord}
          validations={validations}
          onUpdate={onRecordUpdate}
        />
      )}
    </div>
  );
}

templatesDictionary.registerTemplate("edit_standard", EditStandard);
