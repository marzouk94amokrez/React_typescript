import { useAppSelector } from "@/hooks/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ModelField } from "@/api/data/modelField";
import { useLogger } from "@/utils/loggerService";
import { FileEntry, fileId } from "@/components/generic/file/uploader/utils";
import { UploadItem } from "@/components/generic/file/uploader/upload-list";
import { FileUploader } from "@/components/generic/file/uploader";
import { MultivalProps } from "../multivalProps";

/** <b>Composant d'édition multival de type file</b> */
export const MultivalFileEdit = ({
  model,
  fieldMetadata,
  fieldName,
  record,
  fieldClassName,
  componentClassName,
  onUpdate,
  loadOptions,
  selectedOptions,
  valueField,
  titleField,
}: MultivalProps) => {
  const { logger } = useLogger();

  // Chargement des champs du model
  const fields = useAppSelector(
    (state) => state.objectsDefinitions[model?.code as string]?.fields
  );
  const modelFields = useMemo(() => {
    return new Map<string, ModelField>(fields);
  }, [fields]);

  const defaultFileTypes = [
    "Justificatif d’Immatriculation KBIS",
    "Attestation sociale de vigilance URSSAF",
    "Attestation d'assurance",
  ];

  const [fileModelFileFieldName, setFileModelFileFieldName] = useState("");
  // eslint-disable-next-line
  const setupFileModelFileField = useCallback(async () => {
    const fileFields = Array.from(modelFields?.values() || []).filter(
      (field: ModelField) => field.type === "file"
    );
    //
    setFileModelFileFieldName(fileFields[0]?.field_name || "");
  }, [modelFields, fieldMetadata]);

  const [uploadedFiles, setUploadedFiles] = useState<FileEntry[]>([]);
  const setupUploadedFiles = useCallback(async () => {
    const files = record ? record[fieldName] || [] : [];

    // init uploadedFiles list from record if already exist
    const corr: Map<string, string> = new Map([["JPEG", "jpeg"]]);
    const recordedFiles: any = files.map((f: any) => {
      const file: FileEntry = {
        id: f[valueField],
        name: f[titleField],
        type: corr.has(f.ext) ? corr.get(f.ext) : f.ext,
        size: Number.parseInt(f.size),
        lastModified: 0,
        content: f[fileModelFileFieldName],
      };
      return file;
    });
    setUploadedFiles(recordedFiles);
  }, [record, fieldName, valueField, fileModelFileFieldName, titleField]);

  useEffect(() => {
    setupUploadedFiles();
  }, [setupUploadedFiles]);

  //
  const onEntriesDroped = useCallback(
    (entries: FileEntry[]) => {
      let entryAdded = false;
      const uploads: Map<string, FileEntry> = new Map(
        uploadedFiles.map((f) => [fileId(f), f])
      );

      logger.log("entries", entries);

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

  return (
    <>
      <UploadItem
        labelFileName=""
        labelFileSize=""
        allowedTypes={defaultFileTypes}
        files={uploadedFiles}
        reuseType={false}
        visibleLabelFileSize={true}
        visiblePaperClipIcon={true}
        onFileDelete={({ entry }) => {
          const remainingFiles = uploadedFiles.filter(
            (item) =>
              entry.fileType !== item.fileType || fileId(entry) !== fileId(item)
          );

          setUploadedFiles(remainingFiles);
        }}
        onFileUpdate={({ entry, type }) => {
          const fileIndex = uploadedFiles.findIndex(
            (item: FileEntry) =>
              item.fileType === entry.fileType && fileId(item) === fileId(entry)
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
      ></UploadItem>
      <FileUploader onEntriesDroped={onEntriesDroped}></FileUploader>
    </>
  );
};
