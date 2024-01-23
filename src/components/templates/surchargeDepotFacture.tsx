import { useTranslation } from "react-i18next";
import { Title } from "@/components/header/title";
import { Subtitle } from "@/components/header/title/subtitle";
import PrimaryButton from "@/components/generic/button/primaryButton";
import SecondaryButton from "@/components/generic/button/secondaryButton";
import { FileViewer } from "@/components/generic/file/viewer";
import { FileUploader } from "@/components/generic/file/uploader";
import { FileEntry, fileId } from "@/components/generic/file/uploader/utils";
import { UploadItem } from "@/components/generic/file/uploader/upload-list";

import templatesDictionary from "./templatesDictionary";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import copy from "fast-copy";
import { TemplateProps } from "./templateProps";
import { ModelField } from "@/api/data/modelField";
import { useLogger } from "@/utils/loggerService";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useAppSelector } from "@/hooks/store";
import {
  useGetObjectByIdQuery,
  useUpdateObjectByIdMutation,
} from "@/store/api";

/**
 * <b>Composant qui permet de déposer les factures</b>
 */
export function SurchageDepotFacture({ model, modelFields }: TemplateProps) {
  const { t } = useTranslation(["common", model?.code as string]);
  const { modelName, id } = useParams();
  const navigate = useNavigate();
  const { logger } = useLogger();

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

  // Enregistrement chargé depuis la base
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

  // Enregistrement à afficher
  const [record, setRecord] = useState<any>({});
  useEffect(() => {
    setRecord(copy(fetchedRecord));
  }, [fetchedRecord]);

  const [uploadedFiles, setUploadedFiles] = useState<FileEntry[]>([]);
  useEffect(() => {
    const files = record ? record[fileFieldName] || [] : [];

    // init uploadedFiles list from record if already exist
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
    setUploadedFiles(recordedFiles);
  }, [
    record,
    fileFieldName,
    fileIdField,
    fileLabelField,
    fileModelFileFieldName,
  ]);

  const [selectedFile, setSelectedFile] = useState<FileEntry>();

  useEffect(() => {
    let selectedFile =
      uploadedFiles && uploadedFiles.length > 0 ? uploadedFiles[0] : undefined;
    setSelectedFile(selectedFile);
  }, [setSelectedFile, uploadedFiles]);

  const onEntriesDroped = useCallback(
    (entries: FileEntry[]) => {
      let entryAdded = false;
      const uploads: Map<string, FileEntry> = new Map(
        uploadedFiles.map((f) => [fileId(f), f])
      );

      entries.forEach((entry) => {
        const fId = fileId(entry);
        if (!uploads.has(fId)) {
          uploads.set(fId, entry);
          entryAdded = true;
        }
      });
      if (entryAdded) {
        const updatedUploads = Array.from(uploads.values());
        setUploadedFiles(updatedUploads);
      }
    },
    [uploadedFiles]
  );

  // MAJ Invoice
  const [updateObject, updateObjectResult] = useUpdateObjectByIdMutation();
  const updateInvoice = useCallback(async () => {
    let files: Array<{
      description?: string;
      file?: {};
      [propName: string]: any;
    }> = [];

    uploadedFiles.forEach((fileInfo: FileEntry) => {
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
      files.push(file);
    });

    let updatedRecord: any = copy(record);
    updatedRecord[fileFieldName] = files;

    const { data: result, error }: any = await updateObject({
      objectName: model.endpoint,
      id: record?.id,
      data: record,
    });

    if (result.status === "success") {
      const updatedRecord = result?.data?.records?.at(0);
      // Redirection après création
      if (updatedRecord[OBJECTS_ID_FIELD] && !record?.id) {
        const redirectUrl = `/${modelEndpoint}/view/${updatedRecord[OBJECTS_ID_FIELD]}`;
        logger.debug(`Redirection vers ${redirectUrl}`);
        navigate(redirectUrl);
      }
    }

    logger.debug("UPDATE RESULT: ", result);
  }, [
    modelName,
    record,
    uploadedFiles,
    fileIdField,
    fileLabelField,
    fileModelFileFieldName,
  ]);

  const dropZoneclassName = ["text-[0.6rem]"];

  return (
    <>
      <div className="w-full">
        <div className="flex flex-row pb-2 mb-3 border-b-2 place-content-between">
          <div>
            <Title label={t("label.supplier", { ns: model.code })} />
            <Subtitle label={t("label.invoice_deposit", { ns: model.code })} />
          </div>
          <div className="flex items-center space-x-2">
            <PrimaryButton
              label={t("actions.depositConfirm", { ns: "common" })}
              onClick={() => {
                updateInvoice();
              }}
            />
            <SecondaryButton
              label={t("actions.back", { ns: "common" })}
              onClick={() => navigate(-1)}
            />
          </div>
        </div>
        <div className="flex flex-row h-full space-x-2">
          <div
            className="flex flex-col space-y-2 border border-[var(--color-sec)] border-solid rounded-md mb-2 px-6"
            style={{ minWidth: model.widthVisualisator, maxHeight: "600px" }}
          >
            <div className="flex-auto max-h-full">
              {selectedFile && (
                <FileViewer key={fileId(selectedFile)} file={selectedFile} />
              )}
            </div>
          </div>
          <div className="flex-auto mb-2">
            <div className="flex flex-col h-full">
              <FileUploader
                onEntriesDroped={onEntriesDroped}
                dropZoneclassName={dropZoneclassName}
              />
              <div className="relative border border-[var(--color-sec)] border-solid rounded-md p-2 h-full">
                <span className="text-[var(--bleu-icd)] text-base mb-4">
                  {t("label.deposit_list", { ns: model.code })}
                </span>
                <UploadItem
                  files={uploadedFiles}
                  reuseType={false}
                  visibleLabelFileSize={true}
                  visibleColumnFileSize={true}
                  labelFileName={t("label.column_filename", {
                    ns: model.code,
                  })}
                  labelFileSize={t("label.column_filesize", {
                    ns: model.code,
                  })}
                  allowRowSelection={true}
                  selectedEntry={selectedFile}
                  onSelectionUpdate={({ entry }) => {
                    if (entry) {
                      setSelectedFile(entry);
                    }
                  }}
                  onFileDelete={({ entry }) => {
                    const remainingFiles = uploadedFiles.filter(
                      (item) =>
                        entry.fileType !== item.fileType ||
                        fileId(entry) !== fileId(item)
                    );

                    setUploadedFiles(remainingFiles);
                  }}
                  onFileUpdate={({ entry, type }) => {
                    const fileIndex = uploadedFiles.findIndex(
                      (item: FileEntry) =>
                        item.fileType === entry.fileType &&
                        fileId(item) === fileId(entry)
                    );

                    if (fileIndex < 0) {
                      return;
                    }

                    const updatedFiles = [...uploadedFiles];

                    if (entry) {
                      updatedFiles.splice(fileIndex, 1, {
                        ...entry,
                        fileType: type,
                      });
                      setUploadedFiles(updatedFiles);
                    }
                  }}
                />
                <div className="absolute left-2 right-2 bottom-2 border border-[var(--color-sec)] border-solid rounded-md p-2">
                  <span className="text-[var(--bleu-icd)] text-base mb-4">
                    {t("label.deposit_notice", { ns: model.code })}
                  </span>
                  <p className="text-sm text-justify">
                    {t("message.deposit_notice_1", { ns: model.code })}
                  </p>
                  <p className="text-sm text-justify">
                    {t("message.deposit_notice_2", { ns: model.code })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

templatesDictionary.registerTemplate(
  "surchage_depot_facture",
  SurchageDepotFacture
);
