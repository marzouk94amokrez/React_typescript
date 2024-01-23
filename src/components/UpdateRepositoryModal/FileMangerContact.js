import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./FileManagerModal.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import copy from "fast-copy";
import equal from "fast-deep-equal";
import toast from "react-hot-toast";
import { replaceVariables } from "@/utils/funcs";
import { useTranslation } from "react-i18next";

// import { getStatusWithKey } from '@/shared/utility';
import {
  PrimaryBtnOutlineAction,
  SecondaryBtnOutlineAction,
  CancelBtnOutlineAction,
  FormGroup,
  FormLabel,
} from "../../styles/Common";
import {
    useCreateObjectMutation,
    useDeleteObjectByIdMutation,
    useGetObjectByIdQuery,
    useUpdateObjectByIdMutation,
  } from "@/store/api";
import { ModalPopup } from "@/components/generic/modal";
import { LayoutElementDisplay } from "@/components/layout/elements/layoutElementDisplay";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import {
  validateRecord,
  ValidationResult,
  ValidationRule,
} from "@/utils/validations/validationRules";

function FileMangerContact(props) {
  const { show, modalClosed,model,viewType,modelFields,id ,title} = props;
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const [createObject, createObjectResult] = useCreateObjectMutation();
  const [updateObject, updateObjectResult] = useUpdateObjectByIdMutation();
  const [validations, setValidations] = useState(new Map());
  const navigate = useNavigate();
  const { t } = useTranslation();
 const { id:idParam } = useParams();

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
  const layouts = useMemo(() => {
    const screenEntry = model?.screens[viewType|| ''] || {};
    return screenEntry?.elements || [];
  }, [model]);

  const fetchedRecord = useMemo(() => {
    return objectData?.data?.records?.at(0) || {};
  }, [objectData]);

  /**
   * Enregistrement � afficher
   */
  const [record, setRecord] = useState({});
  useEffect(() => {
    setRecord(fetchedRecord);
  }, [fetchedRecord]);

  const validationRules = useMemo(() => {
    const validationRules = new Map();

    modelFields.forEach((field, fieldName) => {
      if (!field.editable || !field.changeable) {
        return;
      }

      const controls =
        field.controls === undefined || field.controls === ""
          ? []
          : field.controls;
      const rules = Array.isArray(controls) ? controls : [controls];

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
  const validate = useCallback(() => {
    const result = validateRecord(record, modelFields, validationRules, t);
    setValidations(result);
    return result;
  }, [record, modelFields, setValidations, t, validationRules]);
 
  const saveRecord = useCallback(async () => {
    if (!record) {
      return;
    }
    const validationResult = validate();
    if (validationResult.size > 0) {
      toast.error(t("error_message.validation"));
 
    //  logger.error("Erreur validation", validationResult);
      return;
    }
    const persistObject = record?.uuid ? updateObject : createObject;
    const { data: result, error } = await persistObject({
      objectName: model.endpoint,
      uid: record?.uuid ||idParam,
      data: record,
      t,
    });
      if (result) {
        if (result?.status === "success") {
          modalClosed()
          const updatedRecord = result?.data?.records?.at(0);
          // Redirection après création
          if (updatedRecord[OBJECTS_ID_FIELD] && !record?.id) {
            navigate(-1);
          }
        }
      } else {
        toast.error(t("toast.error.server.modal"));
      }
  }, [
    modelEndpoint,
    record,
    createObject,
    navigate,
    updateObject,
    model?.endpoint,
  ]);  
  const onRecordUpdate = useCallback(
    (patch) => {
      const patchedRecord = {...record};

      for (const field in patch) {
        patchedRecord[field] = patch[field];
      }

      if (!equal(patchedRecord, record)) {
        setRecord(patchedRecord);
      }
    },
    [record]
  );
  const [deleteObject, deleteResult] = useDeleteObjectByIdMutation();
  const deleteRecord = useCallback(async () => {
    const { data: result, error } = await deleteObject({
      objectName: modelEndpoint,
      id:record?.uuid,
    });

    // TODO : Implémenter un retour sur la liste car un "back" pourrait tout simplement être une opération invalide
    modalClosed()
  }, [id, modelEndpoint,record?.uuid, navigate, deleteObject]);

  return (
    <div style={{ width: "100%" }}>
     
      <ModalPopup openModal={show} handleClose={modalClosed} modalTitle={title} className="Repository">
     
        <div style={{ borderBottom: "3px solid #D9E1E7" }} className="ADMCreationModal__body">
      
        <LayoutElementDisplay
              model={model}
              modelFields={modelFields}
              layouts={layouts}
              viewType={viewType}
              record={record}
              fetchedRecord={record}
              validations={validations}
              onUpdate={onRecordUpdate}
            />
          
        </div>
       
        <div style={{ display:"flex",justifyContent: "center",    marginTop: "10px" }}>
          <PrimaryBtnOutlineAction
            variant="primary"
            onClick={saveRecord}
            // disabled={statusValue === "LITIGATION" && !comment}
          >
            Confirmer
          </PrimaryBtnOutlineAction>
          {record.uuid && (
            
          <PrimaryBtnOutlineAction
            variant="primary"
            onClick={deleteRecord}
            // disabled={statusValue === "LITIGATION" && !comment}
          >
            Supprimer
          </PrimaryBtnOutlineAction>
          )}
          <CancelBtnOutlineAction variant="secondary" onClick={modalClosed}>
            Annuler
          </CancelBtnOutlineAction>
        </div>
      </ModalPopup>
    </div>
  );
}

export default FileMangerContact;
