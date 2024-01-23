import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { FileViewer } from "@/components/generic/file/viewer";
import Select from "react-select";
import copy from "fast-copy";
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
import {
  faCheck,
  faCirclePlus,
  faSquare,
  faSquareCheck,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FileEntry } from "@/components/generic/file/uploader/utils";
import { ModelField } from "@/api/data/modelField";
import DisplayField from "@/components/fields/displayField";
import { ToggleSwitch } from "../generic/toggle-switch";
import { useLogger } from "@/utils/loggerService";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useAppSelector } from "@/hooks/store";
import {
  useCreateObjectMutation,
  useDeleteObjectByIdMutation,
  useGetObjectByIdQuery,
  useUpdateObjectByIdMutation,
} from "@/store/api";
import equal from "fast-deep-equal";

/**
 * Test si la liste des éléments est recherchable
 */
const searchableThreshold = 10;

/**
 * Propriétés de la fenêtre modale d'ajout de documents
 */
interface AddDocumentPopupProps extends TemplateProps {
  /** Enregistrement principal associé au modal */
  record?: any;
  /** Flag indiquant si le modal est ouvert */
  opened: boolean;
  /** Gestionnaire de fermeture du modal */
  onClose?: Function;
  /**
   * Vérifier si on peut ajouter de document(s) dans le composant
   */
  canAddDocuments?: boolean;
}

/**
 * <b>Composant de surcharge pour la saisie et réconciliation de facture</b>
 */
