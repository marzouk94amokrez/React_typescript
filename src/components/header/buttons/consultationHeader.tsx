import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConsultationTitle } from "@/components/header/title/consultationTitle";
import { ConsultationSubtitle } from "@/components/header/title/consultationSubtitle";
import PrimaryButton from "@/components/generic/button/primaryButton";
import SecondaryButton from "@/components/generic/button/secondaryButton";
import CancelButton from "@/components/generic/button/cancelButton";
import { ModelField } from "@/api/data/modelField";
import { Model } from "@/api/data/model";
import ActionPopup from "./actionPopup";

/**
 * Parameters for table header component
 */
export interface ConsultationHeaderProps {
  /**
   * Objet de modèle à utiliser
   */
  model: Model;

  /**
   * Dictionnaire des champs de modèle
   */
  modelFields: Map<string, ModelField>;

  /**
   * Liste des actions du layout
   */
  layoutActions?: any;

  /**
   * Enregistrement à utiliser pour l'affichage du titre
   */
  record?: any;

  /**
   * Champ à utiliser pour le titre
   */
  title?: ModelField;

  /**
   * Tableau contenant le(s) champs à utiliser pour le(s) titre(s) additionnel(s)
   */
  additionalTitle?: ModelField[];

  /**
   * Lite contenant le(s) champs à utiliser pour le(s) sous-titre(s)
   */
  subtitles?: ModelField[];

  /**
   * Liste contenant le(s) champs à utiliser pour le(s) sous-titre(s) additionnel(s)
   */
  additionalSubtitles?: ModelField[];

  /**
   * Afficher ou masquer bouton actions
   */
  actionButtonVisible?: boolean;

  /**
   * Afficher ou masquer bouton modifier
   */
  editButtonVisible?: boolean;

  /**
   * Afficher ou masquer bouton annuler
   */
  deleteButtonVisible?: boolean;

  /**
   * Afficher ou masquer bouton annuler
   */
  saveButtonVisible?: boolean;

  /**
   * Afficher ou masquer bouton retour
   */
  backButtonVisible?: boolean;

  /**
   * Evènement appellé lors d'un clic sur le bouton modifier
   */
  onEdit?: any;

  /**
   * Evènement appellé lors d'un clic sur le bouton supprimer
   */
  onDelete?: any;

  /**
   * Evènement appellé lors d'un clic sur le bouton retour
   */
  onBack?: any;

  /**
   * Evènement appellé lors d'un clic sur le bouton sauvegarder
   */
  onSave?: any;

  /**
   * Evènement appellé lors d'un clic sur le bouton actions
   */
  onAction?: any;
}

/**
 * <b>Composant pour afficher l'en-tête de la page de consultation</b>
 *
 */
export function ConsultationHeader({
  model,
  modelFields,
  layoutActions,
  record,
  title,
  additionalTitle,
  subtitles,
  additionalSubtitles,
  actionButtonVisible,
  saveButtonVisible,
  editButtonVisible,
  deleteButtonVisible,
  backButtonVisible,
  onEdit,
  onBack,
  onDelete,
  onSave,
  onAction,
}: ConsultationHeaderProps) {
  const { t } = useTranslation(["common"]);

  /**
   * Click ur le bouton d'action
   */
  const [actionPopupOpened, setActionPopupOpened] = useState(false);
  const onActionButtonClicked = useCallback(() => {
    if (onAction) {
      return onAction();
    }

    setActionPopupOpened(true);
  }, [onAction]);

  /**
   *
   * @param { boolean } close : Flag indiquant si le popup doit être fermé
   */
  const closeActionPopupModal = useCallback((close: boolean) => {
    setActionPopupOpened(!close);
  }, []);

  return (
    <div className="flex flex-row mb-2 place-content-between">
      <div>
        <ConsultationTitle
          model={model}
          title={title}
          record={record}
          modelFields={modelFields}
          additionalTitle={additionalTitle}
        />
         <ConsultationSubtitle
          model={model}
          modelFields={modelFields}
          record={record}
          subtitles={subtitles}
          additionalSubtitles={additionalSubtitles}
        /> 
      </div>
      <div className="flex items-start space-x-2">
        <PrimaryButton
          label={t("actions.actions", { ns: "common" })}
          buttonVisible={actionButtonVisible}
          onClick={onActionButtonClicked}
        />
        <ActionPopup
          model={model}
          modelFields={modelFields}
          record={record}
          layoutActions={layoutActions}
          opened={actionPopupOpened}
          closeModal={closeActionPopupModal}
        />
        <PrimaryButton
          label={t("actions.save", { ns: "common" })}
          buttonVisible={saveButtonVisible}
          onClick={onSave}
        />
        <PrimaryButton
          label={t("actions.edit", { ns: "common" })}
          buttonVisible={editButtonVisible}
          onClick={onEdit}
        />
        <CancelButton
          label={t("actions.delete", { ns: "common" })}
          buttonVisible={deleteButtonVisible}
          onClick={onDelete}
        />
        <SecondaryButton
          label={t("actions.back", { ns: "common" })}
          buttonVisible={backButtonVisible}
          onClick={onBack}
        />
      </div>
    </div>
  );
}
