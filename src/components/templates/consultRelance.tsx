import { useEffect, useMemo, useState ,useCallback} from "react";
import { useTranslation } from "react-i18next";
import { LayoutElementDisplay } from "@/components/layout/elements/layoutElementDisplay";
import templatesDictionary from "./templatesDictionary";
import { TemplateProps } from "./templateProps";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { useNavigate, useParams } from "react-router";
import { ConsultationHeader } from "@/components/header/buttons/consultationHeader";
import { ModelField } from "@/api/data/modelField";
import { FileEntry } from "@/components/generic/file/uploader/utils";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import RecouvermentView from "@/components/layout/elements/recouverment/RecouvermentView";
import { useGetObjectByIdQuery } from "@/store/api";
import { useAppSelector } from "@/hooks/store";
import equal from "fast-deep-equal";
import copy from "fast-copy";
/**
 * Test si la liste des éléments est recherchable
 */
const searchableThreshold = 10;

export interface ConsultRelanceProps extends TemplateProps {
  actionBtn?: any;
  children?: any;
  canAddDocuments?: boolean;
}

/**
 * <b>Composant d'affichage d'une vue de consultation d'un document</b>
 */
export function ConsultRelance({
  model,
  modelFields,
  modelLayouts,
  layoutActions,
  actionBtn,
  listCompletedStatus,
  listInProgressStatus,
  listUpcomingStatus,
  canAddDocuments = false,
  saveButtonVisible = false,
  editButtonVisible = false,
  deleteButtonVisible = false,
  record: defaultRecord,
  children,
}: ConsultRelanceProps) {
  // eslint-disable-next-line
  const { t } = useTranslation(["common", model?.code]);
  const { id } = useParams();
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);
  const navigate = useNavigate();

  const [isNew, setIsNew] = useState<boolean>(false);

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetObjectByIdQuery(
    { objectName: modelEndpoint, id },
    { skip: id == null || id === undefined }
  );

  const fetchedRecord = useMemo(() => {
    return objectData?.data?.records?.at(0);
  }, [objectData]);
  const [record, setRecord] = useState<any>({});
  useEffect(() => {
    setRecord(copy(fetchedRecord));
  }, [fetchedRecord]);

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

  // Champ de type multival ou monoval et composant de type file
  // Objet lié (ex Fichiers contenant les propriétés mais aussi le champ file)
  

  // Nom du champ des fichiers
  const fileFieldName = "file";

  // Id de l'objet fichiers
  const fileIdField =  OBJECTS_ID_FIELD;

  // Libellé de l'objet fichier
  const fileLabelField =  "name";


  const [documents, setDocuments] = useState<FileEntry[]>([]);

  useEffect(() => {
    const files = record ? record[fileFieldName] || [] : [];
    // init documents list from record if already exist
    const corr: Map<string, string> = new Map([["JPEG", "jpeg"]]);
    const recordedFiles: any = files.map((f: any) => {
      const file: FileEntry = {
        id: f[fileIdField],
        name: f[fileLabelField],
        type: corr.has(f.ext) ? corr.get(f.ext) : f.ext,
        size: Number.parseInt(f.size),
        lastModified: 0,
        content: f[fileFieldName],
      };
      return file;
    });
    setDocuments(recordedFiles);
  }, [
    record,
    fileFieldName,
    fileIdField,
    fileLabelField,
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
   * Gestion du fichier sélectionné dans le selecteur
   */
  const [selectedFile, setSelectedFile] = useState<any>({});
  useEffect(() => {

      setSelectedFile(documentOptions[0]);
  
  }, [documentOptions]);



  const refreshDocumentsList = (documents: any) => {
    // updateRecordedFilesList(documents);
    // setDocuments(documents);
    console.log(documents)
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

  };
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
          />
          {/* <ZoneTimeline
            listCompletedStatus={listCompletedStatus}
            listInProgressStatus={listInProgressStatus}
            listUpcomingStatus={listUpcomingStatus}
            workflow={workflow}
          /> */}
          <div className="flex flex-row space-x-2">
            <div style={{ minWidth: model.widthVisualisator||"60%" }}>
              <RecouvermentView
                documents={documents}
                record={record}
                fetchedRecord={refetch}
                documentsCount={documentsCount} 
                documentOptions={documentOptions}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                refreshDocumentsList={refreshDocumentsList}
                setIsNew={setIsNew}
                isNew={isNew}
              />
            </div>
            <div className="flex-auto">
              <LayoutElementDisplay
                model={model}
                modelFields={modelFields}
                layouts={modelLayouts}
                viewType={FieldViewType.CONSULT}
                record={record}
                fetchedRecord={refetch}
              />
            </div>
          </div>
        </>
      )}
      {children}
    </div>
  );
}

templatesDictionary.registerTemplate("consult_relance", ConsultRelance);
