import { LayoutElement } from "@/api/data/layoutElement";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { FieldViewType } from "@/components/fields/fieldViewType";

/**
 * Propriété pour un élément de layout
 */
export interface LayoutElementProps {
  /**
   * Objet de modèle à afficher dans l'élément de layout
   */
  model: Model;
  /**
   * Dictionnaire des champs à afficher dans l'élément de layout
   */
  modelFields: Map<string, ModelField>;
  /**
   * Mode de visualisation du layout (consultation ou edition)
   * Le mode sera utilisé par les champs
   */
  viewType: FieldViewType;
  /**
   * Enregistrement modifiable à afficher dans le layout
   */
  record: any;
  /**
   * Enregistrement "propre" venant de la source de données
   */
  fetchedRecord: any;
  /**
   * Structure d'affichage à afficher à partir de cet élément
   * Un tableau de layout à un élément est envoyé si l'appel provient du composant d'affichage vers un composant concret
   */
  layouts: LayoutElement[];
  /**
   * Gestionnaire d'évènement update d'un champ
   * L'évènement sera passé récursivement vers les composants parents
   */
  onUpdate?: Function;

  /** CSS pour personnaliser l'apparence de libellé champ */
  labelClassName?: any;

  /** CSS pour personnaliser l'apparence de la valeur du champ */
  fieldClassName?: any;
  /**
   * Libellé à mettre
   */
  label?: string;
  /**
   * Liste des erreurs de validations
   */
  validations?: any;

  // Extra
  /**
   * Propriétés supplémentaires de l'élément de layout
   */
  [propName: string]: any;
}
