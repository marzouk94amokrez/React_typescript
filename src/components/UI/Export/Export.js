import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ExportWrap, ExportContainer, ExportValue, ExportIcon, ExportOptions, ExportOption } from './Export.styled';

function Export({exportPdf, exportCsv, showEreporting, createEReporting}) {
    const [isOpen, setIsOpen] = useState(false);

    const divRef = useRef();
    //console.log(closeModal)
    const clickOutSideHandler = e => {
        if(divRef.current.contains(e.target)) {
            // inside the div
            return
        }
        // outside click
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener("mousedown", clickOutSideHandler);

        return () => {
            document.removeEventListener("mousedown", clickOutSideHandler);
        }
    }, [])

    const exportPdfClick = () => {
        setIsOpen(false);
        exportPdf();
    }

    const exportCsvClick = () => {
        setIsOpen(false);
        exportCsv();
    } 

  return (
      <ExportWrap ref={divRef}>
          <ExportContainer onClick={() => setIsOpen(!isOpen)}>
              <ExportValue>
                    Exporter
              </ExportValue>
              <ExportIcon>
                  {
                        isOpen ? <KeyboardArrowUpIcon className="ICDBlue"/> 
                        : <KeyboardArrowDownIcon  className="ICDBlue"/>
                  }
              </ExportIcon>
          </ExportContainer>
          {
                isOpen && (
                    <ExportOptions>
                            <ExportOption
                                onClick={() => exportPdfClick()}
                            >
                                PDF
                            </ExportOption>
                            <ExportOption
                                onClick={() => exportCsvClick()}
                            >
                                CSV
                            </ExportOption>
                            {
                                showEreporting && (
                                    <ExportOption
                                        onClick={() => createEReporting()}
                                    >
                                        E-Reporting
                                    </ExportOption>
                                )
                            }
                    </ExportOptions>
                )
          }
      </ExportWrap>
  );
}

export default Export;
