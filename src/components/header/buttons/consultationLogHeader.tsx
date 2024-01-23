import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faClose } from "@fortawesome/pro-regular-svg-icons";
import { ModelField } from "@/api/data/modelField";
import { Title } from "@/components/header/title";
import PrimaryButton from "@/components/generic/button/primaryButton";
import SecondaryButton from "@/components/generic/button/secondaryButton";
import { Model } from "@/api/data/model";
import { Subtitle } from "../title/subtitle";
import ZoneTimeline from "../zone-timeline";
import FilterButton from "@/components/generic/button/filterButton";
import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
   * Titre additionnel
   */
  additionalTtile?: string;
  /**
   * Représente une modèle
   */
  model?: Model;
  /**
   * Champs de la modèle
   */
  modelFields?: Map<string, ModelField>;
  /**
   * Label du bouton
   */
  labelButtonDownload?: string;
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
   * Fonction appelé lors d'un téléchargement de données
   */
  onDownloadClicked?: Function;
  /**
   * Fonction appelé lors du retour dans la page
   */
  onBack?: Function;
  /**
   * Afficher ou masquer le composant de recherche
   */
  searchButtonVisible?: boolean;
  /**
   * Afficher ou masquer le bouton retour
   */
  backButtonVisible?: boolean;
  /**
   * Afficher ou masquer le composant de téléchargement
   */
  downloadButtonVisible?: boolean;
  /**
   * Afficher ou masquer le composant d'Additionnal titre
   */
  additionalTitleVisible?: boolean;
  /**
   * Fonction appelé lors du click sur le bouton recherche
   */
  onClickSearchButton?: Function;
  /**
   * Fonction appelé lors de validation de recherche
   */
  onCommitSearch?: Function;
  /**
   * Fonction appelé en changeant la valeur du grep
   */
  onChangeValueSearch?: Function;
  /**
   * Fonction appelé en changeant la valeur du nombre de logne
   */
  onChangeNumberValueSearch?: Function;
  /**
   * Afficher ou masquer le bouton recherche
   */
  searchFilterVisible?: boolean;
}

interface AdditionalTitleProps {
  label?: string;
  isVisible?: boolean;
}

function AdditionalTitle({ label, isVisible }: AdditionalTitleProps) {
  return (
    <div>
      <span
        className={`${
          isVisible ? "text-[var(--color-sec)] text-[0.9rem]" : "hidden"
        }`}
      >
        {label}
      </span>
    </div>
  );
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
export function ListLogHeader({
  title,
  subtitle,
  additionalTtile,
  onDownloadClicked,
  onBack,
  downloadButtonVisible = true,
  backButtonVisible,
  labelButtonDownload,
  additionalTitleVisible = false,
  onCommitSearch,
  onChangeValueSearch,
  onChangeNumberValueSearch,
  searchFilterVisible,
}: ListTabHeaderProps) {
  const { t } = useTranslation(["common"]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-row place-content-between">
        <div>
          <Title label={title} />
          <Subtitle label={subtitle} />
          <AdditionalTitle
            label={additionalTtile}
            isVisible={additionalTitleVisible}
          />
        </div>

        <div className="flex items-center space-x-2">
          {searchFilterVisible ? (
            <FilterButton
              label={"Grep"}
              overFlowStrategy="visible"
              menuIsOpen={menuOpen}
              onMenuOpened={() => setMenuOpen(true)}
              onMenuClosed={() => setMenuOpen(false)}
              filterClassName={"-mt-3"}
              className={"float-right"}
              icon={
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-[var(--color-princ)]"
                />
              }
              component={{
                Menu: (
                  <div className="pt-2 py-4 px-1 text-sm ">
                    <div className="flex flex-col px-1 p-[5px]">
                      <div>
                        Recherche Grep (Case sensitive)
                        <div className="pt-2 p-2">
                          <input
                            className="border rounded-[5px] w-full p-1"
                            onChange={(params) => {
                              onChangeValueSearch &&
                                onChangeValueSearch(params.target.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="pt-2 flex-row inline-flex items-center">
                        Nombre de lignes après :&nbsp;
                        <input
                          className="border rounded-[5px] text-end p-1 mr-2"
                          onChange={(params) => {
                            onChangeNumberValueSearch &&
                              onChangeNumberValueSearch(params.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col flex-none py-1 before:mb-2 before:content-['\ '] before:w-full before:bg-[color:var(--separator-border-color)]">
                      <div className="flex justify-center space-x-3">
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          className="text-[var(--color-princ)] cursor-pointer text-lg"
                          onClick={() => {
                            onCommitSearch && onCommitSearch();
                            setMenuOpen(false);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faClose}
                          className="text-[var(--color-princ)] cursor-pointer border rounded-sm px-[2px]"
                          onClick={() => setMenuOpen(false)}
                        />
                      </div>
                    </div>
                  </div>
                ),
              }}
            />
          ) : (
            <></>
          )}

          <PrimaryButton
            label={labelButtonDownload}
            onClick={() => onDownloadClicked && onDownloadClicked()}
            buttonVisible={downloadButtonVisible}
          />
          <SecondaryButton
            label={t("actions.back", { ns: "common" })}
            buttonVisible={backButtonVisible}
            onClick={() => onBack && onBack()}
          />
        </div>
      </div>
      <ZoneTimeline />
    </>
  );
}
