import { useEffect, useState,useCallback } from "react";
import PdfViewer from "./PdfViewer/PdfViewer";
import { useParams } from "react-router-dom";
import { getNotyfObject } from "@/shared/utility";
import DeepSelect from "@/components/UI/DeepSelect/DeepSelect";
import axios from "axios";
import {
  IVContainer,
  IVWrapper,
  IVDownloadContainer,
  ContentSelect,
  IVDownloadIcon,
} from "./InvoiceView.styled";
import {FileManagerModal} from "@/components/FileManagerModal/FileManagerModal";


import DownloadIcon from "@mui/icons-material/Download";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { FileEntry, fileId,generateUUID,mimeToDescriptionMap } from "@/components/generic/file/uploader/utils";

export interface ite {
  docName?: string;
  docFile?: string;
  family?: string;
  type?: string;
  uid?: string;
  content?: string;
  docType?: string;
  new?: boolean;
  name?: string;
  id?: string;
}
export interface TempProps {
  invoiceData?: any;
  documents?: any;
  record?: any;
  fetchedRecord?: Function;
  documentsCount?: any;
  documentOptions?: any;
  selectedFile?: any;
  setSelectedFile?: Function;
  refreshDocumentsList:Function;
  setIsNew?: Function;
  isNew?: boolean;
}

export interface TemplateProps {
  // attachments: Map<string, file>;
  attachments: ite[];
  layoutActions?: any;
}
function RecouvermentView({
  documents,
  record,
  fetchedRecord,
  documentsCount,
  documentOptions,
  selectedFile,
  setSelectedFile,
  refreshDocumentsList,
  setIsNew,
  isNew,
}: TempProps) {
  const navTabsList = [
    { label: "PDF", value: "pdf" },
    { label: "PDF", value: "pdf" },
  ];
   const [showFileManagerModal, setShowFileManagerModal] = useState(true);


  


   const onFileDelete=()=>{};
   const onFileUpdate=()=>{};

//  const onFileDelete=({entry}:any ) => {
//     const remainingFiles = uploadedFiles.filter(
//       (item) =>
//         entry.fileType !== item.fileType ||
//         fileId(entry) !== fileId(item)
//     );

//     setUploadedFiles(remainingFiles);
//   }

//  const onFileUpdate=({ entry, type }: any) => {
//     const fileIndex = uploadedFiles.findIndex(
//       (item: FileEntry) =>
//         item.type === entry.type && fileId(item) === fileId(entry)
//     );

//     if (fileIndex < 0) {
//       return;
//     }

//     const updatedFiles = [...uploadedFiles];
//     updatedFiles.splice(fileIndex, 1, entry);

//     setUploadedFiles(updatedFiles);
//   }


  let admView = null;
  if (!selectedFile) admView = "<spinner/> ";
  else {
    if (selectedFile)
      admView = (
        <>
          {true ? (
            //  <PdfViewer pdfFile={ file} pdfFileName={pdfFileName} />
            <PdfViewer pdfFile={selectedFile?.value?.content ||""} pdfFileName={selectedFile?.label||"teste"} />
          ) : null}
        </>
      );
    
  }
  const [uploadedFiles,setUploadedFiles]=useState<any>([]);
  return (
    <IVWrapper
      style={{
        padding: "1rem",
        border: "1px solid #809FB8",
        borderRadius: "19px",
        marginRight: "13px",
      }}
    >
      <ContentSelect>
        {/* <Select width={invoiceData.contentieux == 1 ? "100%" : "97%"} */}

        <DeepSelect
          // fileName={fileName}
          // <Select
          width={"100%"}
          close={false}
          deleteItem={onFileDelete}
          options={documentOptions}
          value={selectedFile?.label}
          onChange={setSelectedFile}
        />
        <div
          style={{ width: "4/%", paddingTop: "4px", cursor: "pointer" }}
          onClick={() => setShowFileManagerModal(true)}
        >
          <InsertDriveFileIcon style={{ color: "#2174B9" }} />
        </div>
      </ContentSelect>
      {/* {(tab == "xml" || tab == "edi" || tab == "chorus") && (
        <IVDownloadContainer>
          <IVDownloadIcon onClick={() => downloadClickHandler(tab)}>
            <DownloadIcon />
          </IVDownloadIcon>
        </IVDownloadContainer>
      )} */}
      <IVContainer accessToken={''}>{admView}</IVContainer>
      {showFileManagerModal ? (
        <FileManagerModal
          documents={documents}
          opened={showFileManagerModal}
          onClose={() => setShowFileManagerModal(false)}
          onConfirm={refreshDocumentsList}
        />
      ) : null}
    </IVWrapper>
  );
}

export default RecouvermentView;
