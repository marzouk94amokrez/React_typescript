import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import equal from "fast-deep-equal";
import copy from "fast-copy";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { LayoutElement } from "@/api/data/layoutElement";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { ModalPopup } from "@/components/generic/modal";
import { LayoutElementDisplay } from "@/components/layout/elements/layoutElementDisplay";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { OBJECTS_ID_FIELD } from "@/utils/const";
import { useHttp } from "@/utils/httpClient";
import { useLogger } from "@/utils/loggerService";
import { replaceVariables } from "@/utils/funcs";

/**
 * Propriétés du popup action
 */
interface ActionPopupProps {
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
  * Vérifie si le modal est ouvert
  */
  opened?: boolean;
  /**
 * Fonction executée lors de la fermeture de la fenêtre modale
 */
  closeModal?: Function;
  /**
 *Liste des boutons dans la fenêtre modale
 */
  buttons?: any[];
}

enum BoutonType {
  Confirm = "confirm",
  Cancel = "cancel",
}

const stylesSelect = {
  container: (base: any) => ({
    ...base,
    width: "100%",
  }),

  control: (base: any, state: any) => ({
    ...base,
    background: "transparent",
    boxShadow: state.isFocused ? null : null,
    cursor: "pointer",
  }),

  clearIndicator: (base: any) => ({
    ...base,
    color: "var(--color-sec)",
  }),

  dropdownIndicator: (base: any) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    color: "var(--color-sec)",
  }),

  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),

  valueContainer: (provided: any) => ({
    ...provided,
    minHeight: 20,
    paddingTop: 0,
    background: "transparent",
    paddingLeft: 0,
  }),

  singleValue: (provided: any) => ({
    ...provided,
    color: "grey",
  }),

  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "grey",
    };
  },

  option: (provided: any) => ({
    ...provided,
    background: "transparent",
    color: "grey",
    cursor: "pointer",
    paddingBottom: "1px",
  }),

  menu: (base: any) => ({
    ...base,
    borderRadius: "4px",
    display: "flex",
    minWidth: "100%",
  }),
};

/**
 * <b>Composant de gestion des popup des actions</b>
 * @returns
 */
