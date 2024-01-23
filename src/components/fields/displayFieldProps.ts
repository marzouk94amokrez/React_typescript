import { ModelField } from '@/api/data/modelField'
import { ValidationResult } from '@/utils/validations/validationRules';
import { FieldViewType } from './fieldViewType';
import { Model } from '@/api/data/model';

/**
 * Properties of a displayfield
 */
export interface DisplayFieldProps {
  /**
   * Objet de modèle à utiliser
   */
  model?: Model;
   /**
   * Enregistrement modifiable à afficher dans le layout
   */
  record?: any;
  /**
   * Libellé du champ
   */
  fieldLabel?: any; // Label
  /**
   * Enregistrement "propre" venant de la source de données
   */
  fetchedRecord?: any; // Record fetched from the DB
  /**
   * Nom du champ
   */
  fieldName?: string; // Name of the field
  /**
   * Metadonnées des champs
   */
  fieldMetadata?: ModelField; // Meta for this specific field
  /**
   * Liste de métadonnées des champs
   */
  fieldsMetadataMap?: Map<string, ModelField>; // List of model fields metadata
  /**
   * Mode de visualisation du layout (consultation ou édition)
   */
  viewType: FieldViewType; // Field view type,
  /**
   * Évenement appelée en dehors du focus
   */
  onBlur?: Function; // Component lost focus
  /**
   * Événement appelée lors du focus
   */
  onFocus?: Function; // Component is focused
   /** Evénement permettant de détecter la valeur du champ saisie  */
  onUpdate?: Function; // Component value has been updated
  /** Vérifier si le libellé est à cacher ou à afficher */
  hideLabel?: boolean;
  /**
   * CSS pour personnaliser l'apparence du libellé du champ
   */
  labelClassName?: any;
  /**
   * CSS global pour personnaliser l'apparence du composant
   */
  className?: any;
  /** 
   * CSS pour personnaliser l'apparence de la valeur du champ 
   * */
  fieldClassName?: any;
  /**
   * CSS pour l'apparence du composant
   */
  componentClassName?: any;
  /**
   * Vérifier si le composant est inactif
   */
  disabled?: boolean;
  /**
   * Vérifier si le libellé du champ est inactif
   */
  disabledLabel?: boolean;

  
  /**
   * Séparateur entre le libellé et la valeur du champ
   */
  separatorIndicator?: string;
 /**
   * Liste des erreurs de validations
   */
  validations?:Map<string,ValidationResult>;
  isExternal?:boolean;
}
