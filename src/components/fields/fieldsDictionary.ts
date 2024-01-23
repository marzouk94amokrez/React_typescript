import { ComponentClass } from "react";
import { FieldViewType } from "./fieldViewType";

/**
 * Dictionary of the available fields and components
 */
export default new class FieldsDictionary {
  private dictionary: Map<FieldViewType, Map<string, ComponentClass>> = new Map<FieldViewType, Map<string, ComponentClass>>();

  /**
   * Create a new instance of the dictionary
   */
  constructor() {
    const types: FieldViewType[] = [FieldViewType.CONSULT, FieldViewType.EDIT, FieldViewType.FILTER, FieldViewType.LIST];

    types.forEach((type) => {
      this.dictionary.set(type, new Map<string, ComponentClass>());
    });
  }

  /**
   * Register a field into the dictionary
   * @param {FieldViewType} type 
   * @param {ComponentClass} component 
   */
  registerField(type: FieldViewType, field: string, component: ComponentClass): boolean {
    if (!this.dictionary.has(type)) {
      return false;
    }

    this.dictionary.get(type)?.set(field, component);

    return true;
  }

  /**
   * Get the fields from the dictionary
   * 
   * @param {FieldViewType} type 
   */
  getFields(type: FieldViewType): Map<string, ComponentClass>|undefined {
    return this.dictionary.get(type);
  }

  /**
   * Check if dictionary has a field of the specified type
   * 
   * @param type 
   * @param field 
   * @returns true if a field does exist and false otherwise
   */
  hasField(type: FieldViewType, field: string): boolean {
    return (this.dictionary.has(type) && this.dictionary.get(type)?.has(field)) as boolean;
  }

  /**
   * Get the declared component of a field
   * 
   * @param type 
   * @param field 
   * 
   * @returns The field component
   */
  getField(type: FieldViewType, field: string): ComponentClass|undefined {
    if (!this.hasField(type, field)) {
      return undefined;
    }

    return this.dictionary.get(type)?.get(field);
  }
}();
