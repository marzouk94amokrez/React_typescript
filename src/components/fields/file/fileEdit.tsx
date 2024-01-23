import { useState, useCallback } from "react";
import { FileUploader } from "@/components/generic/file/uploader";
import { FileEntry, fileId } from "@/components/generic/file/uploader/utils";
import { UploadItem } from "@/components/generic/file/uploader/upload-list";

const testFileTypes = [
  "Justificatif d’Immatriculation KBIS",
  "Attestation sociale de vigilance URSSAF",
  "Attestation d'assurance",
];

/**
 * <b>Composant d'édition d'un champ de type file</b>
 */
export default function FileEdit() {
  const [uploadedFiles, setUploadedFiles] = useState<FileEntry[]>([]);

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
        setUploadedFiles(Array.from(uploads.values()));
      }
    },
    [uploadedFiles]
  );

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <div className="flex flex-col flex-auto overflow-scroll">
        <UploadItem
          files={uploadedFiles}
          reuseType={false}
          allowedTypes={testFileTypes}
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
            updatedFiles.splice(fileIndex, 1, { ...entry, fileType: type });

            setUploadedFiles(updatedFiles);
          }}
        />
        <FileUploader onEntriesDroped={onEntriesDroped} dropZoneclassName="" />
      </div>
    </div>
  );
}
