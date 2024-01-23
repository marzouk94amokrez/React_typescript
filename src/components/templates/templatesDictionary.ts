import { ComponentClass } from "react";

/**
 * Dictionary of the available templates
 */
export default new class TemplatesDictionary {
  private dictionary: Map<string, ComponentClass|Function> = new Map<string, ComponentClass|Function>();

  /**
   * Register a template into the dictionary
   * @param {string} name
   * @param {ComponentClass} component 
   */
  registerTemplate(name: string, component: ComponentClass|Function): Boolean {
    this.dictionary.set(name, component);

    return true;
  }

  /**
   * Check if dictionary has a template of the specified name
   * 
   * @param {string} name 
   * @returns true if a template does exist and false otherwise
   */
  hasTemplate(name: string): boolean {
    return this.dictionary.has(name);
  }

  /**
   * Get the declared component of a field
   * 
   * @param type 
   * @param field 
   * 
   * @returns The field component
   */
  getTemplate(name: string): ComponentClass|Function|undefined {
    if (!this.hasTemplate(name)) {
      return undefined;
    }

    return this.dictionary.get(name);
  }
}();
