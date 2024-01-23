import { ComponentClass } from "react";

/**
 * Dictionnaire des élements d'affichages dans les templates
 */
export default new class LayoutElementsDictionary {
  private dictionary: Map<string, ComponentClass|Function> = new Map<string, ComponentClass|Function>();

  /**
   * Enregistrer un élément dans le dictionnaire
   * @param {string} nom. Nom du layout: field, separator_tab, separator_bloc, ...
   * @param {ComponentClass} component 
   */
  registerLayoutElement(name: string, component: ComponentClass|Function): Boolean {
    this.dictionary.set(name, component);

    return true;
  }

  /**
   * Tester si le dictionnaire dispose d'un élement nommé
   * 
   * @param {string} name 
   * @returns true si l'élément est déjà enregistré dans le dictionnaire
   */
  hasLayoutElement(name: string): boolean {
    return this.dictionary.has(name);
  }

  /**
   * Obtenir le composant enregistré dans le dictionnaire
   * 
   * @param type 
   * @param field 
   * 
   * @returns Le composant de l'élément d'affichage
   */
  getLayoutElement(name: string): ComponentClass|Function|undefined {
    if (!this.hasLayoutElement(name)) {
      return undefined;
    }

    return this.dictionary.get(name);
  }
}();
