import { Pagination } from "@/components/list/pagination";
import { TrioListSelector } from "./trioListSelector";
import { FieldVisibility } from "@/components/list/table/selection/columnSelector";
import { Model } from "@/api/data/model";

export interface DisplayToolProps {
  /**
   * Evénement permettant de détecter la valeur de la densité
   */
  className?: string;
  /**
   * Représente une modèle
   */
  model?: Model;
  /**
   * Liste des valeurs possible pour le nombre de lignes
   */
  listValuesLine?: any[];
  /**
   * Evénement permettant de détecter la valeur du nombre de lignes à afficher
   */
  onChangeLine?: any;
  /**
   * Evénement permettant de détecter la valeur de densité à afficher
   */
  onChangeDensity?: any;
  /**
   * Liste des valeurs de densité à utiliser
   */
  listItemDensity?: any;
  /**
   * Liste des champs visibles
   */
  availableFields?: FieldVisibility[];
  /**
   * Evenement appllé lors de modification sur les champs visibles
   */
  onFieldVisibilityUpdate?: any;
  /**
   * Numéro de page actuelle
   */
  currentPage?: any;
  /**
   * Total du nombre de pages
   */
  pageCount?: any;
  /**
   * Nombre d'élément à afficher par page
   */
  pageSize?: any;
  /**
   * Résultat total de données
   */
  totalResult?: any;
  /**
   * Un callback pour tout clic sur le composant.
   * Expose des informations sur la partie cliquée (par exemple,le contrôle suivant)
   **/
  onChangePagination?: any;
  /**
   * Afficher ou masquer le composant selection de lignes
   */
  hideLine?: boolean;
  /**
   * Afficher ou masquer le composant selection de densité
   */
  hideDensity?: boolean;
  /**
   * Afficher ou masquer le composant selection de colonnes
   */
  hideColumn?: boolean;
  /**
   * Afficher ou masquer le composant de pagination
   */
  paginationVisible?: boolean;
}

/**
 * <b>Composant qui contient les trois composants de sélections d'une liste avec le composant de pagination</b>
 * Les 3 composants des sélections :
 * <li>LineCountListSelector</li>
 * <li>DensityListSelector</li>
 * <li>ColumnSelector</li>
 */
export function DisplayTool({
  className,
  model,
  listValuesLine,
  onChangeLine,
  listItemDensity,
  onChangeDensity,
  currentPage,
  onChangePagination,
  pageSize,
  totalResult,
  availableFields,
  onFieldVisibilityUpdate,
  hideColumn = false,
  hideDensity = false,
  hideLine = false,
  paginationVisible = true,
}: DisplayToolProps) {
  return (
    <div
      className={`inline-flex items-center w-full place-content-between ${className ? className : ""
        }`}
    >
      <div className="flex-start">
        <TrioListSelector
          currentValue={pageSize}
          listValuesLine={listValuesLine}
          onChangeLine={onChangeLine}
          onChangeDensity={onChangeDensity}
          listItemDensity={listItemDensity}
          model={model}
          fieldVisibility={availableFields}
          onFieldVisibilityUpdate={(e: any) =>
            onFieldVisibilityUpdate && onFieldVisibilityUpdate(e)
          }
          hideLine={hideLine}
          hideDensity={hideDensity}
          hideColumn={hideColumn}
        />
      </div>
      <div className="ml-auto">
        <Pagination
          currentPage={currentPage}
          totalResult={totalResult}
          elementPerPage={pageSize}
          onChangePagination={onChangePagination}
          paginationVisible={paginationVisible}
        />
      </div>
    </div>
  );
}
