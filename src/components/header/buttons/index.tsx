import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ModelField } from "@/api/data/modelField";
import { Title } from "@/components/header/title";
import PrimaryButton from "@/components/generic/button/primaryButton";
import SearchButton from "@/components/generic/button/searchButton";
import { Model } from "@/api/data/model";
import { PeriodFilter } from "./periodFilter";
import { SortButton } from "./sortButton";
import { Subtitle } from "../title/subtitle";
import ZoneTimeline from "../zone-timeline";
import { faBarsFilter } from "@fortawesome/pro-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/pro-solid-svg-icons";
import { GenericButton } from "@/components/generic/button";
import { ExportButton } from "./exportButton";
import { FieldVisibility } from "@/components/list/table/selection/columnSelector";
import { useState } from "react";
import UpdateRepositoryModal from "@/components/UpdateRepositoryModal/FileManagerModal";
import FileMangerContact from "@/components/UpdateRepositoryModal/FileMangerContact";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { FieldFilter } from "./fieldFilter";

/**
 * Parameters for table header component
 */
interface ListTabHeaderProps {
  /**
   * Grand titre de la page
   */
  title?: string;
  /**
   * Sous-titre de la page
   */
  subtitle?: string;
  /**
   * Représente une modèle
   */
  model?: Model;
 /**
   * Champs records
   */
  records?: any;
  /**
   * Champs de la modèle
   */
  modelFields?: Map<string, ModelField>;
  /**
   * Pour le tri des données
   */
  sort?: Object;
  /**
   * Pour le filtre sur les champs
   */
  filters?: Object;
  /**
   * Période entre deux dates données
   */
  period?: any;
  /**
   * Pour effectuer une recherche
   */
  search?: string;
  /**
   * Un callback déclenché lorsque la valeur de la propriété "search" change
   */
  onSearchUpdate?: Function;
  /**
   * Un callback déclenché lorsque la valeur de la propriété "sort" change
   */
  onSortUpdate?: Function;
  /**
   * Un callback déclenché lorsque la valeur de la propriété "filter" change
   */
  onFiltersButtonClicked?: Function;
  /**
   * Un callback déclenché lorsque la valeur de la propriété "period" change
   */
  onPeriodUpdate?: Function;
  /**
   * Fonction appellé lors d'un ajout d'une nouvelle donée
   */
  onAdd?: Function;
  /**
   * Fonction appellé lors d'un export de donées
   */
  onExport?: Function;
  /**
   * Afficher ou masquer le composant de recherche
   */
  searchButtonVisible?: boolean;
  /**
   * Afficher ou masquer le composant de tri
   */
  sortButtonVisible?: boolean;
  /**
   * Afficher ou masquer le composant de filtre
   */
  filtersButtonVisible?: boolean;
  /**
   * Afficher ou masquer le composant de période
   */
  periodFilterVisible?: boolean;
  /**
   * Afficher ou masquer le composant d'ajout
   */
  addButtonVisible?: boolean;
  /**
   * Afficher ou masquer le composant d'export
   */
  exportButtonVisible?: boolean;
  /**
   * Liste des champs visibles
   */
  availableFields?: FieldVisibility[];
  /**
   * Résultat total de données
   */
  totalResultCount?: any;
  /**
   * Tous les éléments sélectionnés
   */
  selectedIds?: any;
  /**
   * Numéro de la page courante
   */
  resultCount?: any;
  /**
   * Afficher ou masquer le composant de filtre
   */
  fieldFilterVisible?: boolean;
  /**
   * Un callback déclenché lorsque la valeur de la propriété "filter" change
   */
  onFiltersUpdate?: Function;
  onRestFilter?: Function;
}

/**
 * <b>Composant d'en-tête de page qui est un ensemble de plusieurs composants</b>
 * contenant des actions à effectuer pour traiter les données comme:
 * <li>Recherche</li>
 * <li>Tri</li>
 * <li>Période</li>
 * <li>Filtre</li>
 * <li>Ajout</li>
 * <li>Export</li>
 * <li>...</li>
 */
