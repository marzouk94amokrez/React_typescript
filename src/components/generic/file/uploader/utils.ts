/**
 *
 */
 import { v4 as uuidv4 } from 'uuid';
export interface FileDescription {
  mime: string;
  type: string;
  ext: string;
}

/**
 *
 */
export interface FileEntry {
  id: string;
  fileType?: string;
  type: string;
  name: string;
  size: number;
  lastModified: number;
  content: string;
}

export const units = ["Bytes", "Ko", "Mo", "Go", "To"];

/**
 *
 */
export const mimeToDescriptionMap = new Map<string, FileDescription>([
  ["image/png", { mime: "image/png", ext: ".png", type: "png" }],
  ["image/jpeg", { mime: "image/jpeg", ext: ".jpeg", type: "jpeg" }],
  ["application/pdf", { mime: "application/pdf", ext: ".pdf", type: "pdf" }],
  ["text/csv", { mime: "text/csv", ext: ".csv", type: "csv" }],
]);

/**
 * retourne l'ID unique d'un fichier
 * @param file
 * @returns
 */
export const fileId = (file: FileEntry | File): string => {
 // return `${file.name}_${file.type}_${file.size}_${file.lastModified}`;
  return `${file.name}_${file.type}_${file.size}`;
};

export const fileSize = (size: number) => {
  if (size === 0) return "0 Bytes";
  const k = 1024;
  const i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + units[i];
};

export const generateUUID = ():string => {
  return uuidv4();
}