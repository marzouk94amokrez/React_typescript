

// import { useState,useCallback,useEffect } from "react";
// import { ModalPopup } from "@/components/generic/modal";
// import { useTranslation } from "react-i18next";
// import { FileEntry, fileId,generateUUID,mimeToDescriptionMap } from "@/components/generic/file/uploader/utils";
// import styled from "styled-components";
// import DropZone from "./DropZone/DropZone";
// import async from "react-select/dist/declarations/src/async/index";
// // import { getStatusWithKey } from '@/shared/utility';
// //import {PrimaryBtnOutlineAction, SecondaryBtnOutlineAction, CancelBtnOutlineAction } from '../@/styles/Common';
// interface ActionPopupProps {
  
//   show?: boolean;
//   modalClosed?: Function;
//   onDrop?: Function;
//   uploadedFiles: any[];
//   setUploadedFiles: Function;
//   refreshDocumentsList: Function;
//   deleteAttachment?: Function;
//   onFileUpdate?: Function;
//   documents?: any;

// }

// enum BoutonType {
//   Confirm = "confirm",
//   Cancel = "cancel",
// }

// function FileManagerModal({
//   show,
//   modalClosed,
//   onDrop,
//   refreshDocumentsList,
//   deleteAttachment,
//   onFileUpdate,
//   documents,
//   setUploadedFiles,
//   uploadedFiles,
// }: ActionPopupProps) {
//   const { t } = useTranslation();
//   const [comment, setComment] = useState<string | null>(null);
//   const defaultButtons = [
//     {
//       type: BoutonType.Confirm,
//       label: t("actions.confirm", { ns: "common" }),
//       labelClassName: "text-[var(--button-color)]",
//       className: "border-[var(--button-border-principal)]",
//     },
//     {
//       type: BoutonType.Cancel,
//       label: t("actions.cancel", { ns: "common" }),
//       labelClassName: "text-red-500",
//       className: "border-red-500",
//       iconClassName: "text-red-500 ",
//     },
//   ];

//   const onModalButtonClicked = async (button: any) => {
//     if (button === "confirm") {
//       refreshDocumentsList(uploadedFiles);
//     }
//     if (modalClosed) {
//       modalClosed(true);
//     }
//   };





// // useEffect(() => {
// //   if (documents) {
// //     setUploadedFiles(documents);
// //   }
// // }, [documents,setUploadedFiles]);

// const onEntriesDroped = useCallback(
//   (entries: FileEntry[]) => {
//     const uploads: Map<string, FileEntry> = new Map(
//       uploadedFiles.map((f) => [generateUUID(), f])
//     );
//     entries.forEach((entry) => {
//         uploads.set(generateUUID(), entry);
//     });
//       setUploadedFiles(Array.from(uploads.values()));
//   },
//   [uploadedFiles]
// );

// console.log(uploadedFiles)

//   return (
//     <ModalPopup
//       modalTitle={"Gestion des fichiers"}
//       openModal={show}
//       handleClose={modalClosed}
//       modalButtons={defaultButtons}
//       onClickBtn={onModalButtonClicked}
//     >
//       <p style={{ color: "#809FB8", padding: "4px 0px 7px 9px" }}>
//         Dépôt de nouveaux fichiers
//       </p>
//       <div>
//         <DropZone
//           // checkDocumentsType={checkDocumentsType}
//           deleteAttachment={deleteAttachment}
//           onEntriesDroped={onEntriesDroped}
//           accept={"pdf/*"}
//           invoiceAttachement={uploadedFiles}
//           setInvoiceAttachement={setUploadedFiles}
//         />
//       </div>
//     </ModalPopup>
//   );
// }

// export default FileManagerModal;


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
interface AddDocumentPopupProps  {
  /** Enregistrement principal associé au modal */
  onConfirm: Function;
  /** Flag indiquant si le modal est ouvert */
  opened: boolean;
  /** Gestionnaire de fermeture du modal */
  onClose: Function;
  documents?: any;
}

/**
 * Composant
 * @param param0
 */
export function FileManagerModal({
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

  const types=[{value: "PF", label: "Preuves de facturation" },{value: "PC", label: "Preuve de commande" },{value: "PL", label: "Preuves de livraison" }]
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
            onConfirm(uploadedFiles||[]);
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
          allowedTypes={types}
          visibleLabelFileType={true}
          labelFileName={t("label.column_filename")}
          labelFileType={t("label.column_filetype")}
          onFileDelete={({ entry }) => {
            const remainingFiles = uploadedFiles.filter(
              (item) =>
                entry.fileType !== item.fileType ||
                fileId(entry) !== fileId(item)
            );
            setUploadedFiles(remainingFiles);
          }}
          onFileUpdate={({ entry, type }: any) => {
            // const fileIndex = uploadedFiles.findIndex(
            //   (item: FileEntry) =>
            //     item.type === entry.type && fileId(item) === fileId(entry)
            // );
            // if (fileIndex < 0) {
            //   return;
            // }
            // const updatedFiles = [...uploadedFiles];
            // updatedFiles.splice(fileIndex, 1, entry);
            // setUploadedFiles(updatedFiles);
            const i = uploadedFiles.findIndex((item:any) => item==entry);
            let entry1=[...entry,fileId];
           // setUploadedFiles([...uploadedFiles,uploadedFiles[i]=entry1]])
          }}
        />
      </div>
    </ModalPopup>
  );
}
