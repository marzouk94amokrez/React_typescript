import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { FileViewer } from "@/components/generic/file/viewer";
import Select from "react-select";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FileEntry } from "@/components/generic/file/uploader/utils";
import { ModelField } from "@/api/data/modelField";
import { useLogger } from "@/utils/loggerService";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { base64toBlob } from "@/utils/funcs";
import { useAppSelector } from "@/hooks/store";
import { AddDocumentPopup } from "@/components/popups/addDocumentPopup";
import {
  useCreateObjectMutation,
  useDeleteObjectByIdMutation,
  useGetObjectByIdQuery,
  useUpdateObjectByIdMutation,
} from "@/store/api";

/**
 * Test si la liste des éléments est recherchable
 */
const searchableThreshold = 10;

/**
 * <b>Composant d'affichage d'une vue d'édition de document (edit_doc)</b>
 */
export function EditDocument({
  model,
  visuDocWidthIfExist,
  modelFields,
  modelLayouts,
  layoutActions,
}: TemplateProps) {
  const { t } = useTranslation(["validation", model?.code as string]);
  const { id } = useParams();
  const { logger } = useLogger();
  const {idParent} = useParams();
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const [validations, setValidations] = useState<Map<string, ValidationResult>>(
    new Map<string, ValidationResult>()
  );

  const [addDocumentPopupVisible, setAddDocumentPopupVisible] = useState(false);
  const navigate = useNavigate();

  /**
   * Enregistrement chargé depuis le stockage
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
    return objectData?.data?.records?.at(0);
  }, [objectData]);

  /**
   * Enregistrement à afficher
   */
  const [record, setRecord] = useState<any>({});
  useEffect(() => {
    setRecord(copy(fetchedRecord));
  }, [fetchedRecord]);

  const [deleteObject, deleteResult] = useDeleteObjectByIdMutation();
  const deleteRecord = useCallback(async () => {
    const { data: result, error }: any = await deleteObject({
      objectName: modelEndpoint,
      id,
    });

    // TODO : Implémenter un retour sur la liste car un "back" pourrait tout simplement être une opération invalide
    // TODO : gérer les alias d'URL
    navigate(-1);
  }, [id, deleteObject, modelEndpoint, navigate]);

  // validation
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

  const validate = useCallback(() => {
    const result = validateRecord(record, modelFields, validationRules, t);
    setValidations(result);
    return result;
  }, [record, modelFields, setValidations, t, validationRules]);

  // Champ de type multival ou monoval et composant de type file
  // Objet lié (ex Fichiers contenant les propriétés mais aussi le champ file)
  const fileField = useMemo(() => {
    const fieldsArray = Array.from(modelFields.values());

    const fileFields = fieldsArray.filter(
      (field: ModelField) =>
        ["multival"].includes(field.type || "") &&
        ["file"].includes(field.component || "")
    );

    //! Prendre le premier élément
    //! Peut être revoir un système de merge ?
    return fileFields.pop();
  }, [modelFields]);

  // Nom du champ des fichiers
  const fileFieldName = "file";//fileField?.field_name as string;

  // Id de l'objet fichiers
  const fileIdField = fileField?.value_field || OBJECTS_ID_FIELD;

  // Libellé de l'objet fichier
  const fileLabelField = fileField?.title_field || "name";

  // Champs de l'objet lié contenant les fichiers
  const fileObjectFields = useAppSelector(
    (state) => state.objectsDefinitions[fileField?.nature as string]?.fields
  );

  //
  const fileModelFields = useMemo(() => {
    return new Map<string, ModelField>(fileObjectFields);
  }, [fileObjectFields]);

  // Nom du champ contenant le fichier dans l'objet (field type == file)
  const fileModelFileFieldName = useMemo(() => {
    const fileModelFileFields = Array.from(
      fileModelFields?.values() || []
    ).filter((field: ModelField) => ["file"].includes(field.type || ""));

    const fileModelFileField = fileModelFileFields.pop();
    return fileModelFileField?.field_name || "file";
  }, []);

  const [createObject, createObjectResult] = useCreateObjectMutation();
  const [updateObject, updateObjectResult] = useUpdateObjectByIdMutation();

  const saveRecord = useCallback(async () => {
    if (!record) {
      toast.error("error_message.no_recording_available");
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

    //Prepare files for update
    const corr: Map<string, string> = new Map([["JPEG", "jpeg"]]);
    const files = record ? record[fileFieldName] || [] : [];

    const filesRecord: any = Array.isArray(files)&&files?.map((f: any) => {
      const file: FileEntry = {
        id: f[fileIdField],
        name: f[fileLabelField],
        type: corr.has(f.ext) ? corr.get(f.ext) : f.ext,
        size: Number.parseInt(f.size),
        lastModified: 0,
        content: f[fileModelFileFieldName],
      };
      return file;
    });

    let updatedFiles: Array<{
      description?: string;
      file?: {};
      [propName: string]: any;
    }> = [];

    filesRecord?.forEach((fileInfo: FileEntry) => {
      const file = fileInfo.id
        ? {
            [fileIdField]: fileInfo.id,
          }
        : {
            [fileLabelField]: fileInfo.name,
            description: "",
            [fileModelFileFieldName]: {
              name: fileInfo.name,
              content: fileInfo.content.substring(
                fileInfo.content.indexOf(",") + 1
              ),
            },
          };
      updatedFiles.push(file);
    });
    let updatedRecord: any = copy(record);
    updatedRecord[fileFieldName] = updatedFiles;
    // return false;
    // return await update(modelEndpoint, record);
    const persistObject = record?.uuid ? updateObject : createObject;

    const { data: result, error }: any = await persistObject({
      objectName: model.endpoint,
      uid: record?.uuid ? updatedRecord?.uuid: idParent,
      data: updatedRecord,
      t,
    });

    if (result?.status === "success" && record?.uuid) {
      const updatedRecord = result?.data?.records?.at(0);
      // Redirection après création
      if (updatedRecord[OBJECTS_ID_FIELD] && !record?.id) {
        const redirectUrl = `/${modelEndpoint}/view/${updatedRecord[OBJECTS_ID_FIELD]}`;
        logger.debug(`Redirection vers ${redirectUrl}`);
        navigate(redirectUrl);
      }
    } else {
      if (result?.status === "success") {
        navigate(-2);
      }
      else
      logger.debug(`Une erreur est survenue lors de la sauvegarde ${error}`);
    }
  }, [
    fileFieldName,
    fileIdField,
    fileLabelField,
    fileModelFileFieldName,
    modelEndpoint,
    record,
    logger,
    validate,
    createObject,
    updateObject,
    model?.endpoint,
    navigate,
  ]);

  /**
   * Mise à jour de l'enregistrement en fonction des champs mis à jour
   */
  const onRecordUpdate = useCallback(
    (patch: any) => {
      const patchedRecord: any = {...record};

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

  // Workflow
  const workflowField = specialFieldsMap?.status?.at(0);
  // const workflow = useMemo(
  //   () => (record ? record[workflowField?.field_name] || {} : {}),
  //   [record, workflowField?.field_name]
  // );
  const workflow = useMemo(
    () => (record?.status),
    [record, workflowField?.field_name]
  );

//f["file"].split(":")[0]=="blob"?f["file"]:
  const [documents, setDocuments] = useState<FileEntry[]>([]);
  useEffect(() => {
    const files = record ? record[fileFieldName] || [] : [];
    let elementExisteInRecord:any[]= documents?.map((d: any) => {
        return files.filter((f: any) => f.id == d.id)?.length>0?  d:null;   
        });
    if(elementExisteInRecord?.length!=files?.length){
          const corr: Map<string, string> = new Map([["JPEG", "jpeg"]]);
          const recordedFiles: FileEntry[]  = Array.isArray(files)? files.map((f: any) => {
            const file: FileEntry = {
              // id: f[fileIdField],
              // name: f[fileLabelField],
              // type: corr.has(f.ext) ? corr.get(f.ext) : f.ext,
              // size: Number.parseInt(f.size),
              // lastModified: 0,
              // content: f[fileModelFileFieldName],
              id: f["id"],
              //uuid: f["uuid"],
              name: f["name"],
              type: "pdf",
              size: Number.parseInt(f.size),
              lastModified: 0,
              content:f.hasOwnProperty("id")?URL.createObjectURL(base64toBlob(f["file"].content)):f["file"].split(":")[0]=="blob"?f["file"]:URL.createObjectURL(base64toBlob(f["file"].split(",")[1]))
              //f["file"].content.split(":")[0]=="blob"?f["file"]:URL.createObjectURL(base64toBlob(f["file"].content.split(",")[1])),
            };
            return file;
          })
          :
          [];
            setDocuments(recordedFiles||[]);
        }
      
  }, [
    record,
    fileFieldName,
    fileIdField,
    fileLabelField,
    fileModelFileFieldName,
  ]);

  /**
   * Nombre de documents
   */
  const documentsCount = useMemo(() => documents.length, [documents]);

  /**
   * Liste des documents
   */
  const documentOptions = useMemo(() => {
      const docs: any = [];
      documents.forEach((entry) => {
        docs.push({
          value: entry,
          label: entry.name,
        });
      });
      return docs;
  }, [documents]);

  /**
   * Styles du select
   */
  const customStyles = {
    container: (base: any) => ({
      ...base,
      width: "100%",
    }),

    control: (base: any, state: any) => ({
      ...base,
      background: "transparent",
      boxShadow: state.isFocused ? null : null,
      border: "none",
      cursor: "pointer",
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      color: "var(--color-sec)",
    }),

    indicatorSeparator: (base: any) => ({
      ...base,
      display: "none",
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      minHeight: 20,
      paddingTop: 0,
      background: "transparent",
      paddingLeft: 0,
    }),

    singleValue: (provided: any) => ({
      ...provided,
      color: "var(--color-sec)",
    }),

    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "var(--color-sec)",
      };
    },

    option: (provided: any, state: any) => ({
      ...provided,
      background: "transparent",
      color: "var(--color-sec)",
      cursor: "pointer",
      paddingBottom: "1px",
    }),

    menu: (base: any) => ({
      ...base,
      border: "2px solid var(--fields-border-color)",
      padding: "0",
      borderRadius: "4px",
      display: "flex",
      minWidth: "100%",
    }),
  };

  /**
   * Gestion du fichier sélectionné dans le selecteur
   */
  const [selectedFile, setSelectedFile] = useState<any>({});
  useEffect(() => {
    setTimeout(() => {
      setSelectedFile(documentOptions[0]);
    }, 100);
  }, [documentOptions]);

  const refreshDocumentsList = (documents: any) => {
    // updateRecordedFilesList(documents);
    // setDocuments(documents);
    
    const documentIds = documents
      ?.map((d: any) => d.id || "")
      .filter((d: any) => d);
      
    // const existingFiles = record && record[fileFieldName]?.filter(
    //   (f: any) => f.id && documentIds.includes(f.id)
    // )||[];
    const existingFiles = record && record[fileFieldName]?.filter(
      (f: any) => f.id 
    )||[];
   
    // console.log(existingFiles)
    const newDocuments = documents
      ?.filter((d: any) => d && !d.id)
      .map((d: any) => {
        const record = {
          [fileIdField]: "",
          [fileLabelField]: d.name,
          ext: d.type,
          size: d.size,
          // Base 64
          file: d.content,
          __new: true,
        };
        return record;
      });

    onRecordUpdate({
      [fileFieldName]: [...existingFiles, ...newDocuments],
    });

     logger.debug(">>>> NEW DOCS", documentIds, existingFiles, newDocuments);
     logger.debug("RECORD ", record&&record[fileFieldName], documents);
  };

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
      <ZoneTimeline workflow={workflow} />
      <div className="flex flex-row space-x-2">
        <div
          className="flex flex-col space-y-2 border border-[var(--color-sec)] border-solid rounded-md mb-2 px-6"
          style={{ minWidth: visuDocWidthIfExist?`${visuDocWidthIfExist}%`: "60%" }}
        >
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center w-full text-sm text-[var(--color-sec)] after:content-['\ '] after:w-full px-2 after:h-[2px] after:bg-[var(--fields-background)] after:inline-block">
              {documentsCount > 1 ? (
                <Select
                  placeholder={""}
                  styles={customStyles}
                  options={documentOptions}
                  onChange={(option) => setSelectedFile(option)}
                  value={selectedFile ? selectedFile : ""}
                  isSearchable={documentsCount > searchableThreshold}
                />
              ) : (
                <span className="inline-block w-full py-2 ml-1 text-left">
                  {selectedFile && selectedFile.value
                    ? selectedFile.value.name
                    : ""}
                </span>
              )}
            </div>
            <button onClick={() => setAddDocumentPopupVisible(true)}>
              <FontAwesomeIcon
                icon={faFile}
                className={`text-[color:var(--color-princ)] hover:text-[color:var(--color-sec)]`}
              />
            </button>
          </div>
          <div className="flex-auto max-h-[600px]">
            {selectedFile && selectedFile.value && ( 
              <FileViewer
                key={selectedFile.value.id}
                file={selectedFile.value}
              />
            )}
          </div>
        </div>
        <div className="flex-auto">
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
      </div>
      <AddDocumentPopup
        record={record}
        documents={documents}
        model={model}
        modelFields={modelFields}
        modelLayouts={modelLayouts}
        opened={addDocumentPopupVisible}
        onClose={() => setAddDocumentPopupVisible(false)}
        onConfirm={refreshDocumentsList}
      />
    </div>
  );
}

templatesDictionary.registerTemplate("edit_doc", EditDocument);
