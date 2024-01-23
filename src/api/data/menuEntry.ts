/**
 * Objet de représentation d'une entrée dans le menu
 */
export interface MenuEntry {
  /**
   * Libellé du meu
   */
  label: string;
  /**
   * Chemin du menu à afficher sur le client
   */
  path: string;
  /**
   * URL à appeler au niveau du serveur
   */
  endpoint?: string;
  /**
   * Identifiant de l'objet à utiliser pour le chargement des metadonnées
   */
  object?: string;
  /**
   * Ecran à afficher
   */
  screen?: string;
  /**
   * Picto du menu
   */
  picto?: string;
  /**
   * Elements du sous menu
   */
  elements?: MenuEntry[];
}
