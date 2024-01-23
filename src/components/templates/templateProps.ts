import { LayoutElement } from "@/api/data/layoutElement";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { FieldViewType } from "@/components/fields/fieldViewType";

/**
 * Interface décrivant les propriétés attendus par un composant servant de template
 * principal pour l'affichage d'enregistrements
 */
export interface TemplateProps {
  /**
   * Objet de modèle à utiliser
   */
  model: Model;
  /**
   * Dictionnaire des champs de modèle
   */
  modelFields: Map<string, ModelField>;
  /**
   * Dictionnaire des layout de modèle
   */
  modelLayouts?: LayoutElement[];
  /**
  * Liste des actions du layout
  */
  layoutActions?: any;
  /**
   * Enregistrement par défaut à afficher
   */
  record?: any;
  /**
   * Vérifier si c'est un composant enfant
   */
  isChild?: boolean;
  /**
   * Type d'affichage du composant parent
   */
  parentViewType?: FieldViewType;
  // Extra
  /**
   * Propriétés supplémentaires de l'élément de template
   */
  [propName: string]: any;
}