export default function ActionPopup({
  model,
  modelFields,
  record,
  layoutActions,
  opened: modalOpened,
  closeModal,
  buttons,
}: ActionPopupProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { http } = useHttp();
  const { logger } = useLogger();

  // Contrôle de la visibilité du modal depuis l'exterieur
  const [opened, setOpened] = useState(modalOpened);
  useEffect(() => {
    setOpened(modalOpened);
  }, [modalOpened]);

  /**
   * Boutons par défaut du popup
   */
  const defaultButtons = [
    {
      type: BoutonType.Confirm,
      label: t("actions.confirm", { ns: "common" }),
      labelClassName: "text-[var(--button-color)]",
      className: "border-[var(--button-border-principal)]",
    },
    {
      type: BoutonType.Cancel,
      label: t("actions.cancel", { ns: "common" }),
      labelClassName: "text-red-500",
      className: "border-red-500",
      iconClassName: "text-red-500 ",
    },
  ];

  // Mise en place des boutons
  const [popupButtons, setPopupButtons] = useState(defaultButtons);
  useEffect(() => {
    setPopupButtons(buttons ? buttons : defaultButtons);
  }, [buttons]);

  const [actions, setActions] = useState<any[]>([]);
  const [selectedAction, setSelectedAction] = useState<any>();
  useEffect(() => {
    if (!layoutActions) {
      return;
    }

    const list = layoutActions.list || {};
    const conditions = layoutActions.conditions || [];

    const actionsMap = new Map<string, any>();
    conditions.forEach((condition: any) => {
      if (!condition.action || !list[condition.action]) {
        return;
      }

      // validation droit
      const hasAccess = true; // check (condition.rights)
      if (!hasAccess) {
        return;
      }

      const recordIsCorrect = true; // Check (condition.fields, record)
      if (!recordIsCorrect) {
        return;
      }

      actionsMap.set(condition.action, {
        ...list[condition.action],
        key: condition.action,
      });
    });

    const actionsList = Array.from(actionsMap.values()).map((item) => {
      return { ...item, value: item.key, label: item.label };
    });
    setActions(actionsList);
  }, [layoutActions]);

  /**
   * Gestionnaire de la sélection d'une action
   */
  const [actionParams, setActionParams] = useState<any>();
  const [actionFieldsMap, setActionFieldsMap] =
    useState<Map<string, ModelField>>();
  const [actionLayout, setActionLayout] = useState<LayoutElement[]>();
  const [actionModel, setActionModel] = useState<Model>();

  const onActionSelected = (action: any) => {
    setSelectedAction(action);
  };

  useEffect(() => {
    const action = selectedAction || {};

    const structure = action.structure || [];
    const fieldsMap = new Map<string, ModelField>(
      structure.map((field: any) => {
        return [
          field.field_name,
          { ...field, field: field.field_name, type: field.field_type },
        ];
      })
    );
    setActionFieldsMap(fieldsMap);

    const popupLayout = action.elements ? action.elements : [];
    setActionLayout(popupLayout);

    setActionModel({
      table: "",
      code: "",
      screens: { list: {}, consult: popupLayout, edit: popupLayout },
      structure: Array.from(fieldsMap.values()),
    });

    // Create empty record
    setActionParams({});
  }, [selectedAction]);

  /**
   * Mise à jour de l'enregistrement en fonction des champs mis à jour
   */
  const onActionParamsUpdate = useCallback(
    (patch: any) => {
      const patchedRecord: any = copy(actionParams);

      for (const field in patch) {
        patchedRecord[field] = patch[field];
      }

      if (!equal(patchedRecord, actionParams)) {
        setActionParams(patchedRecord);
      }
    },
    [actionParams]
  );

  /**
   * Gestionnaire du click sur les actions
   */
  const onModalButtonClicked = async (button: any) => {
    // setSelectedAction({});
    if (button === "confirm" && selectedAction) {
      //
      if (selectedAction.type === "screen" && selectedAction.screen) {
        return navigate(
          `/${model.endpoint}/${selectedAction.screen}/${record[OBJECTS_ID_FIELD]}`
        );
      }

      // Actions vers endpoint
      if (selectedAction && selectedAction.endpoint) {
        try {
          const endpoint = replaceVariables(
            selectedAction.endpoint,
            record,
          ) || '';
          // TODO : Gestion methode et réponse
          switch (selectedAction.method) {
            default:
              const response = await http.post(endpoint, {
                action: selectedAction.key,
                params: actionParams,
              });
              logger.debug("ACTION CALL: ", response);
              toast.success(`ACTION ${selectedAction?.key}`);
          }
          closeModal && closeModal(true);
        } catch (exception) {
          toast.success(`ACTION ${exception}`);
          logger.log(exception);
        }
      }
    }

    // Cancel
    if (closeModal) {
      closeModal(true);
    } else {
      setOpened(false);
    }
  };

  return (
    <>
      <ModalPopup
        modalTitle={t("modal.title", { ns: "invoice" })}
        openModal={opened}
        handleClose={closeModal}
        modalButtons={popupButtons}
        onClickBtn={onModalButtonClicked}
      >
        <div>
          <span className={`text-[var(--color-sec)]`}>
            {t("label.action", { ns: "invoice" })}
          </span>
          <Select
            options={actions}
            onChange={onActionSelected}
            styles={stylesSelect}
            isSearchable={false}
            placeholder={""}
          />
        </div>
        <div>
          {actionParams && actionModel && actionLayout && actionFieldsMap && (
            <LayoutElementDisplay
              model={actionModel}
              modelFields={actionFieldsMap}
              viewType={FieldViewType.EDIT}
              layouts={actionLayout}
              record={actionParams}
              fetchedRecord={actionParams}
              fieldClassName={""}
              onUpdate={onActionParamsUpdate}
            />
          )}
        </div>
      </ModalPopup>
    </>
  );
}
