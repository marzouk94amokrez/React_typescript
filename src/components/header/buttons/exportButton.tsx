import { useTranslation } from "react-i18next";
import { HandleChange } from "@/components/generic/button/searchButton";
import FilterButton from "@/components/generic/button/filterButton";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { faChevronDown } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState,useRef } from "react";
import { ModalPopup } from "@/components/generic/modal";
import { useLogger } from "@/utils/loggerService";
import { FieldVisibility } from "@/components/list/table/selection/columnSelector";

import { MutableRefObject } from 'react';
import { useSearchModelQuery } from "@/store/api";
export interface ExportButtonProps extends HandleChange {
  /** Représentation d'un modèle */
  model?: Model;
  /** Liste des métadonnées des champs du modèle */
  fieldsMetadataMap?: Map<string, ModelField>;
  /** Afficher ou masquer le composant en question */
  exportButtonVisible?: boolean;
  /**
   * Liste des champs visibles
   */
  availableFields?: FieldVisibility[];
  /**
   * Résultat total de données
   */
  totalResultCount?: any;
  records?: any;
  /**
   * Tous les éléments sélectionnés
   */
  selectedIds?: any;
  /**
   * Nombre de résultats dans la page courante
   */
  resultCount?: any;
}

/**
 * <b>Composant qui permet d'afficher un bouton d'export</b>
 * @param param0
 * @returns
 */

