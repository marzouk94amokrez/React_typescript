import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mimeToDescriptionMap, FileEntry, fileId } from "./utils";
import { useLogger } from "@/utils/loggerService";
import { useTranslation } from "react-i18next";

/**
 *
 */
export interface FileUploaderProps {
  /** Évènement, dépôt de fichier sur la zone */
  onEntriesDroped?: (entries: FileEntry[]) => any;
  /** Classe de personnalisation de la zone de depôt de fichier */
  dropZoneclassName?: string | string[];
}

/**
 * <b>Composant d'upload de fichier. Supporte le glisser/déposer et la selection</b>
 * @param param0
 * @returns
 */
export function FileUploader({
  onEntriesDroped,
  dropZoneclassName,
}: FileUploaderProps) {
  const { logger } = useLogger();
  const { t } = useTranslation(["common"]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploads: Map<string, FileEntry> = new Map();

      const fileLoadingPromises: Promise<boolean>[] = acceptedFiles.map(
        (file) =>
          new Promise((resolve, reject) => {
            let entry: FileEntry | undefined = undefined;
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = function (e) {
              const description = mimeToDescriptionMap.get(file.type);
              const result: string = (e.target?.result as string) || "";
              const base64Content = result;

              entry = {
                id: "",
                name: file.name || "",
                type: description?.type || "",
                content: base64Content,
                size: file.size,
                lastModified: file.lastModified,
              };

              // Add file into list
              if (entry) {
                const fId = fileId(entry);
                if (!uploads.has(fId)) {
                  uploads.set(fId, entry);
                  resolve(true);
                }
              }
              resolve(false);
            };

            reader.onerror = function () {
              logger.log("Erreur de lecture du fichier: ", reader.error);
              resolve(false);
            };
          })
      );

      Promise.all(fileLoadingPromises).then(() => {
        logger.log(">>>>> OUT", Array.from(uploads.entries()));
        onEntriesDroped && onEntriesDroped(Array.from(uploads.values()));
      });
    },
    [onEntriesDroped]
  );

  // eslint-disable-next-line
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    // accept: "image/*",
    accept: {
      "application/pdf": [".pdf"],
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "text/csv": [".csv"],
    },
    onDrop,
    // maxSize: 8388608 // 8Mo
  });

  const defaultClassname = [
    "border-[1px] solid",
    "border-[var(--gris-bleu)]",
    "rounded-[35px]",
    "h-[50px]",
    "text-center",
    "py-[10px]",
    "cursor-pointer",
    "mb-[15px]",
    "text-[var(--gris-bleu)]",
  ];

  return (
    <>
      <section className="container text-[0.8rem]">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className={`${defaultClassname.join(" ")} ${dropZoneclassName}`}>
            <FontAwesomeIcon icon="up-to-line" className="text-2xl" />
            <span>{t("messages.upload_here", { ns: "common" })}</span>
          </div>
        </div>
      </section>
    </>
  );
}
