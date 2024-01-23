import { useTranslation } from "react-i18next";
import { useLogger } from "@/utils/loggerService";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FileEntry } from "@/components/generic/file/uploader/utils";
import { CSVViewer } from "@/components/generic/file/viewer/csv-viewer";

/**
 *
 */
export interface FileViewerProps {
  /** Fichier à visualiser */
  file: FileEntry;
}

/**
 * <b>Composant parent pour le visualisateur de fichier</b>
 * @param param0
 * @returns
 */
export function FileViewer({ file }: FileViewerProps) {
  const { logger } = useLogger();
  const { t } = useTranslation(["common"]);
  const typeOfFile = file?.type ? file?.type : "";
  const filePathOrContent = file?.content ? file?.content : "";
  const isTypeImage =
    typeOfFile === "png" || typeOfFile === "jpeg" || typeOfFile === "jpg";
  const isTypePDF = typeOfFile === "pdf";
  const isTypeCSV = typeOfFile === "csv";

  return (
    <div
      className=""
      style={{
        height: "100%",
      }}
    >
      {(() => {
        if (isTypePDF) {
          return (
            <Worker
              workerUrl={`${process.env.PUBLIC_URL}/js/pdf.worker.min.js`}
            >
              <Viewer fileUrl={filePathOrContent} />
            </Worker>
          );
        } else if (isTypeImage) {
          return (
            <img
              src={filePathOrContent}
              alt=""
              className="max-w-full max-h-full"
            ></img>
          );
        } else if (isTypeCSV) {
          return <CSVViewer file={filePathOrContent}></CSVViewer>;
        } else {
          return (
            <div className="rpv-core__doc-error">
              <div className="rpv-core__doc-error-text">
                Not supported file format
              </div>
            </div>
          );
        }
      })()}
    </div>
  );
}
