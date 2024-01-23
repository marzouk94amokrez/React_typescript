import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TemplateProps } from "@/components/templates/templateProps";
import { ModalPopup } from "@/components/generic/modal";
import { FileUploader } from "@/components/generic/file/uploader";
import { FileEntry, fileId,generateUUID } from "@/components/generic/file/uploader/utils";
import { UploadItem } from "@/components/generic/file/uploader/upload-list";

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
}

/**
 * Composant
 * @param param0
 */
export function AddDocumentPopup({
  record,
  documents,
  opened = false,
  onConfirm,
  onClose,
}: AddDocumentPopupProps) {
  const { t } = useTranslation();

  const buttons = [
    {
      type: "confirm",
      label: t("actions.confirm", { ns: "common" }),
      labelClassName: "text-[var(--button-color)]",
      className: "border-[var(--button-border-principal)]",
    },
    {
      type: "cancel",
      label: t("actions.cancel", { ns: "common" }),
      labelClassName: "text-red-500",
      className: "border-red-500",
      iconClassName: "text-red-500 ",
    },
  ];

  const [uploadedFiles, setUploadedFiles] = useState<FileEntry[]>([]);

  useEffect(() => {
    if (documents) {
      setUploadedFiles(documents);
    }
  }, [documents, setUploadedFiles]);

  // const onEntriesDroped = useCallback(
  //   (entries: FileEntry[]) => {
  //     let entryAdded = false;
  //     const uploads: Map<string, FileEntry> = new Map(
  //       uploadedFiles.map((f) => [fileId(f), f])
  //     );

  //     entries.forEach((entry) => {
  //       const fId = fileId(entry);
  //       if (!uploads.has(fId)) {
  //         uploads.set(fId, entry);
  //         entryAdded = true;
  //       }
  //     });
  //     if (entryAdded) {
  //       setUploadedFiles(Array.from(uploads.values()));
  //     }
  //   },
  //   [uploadedFiles]
  // );
  const onEntriesDroped = useCallback(
    (entries: FileEntry[]) => {
      const uploads: Map<string, FileEntry> = new Map(
        uploadedFiles.map((f) => [generateUUID(), f])
      );
      entries.forEach((entry) => {
          uploads.set(generateUUID(), entry);
      });
        setUploadedFiles(Array.from(uploads.values()));
    },
    [uploadedFiles]
  );
  return (
    <ModalPopup
      modalTitle={"Gestion des fichiers"}
      openModal={opened}
      handleClose={() => {
        onClose && onClose();
      }}
      modalButtons={buttons}
      onClickBtn={(command: any) => {
        switch (command) {
          case "confirm":
            onConfirm(uploadedFiles);
            onClose && onClose();
            break;
          case "cancel":
            onClose && onClose();
            break;
        }
      }}
    >
      <div>
        <FileUploader onEntriesDroped={onEntriesDroped} dropZoneclassName="" />
        <UploadItem
          files={uploadedFiles}
          reuseType={false}
          visibleLabelFileType={true}
          labelFileName={t("label.column_filename", {
            ns: "invoice",
          })}
          labelFileType={t("label.column_filetype", {
            ns: "invoice",
          })}
          onFileDelete={({ entry }) => {
            const remainingFiles = uploadedFiles.filter(
              (item) =>
                entry.fileType !== item.fileType ||
                fileId(entry) !== fileId(item)
            );

            setUploadedFiles(remainingFiles);
          }}
          onFileUpdate={({ entry, type }: any) => {
            const fileIndex = uploadedFiles.findIndex(
              (item: FileEntry) =>
                item.type === entry.type && fileId(item) === fileId(entry)
            );

            if (fileIndex < 0) {
              return;
            }

            const updatedFiles = [...uploadedFiles];
            updatedFiles.splice(fileIndex, 1, entry);

            setUploadedFiles(updatedFiles);
          }}
        />
      </div>
    </ModalPopup>
  );
}
