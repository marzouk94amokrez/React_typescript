import { useCallback, useRef, useState } from "react";
// import './PdfViewer.css'
// Import the main component
// install also npm install pdfjs-dist@2.6.347
import { Viewer } from "@react-pdf-viewer/core"; // install this library
// Plugins
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"; // install this library
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// Worker
import { Worker } from "@react-pdf-viewer/core"; // install this library

//import { LocalizationMap } from '@react-pdf-viewer/core'; // for changing language

//import { ToolbarSlot  } from '@react-pdf-viewer/default-layout';
//import { ToolbarSlot } from '@react-pdf-viewer/toolbar';

import { getFilePlugin } from "@react-pdf-viewer/get-file";

import GetAppIcon from "@mui/icons-material/GetApp";
import { useTranslation } from "react-i18next";
import { CTooltip } from "@/components/UI/CTooltip/CTooltip";
import { useTheme } from "styled-components";
import {
  PVContainer,
  PVToHideMobile,
  PVToolbar,
  PVToolbarElements,
  PVToolbarElementsActions,
} from "./PdfViewer.styled";

export const PdfViewer = ({ pdfFile, pdfFileName }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [pdfView, setPdfView] = useState(null);
  const getFilePluginInstance = getFilePlugin();
  const { Download } = getFilePluginInstance;

  const downloadClickHandler = () => {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      // IE workaround
      let byteCharacters = atob(pdfFile);
      let byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      let blob = new Blob([byteArray], { type: "application/pdf" });
      window.navigator.msSaveOrOpenBlob(blob, pdfFileName || "mandat.pdf");
    } else {
      // much easier if not IE
      //________Direct Download_____
      let blob = new Blob([pdfFile], { type: "application/pdf" });
      const downloadUrl = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = "data:application/pdf;base64," + pdfFile;
      a.download = pdfFileName || "mandat.pdf";
      document.body.appendChild(a);
      a.click();

      //__________Visualize In The Browser _____
      // const blob = dataURItoBlob(data);
      // const url = URL.createObjectURL(blob);

      // // to open the PDF in a new window
      // window.open(url, '_blank');
    }
  };
  const renderToolbar = useCallback(
    (Toolbar) => {
      return (
        <Toolbar>
          {(ToolbarSlot) => {
            const {
              CurrentPageInput,
              EnterFullScreen,
              GoToNextPage,
              GoToPreviousPage,
              NumberOfPages,
              Print,
              ShowSearchPopover,
              Zoom,
              ZoomIn,
              ZoomOut,
              Open,
            } = ToolbarSlot;
            return (
              <PVToolbar>
                <PVToolbarElements>
                  <PVToolbarElementsActions>
                    <PVToHideMobile>
                      <ShowSearchPopover />
                    </PVToHideMobile>
                    <PVToHideMobile>
                      <ZoomOut />
                    </PVToHideMobile>
                    <PVToHideMobile>
                      <Zoom />
                    </PVToHideMobile>
                    <PVToHideMobile>
                      <ZoomIn />
                    </PVToHideMobile>
                    <PVToHideMobile>
                      <GoToPreviousPage />
                    </PVToHideMobile>
                    <div
                      style={{
                        padding: "0px 2px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <CurrentPageInput /> / <NumberOfPages />
                    </div>
                    <div style={{ padding: "0px 2px" }}>
                      <GoToNextPage />
                    </div>
                  </PVToolbarElementsActions>
                  <PVToolbarElementsActions>
                    <PVToHideMobile>
                      <EnterFullScreen />
                    </PVToHideMobile>
                    <div style={{ padding: "0px 2px" }}>
                      <Download>
                        {(props) => (
                          <div className="admViewer_download_icon">
                            <CTooltip title="Télécharger">
                              <GetAppIcon
                                style={{
                                  //backgroundColor: '#357edd',
                                  border: "none",
                                  borderRadius: "4px",
                                  //color: '#ffffff',
                                  cursor: "pointer",
                                }}
                                onClick={() => downloadClickHandler()}
                              />
                            </CTooltip>
                          </div>
                        )}
                      </Download>
                    </div>
                    <div style={{ padding: "0px 2px", marginRight: "10px" }}>
                      <Print />
                    </div>
                  </PVToolbarElementsActions>
                </PVToolbarElements>
              </PVToolbar>
            );
          }}
        </Toolbar>
      );
    },
    [pdfFile]
  );

  const docref = useRef();

  function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // useEffect(() => {
  //   if (pdfFile) {
  //     let pdfunit8 = _base64ToArrayBuffer(pdfFile);
  //     setPdfView(pdfunit8);
  //   } else setPdfView(null);
  // }, [pdfFile]);
  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [
      //defaultTabs[0],
      defaultTabs[0],
    ],
    renderToolbar,
  });

  const pageChangeHandler = (e) => {
    let currentPage = e?.currentPage + 1;
    let docPages = e?.doc?._pdfInfo?.numPages;
    if (currentPage === docPages) {
      //   setAdmScrolledEnd(true)
    }
  };

  const pdfScrollHandler = (e) => {
    let docPages = e?.doc?._pdfInfo?.numPages;
    //let pdfContainer = document.querySelector(".rpv-default-layout-body")
    //setAdmPdfPages(docPages)
  };
  return (
    <div className="container" style={{ maxWidth: "100%" }}>
      <PVContainer ref={docref} commandLine={false}>
        {/* show pdf conditionally (if we have one)  */}
        {pdfFile && (
          <>
            <Worker
              workerUrl={`${process.env.PUBLIC_URL}/js/pdf.worker.min.js`}
            >
              <Viewer
                fileUrl={pdfFile?pdfFile:null}
                // add toolbar and sidebar
                plugins={[defaultLayoutPluginInstance, getFilePluginInstance]}
                //localization={LocalizationMap}
                onPageChange={(e) => pageChangeHandler(e)}
                onDocumentLoad={(e) => pdfScrollHandler(e)}
              />
            </Worker>
          </>
        )}

        {/* if we dont have pdf or viewPdf state is null */}
        {!pdfFile && <>Aucun document</>}
      </PVContainer>
    </div>
  );
};

export default PdfViewer;
