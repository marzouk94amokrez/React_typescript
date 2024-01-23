import { LayoutElement } from "./layoutElement";
import { ModelField } from "./modelField";

/**
 * Structure d'affichage pour un objet
 */
export interface ModelScreens {
  [screen: string]: LayoutElement; // indexer
  list: LayoutElement,
  consult: LayoutElement,
  edit: LayoutElement,
}

/**
 * Représentation d'un objet dans l'application
 */
export interface Model {
  table: string;
  code: string;
  endpoint?: string;
  exportable?: boolean;
  exportFormats?: string|string[];
  widthVisualisator?: string|number;
  defaultSort?: string;
  modeAjout?: string;
  structure: ModelField[];
  screens: ModelScreens;
}
