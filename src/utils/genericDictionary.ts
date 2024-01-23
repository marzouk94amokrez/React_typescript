export default class GenericDictionary<T> {
  private dictionary: Map<string, T> = new Map<string, T>()

  /**
   * Register a template into the dictionary
   * @param {string} name
   * @param {T} item 
   */
  register(name: string, item: T): Boolean {
    this.dictionary.set(name, item);

    return true;
  }

  /**
   * Check if dictionary has a template of the specified name
   * 
   * @param {string} name 
   * @returns true if a template does exist and false otherwise
   */
  has(name: string): boolean {
    return this.dictionary.has(name);
  }

  /**
   * Get the declared item of a field
   * 
   * @param type 
   * @param field 
   * 
   * @returns The field item
   */
  get(name: string): T|undefined {
    if (!this.has(name)) {
      return undefined;
    }

    return this.dictionary.get(name);
  }

  /**
   * Liste des clés du dictionnaire
   */
  keys(): string[] {
    return Array.from(this.dictionary.keys());
  }

  /**
   * Liste des clés du dictionnaire
   */
  values(): T[] {
    return Array.from(this.dictionary.values());
  }
};
