import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FileViewer } from "@/components/generic/file/viewer";
import Select from "react-select";
import { LayoutElementDisplay } from "@/components/layout/elements/layoutElementDisplay";
import templatesDictionary from "./templatesDictionary";
import { TemplateProps } from "./templateProps";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { useNavigate, useParams } from "react-router";
import { ConsultationHeader } from "@/components/header/buttons/consultationHeader";
import ZoneTimeline from "../header/zone-timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/pro-solid-svg-icons";
import { ModelField } from "@/api/data/modelField";
import { FileEntry } from "@/components/generic/file/uploader/utils";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { base64toBlob } from "@/utils/funcs";
import { useGetObjectByIdQuery } from "@/store/api";
import { useAppSelector } from "@/hooks/store";

/**
 * Test si la liste des éléments est recherchable
 */
const searchableThreshold = 10;

export interface ConsultDocumentProps extends TemplateProps {
  /**
   * Bouton qui liste les actions qu'on peut effectuer
   */
  actionBtn?: any;
  /**
   * Composant enfant
   */
  children?: any;
  /**
   * Vérifier si on peut ajouter de document(s) dans le composant
   */
  canAddDocuments?: boolean;
}

/**
 * <b>Composant d'affichage d'une vue de consultation d'un document (consult_doc)</b>
 */
export function ConsultDocument({
  model,
  modelFields,
  modelLayouts,
  layoutActions,
  visuDocWidthIfExist,
  actionBtn,
  listCompletedStatus,
  listInProgressStatus,
  listUpcomingStatus,
  canAddDocuments = false,
  saveButtonVisible = false,
  editButtonVisible = true,
  deleteButtonVisible = true,
  record: defaultRecord,
  children,
}: ConsultDocumentProps) {
  // eslint-disable-next-line
  const { t } = useTranslation(["common", "invoice"]);

  const { id } = useParams();
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const navigate = useNavigate();

  /**
   * Enregistrement à afficher
   */
  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetObjectByIdQuery(
    { objectName: modelEndpoint, id },
    { skip: id == null || id === undefined, refetchOnMountOrArgChange: true, }
  );

  const record = useMemo(() => {
    return objectData?.data?.records?.at(0);
  }, [objectData]);

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
  const fileFieldName = "file";// fileField?.field_name as string;

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

  const [documents, setDocuments] = useState<FileEntry[]>([]);
  useEffect(() => {
    const files = record ? record[fileFieldName] || [] : [];
   
    // init documents list from record if already exist
    const corr: Map<string, string> = new Map([["JPEG", "jpeg"]]);
    const recordedFiles: any = Array.isArray(files)&&files?.map((f: any) => {
   
    
      const file: FileEntry = {
        // id: f[fileIdField],
        // name: f[fileLabelField],
        // type: corr.has(f.ext) ? corr.get(f.ext) : f.ext,
        // size: Number.parseInt(f.size),
        // lastModified: 0,
        // content: f[fileModelFileFieldName],
        id: f["uuid"],
        name: f["name"],
        type: "pdf",
        size: Number.parseInt(f.size),
        lastModified: 0,
        content: URL.createObjectURL(base64toBlob(f["file"].content)),
      };
      return file;
    });
    setDocuments(recordedFiles||[]);
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

    documents?.forEach((entry) => {
      docs.push({
        value: entry,
        label: entry.name,
      });
    });

    return docs;
  }, [documents]);

  /**
   * Gestion du fichier sélectionné dans le selecteur
   */
  const [selectedFile, setSelectedFile] = useState<any>({});
  useEffect(() => {
    setTimeout(() => {
      setSelectedFile(documentOptions[0]);
    }, 100);
  }, [documentOptions]);

  return (
    <div className="w-full">
      {model && modelFields && modelLayouts && (
        <>
          <ConsultationHeader
            model={model}
            modelFields={modelFields}
            layoutActions={layoutActions}
            record={record}
            title={title}
            additionalTitle={additionalTitle}
            subtitles={subtitles}
            additionalSubtitles={additionalSubtitles}
            saveButtonVisible={saveButtonVisible}
            editButtonVisible={editButtonVisible}
            deleteButtonVisible={deleteButtonVisible}
            onEdit={() =>
              navigate(`/${model.endpoint}/edit/${record[OBJECTS_ID_FIELD]}`)
            }
            onBack={() => navigate(-1)}
            onAction={actionBtn}
          />
          <ZoneTimeline
            listCompletedStatus={listCompletedStatus}
            listInProgressStatus={listInProgressStatus}
            listUpcomingStatus={listUpcomingStatus}
            workflow={workflow}
          />
          <div className="flex flex-row space-x-2">
            <div
              className="flex flex-col space-y-2 border border-[var(--color-sec)] border-solid rounded-md mb-2 px-6"
              style={{ minWidth: `${visuDocWidthIfExist?visuDocWidthIfExist:60}%` }}
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
                {canAddDocuments && (
                  <button>
                    <FontAwesomeIcon
                      icon={faFile}
                      className={`text-[color:var(--color-princ)] hover:text-[color:var(--color-sec)]`}
                    />
                  </button>
                )}
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
              <LayoutElementDisplay
                model={model}
                modelFields={modelFields}
                layouts={modelLayouts}
                viewType={FieldViewType.CONSULT}
                record={record}
                fetchedRecord={record}
              />
            </div>
          </div>
        </>
      )}
      {children}
    </div>
  );
}

templatesDictionary.registerTemplate("consult_doc", ConsultDocument);
