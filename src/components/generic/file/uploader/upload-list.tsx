import { useEffect, useState } from "react";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileEntry, fileId, fileSize } from "./utils";
import equal from "fast-deep-equal";
import { useLogger } from "@/utils/loggerService";

export interface UploadListEntryEvent {
  entry: FileEntry;
}

export interface FileDeleteEvent extends UploadListEntryEvent {}

export interface FileUpdateEvent extends UploadListEntryEvent {
  type: string;
}

export interface FileSelectedEvent extends UploadListEntryEvent {}

interface UploadItemProps {
  /** Liste de fichiers uploadés */
  files?: FileEntry[];
  /** Booléen stipulant si les type sont réutilisable ou non */
  reuseType?: boolean;
  /** Type de documents ou fichiers*/
  allowedTypes?: any[];
  /** Fichier selectionné ou en cours */
  selectedEntry?: FileEntry;
  /** Visibilité du label nom de fichier */
  visibleLabelFileName?: boolean;
  /** Visibilité du label type de fichier */
  visibleLabelFileType?: boolean;
  /** Visibilité du label  taille du fichier */
  visibleLabelFileSize?: boolean;
  /** Visibilité de l'icone épingle*/
  visiblePaperClipIcon?: boolean;
  /** Classe de personnalisation du label nom de fichier   */
  headerFileNameClassName?: string;
  /** Classe de personnalisation du label type de fichier   */
  headerFileTypeClassName?: string;
  /** Classe de personnalisation du label taille du fichier   */
  headerFileSizeClassName?: string;
  /** Classe de personnalisation de la valeur correspondant à la colonne nom de fichier   */
  rowFileNameClassName?: string;
  /** Classe de personnalisation de la valeur correspondant à la colonne type de fichier   */
  rowFileTypeClassName?: string;
  /** Classe de personnalisation de la valeur correspondant à la colonne taille du fichier   */
  rowFileSizeClassName?: string;
  /** Permettre la selection de la ligne(du fichier)   */
  allowRowSelection?: boolean;
  /** Visibilité de la colonne taille du fichier */
  visibleColumnFileSize?: boolean;
  /** Libellé correspondant au nom de fichier */
  labelFileName?: any;
  /** Libellé correspondant au type de fichier */
  labelFileType?: any;
  /** Libellé correspondant au taille du fichier */
  labelFileSize?: any;
  /** Évènement, suppression d'un fichier de la liste */
  onFileDelete?: (event: FileDeleteEvent) => any;
  /** Évènement, mis à jour d'un fichier de la liste */
  onFileUpdate?: (event: FileUpdateEvent) => any;
  /** Évènement, selection d'un nouveau fichier */
  onSelectionUpdate?: (event: FileSelectedEvent) => any;
}

/**
 * <b>Composant d'affichage des fichiers uploadés</b>
 * @param param0
 * @returns
 */
