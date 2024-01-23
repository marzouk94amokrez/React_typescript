/**
 * Structure d'un token d'accès après login
 */
export interface AccessToken {
  token: string;
  tokenContents: any;
  /**
   * Propriétés supplémentaires de l'élément
   */
  [propName: string]: any;
}