export function ExportButton({
  model,
  fieldsMetadataMap,
  onChange,
  records,
  exportButtonVisible = true,
  availableFields,
  totalResultCount,
  selectedIds,
  resultCount,
}: ExportButtonProps) {
  const { t } = useTranslation(["common"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modeExport, setModeExport] = useState("");
  const [files, setFiles] = useState<any>("");
  const [file, setFile] = useState("");
  const [allElementCurrentPage, setAllElementCurrentPage] = useState<boolean>(false);
  const [allItemsPage, setAllItemsPage] = useState<boolean>(false);
  const [allItemsSelected, setAllItemsSelected] = useState<boolean>(false);
  const [csvHeaders, setCsvHeaders] = useState<any>([])
  const maximum_elementPDF = 1000;
  const maximum_elementCSV = 10000;
  const {
    data: allData,
    isLoading :isLoadingAllData,
    isSuccess: isSuccessAllData,
    isError: isErrorAllData,
    error: errorAllData,
    refetch :refetchAllData,
  } = useSearchModelQuery(
    {
      url: "objects/"+model?.endpoint+"/"+model?.endpoint+"All",
      objectName: model?.endpoint,
      params: {
        search: null,
        filters: null,
        sortParams: null,
        page: null,
        pageSize :maximum_elementCSV,
      },
    
    },
    { skip: !allItemsPage }
  );

  const {
    data: selectedData,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch :refetchSelectedData,
  } = useSearchModelQuery(
    {
      url: "objects/"+model?.endpoint+"/"+model?.endpoint+"Selected",
      objectName: model?.endpoint,
      params: {
        search: null,
        filters: null,
        sortParams: null,
        page: null,
        pageSize :selectedIds.length||0,
       selectedIds: selectedIds,
      },
    
    },
    { skip:  !allItemsSelected || selectedIds.length === 0}
  );
  const showModal = (element: any) => {
    setMenuOpen(true);
    setModeExport(element);
  };

  const dataModalExport = {
    pdf: {
      multi: true,
      mode_export: ["current_page, all, selected"],
    },
    csv: {
      multi: false,
      mode_export: ["current_page, all, selected"],
    },
  };

  useEffect(() => {
      let csvHeader=model?.structure?.filter((element: any) => element.exportable===true).map((element: any) => {
        return {label:t(element.field), key:element.field}
      })
      setCsvHeaders(csvHeader);
  }, [model?.structure])

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



  const { logger } = useLogger();

  const onConfirm = () => {
    const data = {
      files: files,
      file: file,
      allElementCurrentPage: allElementCurrentPage,
      allItemsPage: allItemsPage,
      allItemsSelected: allItemsSelected,
    };
    if(allElementCurrentPage){
      handleExportClick(records)
      setMenuOpen(false);
    }
    if(allItemsPage){
      refetchAllData()
      handleExportClick(allData?.data?.records)
      setMenuOpen(false);
    }
    if(allItemsSelected){
      refetchSelectedData()
      handleExportClick(selectedData?.data.records)
      setMenuOpen(false);
    }
  };


  const handleExportClick = (records:any) => {
    const csvData = records
    const csvContent = [
      csvHeaders.map((header: any) => header.label).join(','),
      ...csvData.map((row:any) => csvHeaders.map((header:any) => row[header.key]).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', 'exported-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <>
      {model &&
      model.exportable &&
      // model.exportFormats &&
      exportButtonVisible ? (
        <FilterButton
          label={t("actions.export", { ns: "common" })}
          overFlowStrategy="visible"
          icon={
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-[var(--color-princ)]"
            />
          }
          component={{
            Menu: (
              <ul>
                {["csv"].map((element, index) => (
                  <li
                    onClick={() => showModal(element)}
                    key={index}
                    className="text-[var(--color-sec)] text-[1rem] cursor-pointer  "
                  >
                    {element}
                  </li>
                ))}
              </ul>
            ),
          }}
        />
      ) : (
        <></>
      )}
      {menuOpen && (
        <ModalPopup
          modalTitle={`${t("labels.export")} ${modeExport}`}
          openModal={menuOpen}
          handleClose={() => {
            setMenuOpen(false);
          }}
          modalButtons={buttons}
          onClickBtn={(command: any) => {
            switch (command) {
              case "confirm":
                onConfirm();
                break;
              case "cancel":
                setMenuOpen(false);
                break;
            }
          }}
        >
          {modeExport === "PDF" ? (
            <>
              <p className="text-[var(--color-sec)]">
                {t("labels.resultExport", { ns: "common" })}
              </p>
              <div>
                <div className="flex">
                  <input
                    type="radio"
                    name="result_export"
                    id="files"
                    value={files}
                    onChange={(e: any) => setFiles(e.target.checked)}
                  />
                  <label className="pl-2">
                    {t("labels.multiplePDFFile", { ns: "common" })}{" "}
                  </label>
                </div>
                <div className="flex flex-items">
                  <input
                    type="radio"
                    name="result_export"
                    id="file"
                    value={file}
                    onChange={(e: any) => setFile(e.target.checked)}
                  />
                  <label className="pl-2">
                    {t("labels.singlePDFFile", { ns: "common" })}{" "}
                  </label>
                </div>
              </div>
              <br />
              <p className="text-[var(--color-sec)]">
                {t("labels.modeExprort", { ns: "common" })}
              </p>
              <div className="flex">
                <input
                  type="radio"
                  name="mode_export"
                  id="all_element_current_page"
                  value={"allElementCurrentPage"}
                  onChange={(e: any) =>
                    setAllElementCurrentPage(e.target.checked)
                  }
                />
                <label className="pl-2">
                  {t("labels.allElementInCurrentPage", { ns: "common" })} (
                  {resultCount} {t("labels.result", { ns: "common" })}){" "}
                </label>
              </div>
              <div className="flex flex-items">
                <input
                  type="radio"
                  name="mode_export"
                  id="all_items_pages"
                  value="all_items_pages"
                  onChange={(e: any) => setAllItemsPage(e.target.checked)}
                  disabled={totalResultCount > maximum_elementPDF && true}
                />
                <label className="pl-2">
                  {t("labels.allElements", { ns: "common" })} (
                  {totalResultCount} {t("labels.result", { ns: "common" })}){" "}
                  {totalResultCount > maximum_elementPDF && (
                    <span className="text-red-500">
                      {t("labels.maximumNumberItems", { ns: "common" })}(
                      {maximum_elementPDF})
                    </span>
                  )}{" "}
                </label>
              </div>
              <div className="flex flex-items">
                <input
                  type="radio"
                  name="mode_export"
                  id="all_selected_items"
                  value={"allItemsSelected"}
                  onChange={(e: any) => setAllItemsSelected(e.target.checked)}
                />
                <label className="pl-2">
                  {t("labels.selectedElements", { ns: "common" })} (
                  {selectedIds.length} {t("labels.result", { ns: "common" })}){" "}
                </label>
              </div>
            </>
          ) : (
            <>
              <p className="text-[var(--color-sec)]">
                {t("labels.modeExprort", { ns: "common" })}
              </p>
              <div className="flex">
                <input
                  type="radio"
                  name="mode_export"
                  id="all_element_current_page"
                  value={"allElementCurrentPage"}
                  onChange={(e: any) =>{
                            setAllElementCurrentPage(e.target.checked);
                            setAllItemsPage(false);
                            setAllItemsSelected(false);
                          }
                  }
                />
                <label className="pl-2">
                  {t("labels.allElementInCurrentPage", { ns: "common" })} (
                  {resultCount} {t("labels.result", { ns: "common" })}){" "}
                </label>
              </div>
              <div className="flex flex-items">
                <input
                  type="radio"
                  name="mode_export"
                  id="all_items_pages"
                  value="all_items_pages"
                  onChange={(e: any) => { setAllItemsPage(e.target.checked);
                                          setAllElementCurrentPage(false);
                                          setAllItemsSelected(false)}
                                        }
                  disabled={totalResultCount > maximum_elementCSV && true}
                />
                <label className="pl-2">
                  {t("labels.allElements", { ns: "common" })} (
                  {totalResultCount} {t("labels.result", { ns: "common" })}){" "}
                  {totalResultCount > maximum_elementCSV && (
                    <span className="text-red-500">
                      {t("labels.maximumNumberItems", { ns: "common" })} (
                      {maximum_elementPDF})
                    </span>
                  )}{" "}
                </label>
              </div>
              <div className="flex flex-items">
                <input
                  type="radio"
                  name="mode_export"
                  id="all_selected_items"
                  value={"allItemsSelected"}
                  onChange={(e: any) => {setAllItemsSelected(e.target.checked);
                                          setAllElementCurrentPage(false);
                                          setAllItemsPage(false)
                                        }}
                 disabled={selectedIds.length === 0}                       
                />
                <label className="pl-2">
                  {t("labels.selectedElements", { ns: "common" })} (
                  {selectedIds.length} {t("labels.result", { ns: "common" })}){" "}
                </label>
              </div>
            </>
          )}
          
        </ModalPopup>
      )}
      
    </>
  );
}