export function UploadItem({
  files = [],
  reuseType = false,
  allowedTypes = [],
  selectedEntry,
  visibleLabelFileName = true,
  visibleLabelFileType = false,
  visibleLabelFileSize = false,
  visibleColumnFileSize = false,
  visiblePaperClipIcon = false,
  allowRowSelection = false,
  labelFileName,
  labelFileType,
  labelFileSize,
  headerFileNameClassName,
  headerFileSizeClassName,
  headerFileTypeClassName,
  rowFileNameClassName,
  rowFileTypeClassName,
  rowFileSizeClassName,
  onSelectionUpdate,
  onFileDelete,
  onFileUpdate,
}: UploadItemProps) {
  const [fileTypes, setFileTypes] = useState<any[]>([]);
  const { logger } = useLogger();
  useEffect(() => {
    const typesOnfiles = files.map((f) => f.fileType);
    const types = [
      { value: "", label: "<-------------->" },
      ...allowedTypes.map((e: any) => ({ value: e.value, label: e.label })),
    ];

    const newFileTypes = reuseType
      ? types
      : types.filter((t) => t.value === "" || !typesOnfiles.includes(t.value));

    if (equal(newFileTypes, fileTypes)) {
      return;
    }

    setFileTypes(newFileTypes);
  }, [files, reuseType, allowedTypes, fileTypes]);

  const [attachments, setAttachments] = useState<FileEntry[]>([]);
  const onFileSelected = (entry: FileEntry) => {
    if (
      !onSelectionUpdate ||
      (selectedEntry && fileId(entry) === fileId(selectedEntry))
    ) {
      return;
    }

    onSelectionUpdate({ entry });
  };

  function deleteFromList(entry: FileEntry) {
    if (!onFileDelete) {
      return;
    }

    onFileDelete({ entry });
  }

  /**
   * Update invoices list
   */
  useEffect(() => {
    setAttachments(files);
  }, [files]);

  const stylesSelect = {
    container: (base: any) => ({
      ...base,
      width: "100%",
    }),

    control: (base: any, state: any) => ({
      ...base,
      background: "transparent",
      boxShadow: state.isFocused ? null : null,
      cursor: "pointer",
    }),

    clearIndicator: (base: any) => ({
      ...base,
      color: "var(--color-sec)",
    }),

    dropdownIndicator: (base: any) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      color: "var(--color-sec)",
    }),

    indicatorSeparator: (base: any) => ({
      ...base,
      display: "none",
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      minHeight: 20,
      paddingTop: 0,
      background: "transparent",
      paddingLeft: 0,
    }),

    singleValue: (provided: any) => ({
      ...provided,
      color: "grey",
    }),

    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: "grey",
      };
    },

    option: (provided: any) => ({
      ...provided,
      background: "transparent",
      color: "grey",
      cursor: "pointer",
      paddingBottom: "1px",
    }),

    menu: (base: any) => ({
      ...base,
      borderRadius: "4px",
      display: "flex",
      minWidth: "100%",
    }),
  };

  return (
    <table className="w-full">
      <thead>
        <tr>
          {visibleLabelFileName && (
            <th className={`w-[40%] ${headerFileNameClassName}`}>
              {labelFileName}
            </th>
          )}
          {visibleLabelFileType && (
            <th className={`w-[40%] ${headerFileTypeClassName}`}>
              {labelFileType}
            </th>
          )}
          {visibleLabelFileSize && (
            <th className={`w-[20%] text-center ${headerFileSizeClassName}`}>
              {labelFileSize}
            </th>
          )}
          <th className="w-[20%]"></th>
        </tr>
      </thead>
      <tbody>
        {attachments &&
          attachments.map((entry) => (
            <tr
              className={`cursor-pointer ${
                allowRowSelection && selectedEntry === entry
                  ? "bg-[var(--gris-fond)] bg-opacity-40 text-[var(--bleu-icd)]"
                  : ""
              }`}
              key={fileId(entry)}
            >
              <td
                className={`truncate ${rowFileNameClassName}`}
                onClick={() => {
                  onFileSelected(entry);
                }}
              >
                <>
                  {visiblePaperClipIcon && (
                    <FontAwesomeIcon
                      icon="paperclip-vertical"
                      className="pr-2"
                    />
                  )}
                </>
                {entry.name}
              </td>
              {allowedTypes && allowedTypes.length > 0 && (
                <td className={rowFileTypeClassName}>
                  <Select
                    options={fileTypes}
                    onChange={(e: any) => {
                      console.log(e)
                      onFileUpdate &&
                        onFileUpdate({
                          entry,
                          type: e ? e.value : "",
                        });
                    }}
                    styles={stylesSelect}
                    isSearchable={false}
                    placeholder={""}
                  />
                </td>
              )}
              {visibleColumnFileSize && (
                <td
                  className={`border-white border-2 text-center ${rowFileSizeClassName}`}
                >
                  {fileSize(entry.size)}
                </td>
              )}
              <td className="text-center bg-white">
                <button onClick={() => deleteFromList(entry)}>
                  {" "}
                  <FontAwesomeIcon
                    icon="circle-xmark"
                    className="text-2xl"
                    color="red"
                  />{" "}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