export function ListTabHeader({
  title,
  subtitle,
  model,
  modelFields,
  search,
  records,
  sort,
  filters,
  period,
  onSearchUpdate,
  onSortUpdate,
  onFiltersButtonClicked,
  onPeriodUpdate,
  onAdd,
  onExport,
  searchButtonVisible,
  sortButtonVisible,
  filtersButtonVisible = true,
  periodFilterVisible = true,
  addButtonVisible = true,
  exportButtonVisible = true,
  availableFields,
  selectedIds,
  resultCount,
  onFiltersUpdate,
  totalResultCount,
  fieldFilterVisible,
  onRestFilter,
}: ListTabHeaderProps) {
  const { t } = useTranslation(["common", "invoice"]);
  const [updateRepositoryShow, setUpdateRepositoryShow] =useState<boolean>(false);
  const updateRepository = () => {
      setUpdateRepositoryShow(true);
    };
  const [updateContactShow, setUpdateContactShow] =useState<boolean>(false);
  const updateShowModalContact = () => {
    setUpdateContactShow(true);
  };

 
  return (
    <>
      <div className="flex flex-row place-content-between">
        <div>
          <Title label={title&&t(`headers.${title}`, {ns: "invoice"})} />
          <Subtitle label={title&&t(`headers.${subtitle}`, {ns: "invoice"})} />
        </div>

        <div className="flex items-center space-x-2">
          <SearchButton
            placeholder={t("actions.search", { ns: "common" })}
            icon={<FontAwesomeIcon icon={faSearch} />}
            value={search}
            onChange={(e: any) =>
              onSearchUpdate && onSearchUpdate(e.target.value)
            }
            searchButtonVisible={searchButtonVisible}
          />
          <SortButton
            model={model}
            sort={sort}
            fieldsMetadataMap={modelFields}
            onChange={(e: any) => onSortUpdate && onSortUpdate(e)}
            sortButtonVisible={sortButtonVisible}
          />

          {/* <FieldFilter
            model={model}
            filters={filters}
            fieldsMetadataMap={modelFields}
            onChange={(e: any) => onFiltersUpdate && onFiltersUpdate(e)}
            fieldFilterVisible={fieldFilterVisible}
          /> */}

          {filtersButtonVisible && (
            <>
                <GenericButton
                  label={t("actions.filter", { ns: "common" })}
                  icon={
                    <FontAwesomeIcon
                      icon={faBarsFilter}
                      className="text-[var(--color-princ)]"
                    />
                  }
                  role={undefined}
                  onClick={() => onFiltersButtonClicked && onFiltersButtonClicked()}
                ></GenericButton>


                <GenericButton
                
                icon={
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className="text-[var(--color-princ)]"
                  />
                }
                role={undefined}
                onClick={() => onRestFilter && onRestFilter()}
              ></GenericButton>
          </>
          )
          
          
          }

          <PeriodFilter
            period={period}
            onChange={(e: any) => onPeriodUpdate && onPeriodUpdate(e)}
            periodFilterVisible={periodFilterVisible}
          />

          <PrimaryButton
            label={t("actions.add", { ns: "common" })}
            icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={(e: any) => ["suppliersContact","clientsContact","users"].includes(model?.endpoint||"")?updateShowModalContact():onAdd && onAdd(e)}
            buttonVisible={addButtonVisible}
          />
          <PrimaryButton
            label={"Mettre a jour"}
            // icon={<FontAwesomeIcon icon={faPlus} />}
            onClick={(e: any) => updateRepository()}
            buttonVisible={addButtonVisible}
          />
          <ExportButton
            model={model}
            fieldsMetadataMap={modelFields}
            onChange={(e: any) => onExport && onExport(e)}
            exportButtonVisible={exportButtonVisible}
            totalResultCount={totalResultCount}
            availableFields={availableFields}
            selectedIds={selectedIds}
            resultCount={resultCount}
            records={records}
          />
        </div>
      </div> 
      <ZoneTimeline />
      {updateRepositoryShow && (
        <UpdateRepositoryModal
          show={updateRepositoryShow}
          modalClosed={() => setUpdateRepositoryShow(false)}
        />
      )}

{updateContactShow && (
        <FileMangerContact
          show={updateContactShow}
          modalClosed={() => setUpdateContactShow(false)}
          title={"Ajout de contact"}
          model={model}
          modelFields={modelFields}
          viewType={FieldViewType.EDIT}

        />
      )}
    </>
  );
}
