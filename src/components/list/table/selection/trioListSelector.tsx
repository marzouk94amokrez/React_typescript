import { ColumnSelector, FieldVisibility } from "./columnSelector";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import DensityListSelector from "./densityListSelector";
import { LineCountListSelector } from "./lineCountListSelector";

interface TrioListSelectorProps {
  /**
   * Représente une modèle
   */
  model?: Model;
  /**
   * Représente les champs d'une modèle
   */
  modelFields?: Map<string, ModelField>;
  /** 
  Valeur actuelle du nombre de lignes à afficher 
  */
  currentValue?: any;
  /**
   * Libellé
   */
  label?: string;
  /**
   * Liste des valeurs de lignes à afficher
   */
  listValuesLine?: any[];
  /**
   * Classe css permettant de personnaliser l'apparence de l'icone
   */
  className?: string;
  /**
   * Evénement permettant de détecter la valeur de la densité
   */
  onChangeDensity?: any;
  /**
   * Evénement permettant de détecter la valeur du nombre de lignes à afficher
   */
  onChangeLine?: any;
  /**
   * Liste des valeurs de densité à utiliser
   */
  listItemDensity?: any[];
  /**
   * Liste des champs visibles
   */
  fieldVisibility?: FieldVisibility[];
  /**
   * Evenement appllé lors de modification sur les champs visibles
   */
  onFieldVisibilityUpdate?: Function;
  /**
   * Masquer ou non le composant Ligne
   */
  hideLine?: boolean;
  /**
   * Masquer ou non le composant Densité
   */
  hideDensity?: boolean;
  /**
   * Masquer ou non le composant Colonne
   */
  hideColumn?: boolean;
}

/**
 *
 * @param {Event} onChangeDensity Event to detect density value
 * @param {Event} onChangeLine Event to detect the number of rows value to display
 * @param {number} currentValue Current value of the number of rows to display
 * @param {Array} listValuesLine List of row values ​​to display
 * @param {Array} listItemDensity List of density values ​​to use
 * @returns {Components} Components containing Line, density and column component
 */

/** <b>Ensemble de trois composants pour la sélection d'une liste</b>
 * <li>LineCountListSelector</li>
 * <li>DensityListSelector</li>
 * <li>ColumnSelector</li>
 */
export function TrioListSelector({
  model,
  currentValue,
  listValuesLine,
  listItemDensity,
  fieldVisibility,
  onChangeDensity,
  onChangeLine,
  onFieldVisibilityUpdate,
  hideLine,
  hideDensity,
  hideColumn,
}: TrioListSelectorProps) {
  return (
    <div className="inline-flex flex-row place-content-start border 3px solid var(--colors-secondary-3) rounded-lg p-1 ">
      <div>
        {!hideLine ? (
          <LineCountListSelector
            onChangeLine={onChangeLine}
            currentValue={currentValue}
            listValuesLine={listValuesLine}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="inline-flex flex-row items-center">
        {!hideDensity ? (
          <DensityListSelector
            onChangeDensity={onChangeDensity}
            listItemDensity={listItemDensity}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="inline-flex flex-row items-center">
        {model && fieldVisibility && !hideColumn ? (
          <ColumnSelector
            model={model}
            fieldVisibilityList={fieldVisibility}
            onFieldVisibilityUpdate={onFieldVisibilityUpdate}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
