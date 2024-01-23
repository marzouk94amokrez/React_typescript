export interface LayoutElement {
  /**
   * Liste des enfants de l'élément de layout
   */
  elements?: LayoutElement[];
  /**
   * Type de l'élément de layout
   */
  type?: string;
  /**
   * Libellé de l'élément de layout
   */
  label?: string; 
  // List tab
  /**
   * Nom de l'objet externe
   */
  object?: string;
  /**
   * Endpoint pour le chargement des données
   */
  endpoint?: string;
  /**
   * Position de l'élément lors de l'affichage
   */
  position?: number;
  // Extra
  /**
   * Propriétés supplémentaires de l'élément de layout
   */
  [propName: string]: any;
}
