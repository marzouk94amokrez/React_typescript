import { LayoutElement } from "@/api/data/layoutElement";

/**
 * Utilitaire de tri pour les layout elements
 * @param a 
 * @param b 
 * @returns number
 */
export const layoutElementSort = (a: LayoutElement, b: LayoutElement) => {
  const pa = (a.position || NaN) * 1;
  const pb = (b.position || NaN) * 1;

  if (isNaN(pb)) {
    return 1;
  }

  if (isNaN(pa)) {
    return -1;
  }

  return pa - pb;
}

/**
 * Remplace les noms de champs dans le template par la valeur dans l'enregistrement
 * @param template Chaine de template
 * @param record Enregistrement avec les valeurs
 * @returns 
 */

export const replaceVariables = (template: string|undefined, record: any) =>
{
  const pattern = /{uuid}/;
  if (pattern.test(template||'') && !record["uuid"]) {
    return null;
  }
  return template?.replace(
    /({([^{}]+)})/gm,
    (match, pattern, field, offset, string) => {
      return record[field] || "";
    }
  );
 
  }


  export const base64toBlob = (data: string) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    // const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
    const bytes = atob(data);
    let length = bytes.length;
    let out = new Uint8Array(length);
    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }
    return new Blob([out], { type: 'application/pdf' });
  };