export function SurchargeSaisieReconciliationFacture({
  model,
  modelFields,
  modelLayouts,
  layoutActions,
  actionBtn,
}: AddDocumentPopupProps) {
  const { t } = useTranslation("validation");
  const { id } = useParams();
  const { logger } = useLogger();

  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const [validations, setValidations] = useState<Map<string, ValidationResult>>(
    new Map<string, ValidationResult>()
  );
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

  const modelDetailsURL = useMemo(() => `/${modelEndpoint}/`, [modelEndpoint]);

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

  /**setDocuments
   * Fields de type file
   */
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
  const fileFieldName = fileField?.field_name as string;

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

    //Prepare files for update
    const corr: Map<string, string> = new Map([["JPEG", "jpeg"]]);
    const files = record ? record[fileFieldName] || [] : [];

    const filesRecord: any = files.map((f: any) => {
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

    filesRecord.forEach((fileInfo: FileEntry) => {
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

    // return await update(modelEndpoint, record);
    const persistObject = record?.id ? updateObject : createObject;

    const { data: result, error }: any = await persistObject({
      objectName: model.endpoint,
      id: updatedRecord?.id,
      data: updatedRecord,
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
      logger.debug(`Une erreur est survenur lors de la sauvegarde ${error}`);
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

  // Workflow
  const workflowField = specialFieldsMap?.status?.at(0);
  const workflow = useMemo(
    () => (record ? record[workflowField?.field_name] || {} : {}),
    [record, workflowField?.field_name]
  );

  const [documents, setDocuments] = useState<FileEntry[]>([]);
  useEffect(() => {
    const files = record ? record[fileFieldName as keyof {}] || [] : [];

    // init documents list from record if already exist
    const corr: Map<string, string> = new Map([["JPEG", "jpeg"]]);

    const recordedFiles: any = files.map((f: any) => {
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
    setDocuments(recordedFiles);
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

  /*const deleteLigne = useCallback((event) => {
    //Supprime element selectionnéé (un object ou tableau)
    alert(`Supprime ligne(s) selectée(s) `);
  }, []);*/

  const deleteLigne = (event: any) => {
    //Supprime element selectionnéé (un object ou tableau)
    alert(`Supprime ligne(s) selectée(s) ${event.target.value}`);
  };

  const [fieldsInAreaLine, setFieldsInAreaLine] = useState<
    ModelField[] | undefined
  >(undefined);
  /**
   * Load model and fields display in table
   * Relation pour avoir les données à afficher dans la zone de commande
   */
  const loadModelAndFields = useCallback(async () => {
    const fieldsInAreaLine = Array.from(modelFields.values()).filter(
      (field: ModelField) => field.inexternallist === true
    );
    setFieldsInAreaLine(fieldsInAreaLine);

    //set records dans relation
  }, [modelFields]);

  // update model & components
  useEffect(() => {
    loadModelAndFields();
  }, [loadModelAndFields]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]); // List of selected records
  const [unselectedIds, setUnselectedIds] = useState<string[]>([]); // List of unselected Ids
  const [allSelected, selectAll] = useState(false);

  /**
   * Select record
   */
  const selectRecord = useCallback(
    (code: string) => {
      if (allSelected) {
        // Remove from unselected
        setUnselectedIds(unselectedIds.filter((id) => id !== code));
      }

      // Add into selected records
      setSelectedIds([...selectedIds, code]);
    },
    [allSelected, selectedIds, unselectedIds]
  );

  /**
   * Unselect records
   */
  const unselectRecord = useCallback(
    (code: string) => {
      if (allSelected) {
        // Remove from selected
        setSelectedIds(selectedIds.filter((id) => id !== code));
      }

      // Add into unselected records
      setUnselectedIds([...unselectedIds, code]);
    },
    [allSelected, selectedIds, unselectedIds]
  );
  /**
   * Toggle Item selection
   */
  const toggleRecordSelection = useCallback(
    (code: string, v: boolean) => {
      if (v) {
        return selectRecord(code);
      }

      return unselectRecord(code);
    },
    [selectRecord, unselectRecord]
  );

  /**
   * List selection handler
   */
  const toggleSelectAll = useCallback((v: boolean) => {
    selectAll(v);
    setSelectedIds([]);
    setUnselectedIds([]);
  }, []);

  const addOrderLine = () => {
    //Open modal d'ajout ligne de commande
  };

  let counter = 0;
  const [openAddLink, setOpenAddLink] = useState(false);
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
        actionButtonVisible={true}
        backButtonVisible={true}
        editButtonVisible={false}
        deleteButtonVisible={false}
        onSave={saveRecord}
        onAction={actionBtn}
        onBack={() => navigate(modelDetailsURL, { replace: true })}
      />
      <ZoneTimeline workflow={workflow} />
      <div className="flex flex-col">
        <div
          className="flex flex-col space-y-2 border border-[var(--color-sec)] border-solid rounded-md mb-2 px-6"
          style={{ width: "100%", height: "200px", overflow: "scroll" }}
        >
          <div className="flex flex-row space-x-2">
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
                <span className="inline-block w-full py-2 ml-1 text-left"></span>
              )}
            </div>
          </div>
          <div className="flex-auto">
            {selectedFile && selectedFile.value && (
              <FileViewer
                key={selectedFile.value.id}
                file={selectedFile.value}
              />
            )}
          </div>
        </div>
        <div className="flex-auto">
          {model && modelFields && modelLayouts && layoutActions && (
            <LayoutElementDisplay
              model={model}
              modelFields={modelFields}
              layouts={modelLayouts}
              viewType={FieldViewType.CONSULT}
              record={record}
              fetchedRecord={fetchedRecord}
            />
          )}
        </div>

        <div className="mb-2 px-6 border border-[var(--color-sec)] border-solid rounded-md">
          <div className="flex flex-row items-center space-x-1">
            <span className="">
              <ToggleSwitch
                status={
                  allSelected && unselectedIds && unselectedIds.length === 0
                }
                iconActive={faCheck}
                iconInactive={faCheck}
                iconActiveClassName="text-[color:var(--toggle-alt-active-color)]"
                onToggle={toggleSelectAll}
              />
            </span>
            <span
              onClick={() => {
                setOpenAddLink(!openAddLink);
              }}
              className="text-[color:var(--color-sec)] cursor-pointer"
            >
              <FontAwesomeIcon icon={faCirclePlus} />
            </span>
            <span
              className="pl-2 text-red-500 cursor-pointer"
              onClick={deleteLigne}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </span>
          </div>

          <div className="relative bottom-[10px] right-3">
            <div
              className={`${openAddLink
                  ? "flex absolute left-[2.25rem] flex-col border border-solid border-[var(--bleu-icd)] rounded-[18px] text-sm text-[var(--bleu-icd)] p-2 pl-4 bg-white w-80"
                  : "hidden"
                }`}
            >
              <span className="cursor-pointer" onClick={() => addOrderLine()}>
                Ajouter des lignes de commande
              </span>
              <span
                className="cursor-pointer"
                onClick={() => alert("Ajout ligne additionnelle sur la table")}
              >
                Ajouter une ligne additionnelle
              </span>
            </div>
            <div className="">
              <table className="w-full my-2">
                <thead>
                  <tr>
                    <th key={"check"} className="">
                      <span></span>
                    </th>
                    <th className="px-2 border-2">
                      <span>#</span>
                    </th>
                    {fieldsInAreaLine &&
                      fieldsInAreaLine.map((field) => {
                        return (
                          <th key={field.field_name} className="border-2">
                            {field.field_name}
                          </th>
                        );
                      })}
                  </tr>
                </thead>
                <tbody>
                  {fieldsInAreaLine &&
                    fieldsInAreaLine?.map((f) => {
                      counter++;
                      return (
                        <tr key={`${counter}`}>
                          <td className="p-0">
                            <span className="flex items-center justify-center">
                              <ToggleSwitch
                                status={
                                  (allSelected ||
                                    selectedIds.includes(
                                      f?.field_name || ""
                                    )) &&
                                  !unselectedIds.includes(f?.field_name || "")
                                }
                                iconActive={faSquareCheck}
                                iconInactive={faSquare}
                                iconActiveClassName="text-[color:var(--toggle-alt-active-color)]"
                                iconInactiveClassName="text-white border border-[color:var(--gris)]"
                                onToggle={(v) =>
                                  toggleRecordSelection(f?.field_name || "", v)
                                }
                              />
                            </span>
                          </td>
                          <td className="border-2">
                            <span className="flex items-center justify-center w-full h-full">
                              {counter}
                            </span>
                          </td>

                          {fieldsInAreaLine &&
                            fieldsInAreaLine?.map((field: ModelField) => {
                              return (
                                <td
                                  key={`_${field.field_name}`}
                                  className="border-2"
                                >
                                  <DisplayField
                                    model={model}
                                    fieldMetadata={field}
                                    fieldsMetadataMap={modelFields}
                                    fieldName={field.field_name}
                                    className={"overflow-x-auto"}
                                    record={record}
                                    fetchedRecord={fetchedRecord}
                                    viewType={FieldViewType.CONSULT}
                                    validations={validations}
                                  />
                                </td>
                              );
                            })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

templatesDictionary.registerTemplate(
  "surcharge_saisie_reconciliation_facture",
  SurchargeSaisieReconciliationFacture
);
