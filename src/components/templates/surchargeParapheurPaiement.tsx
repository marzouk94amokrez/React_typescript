import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import templatesDictionary from "./templatesDictionary";
import { ModalPopup } from "@/components/generic/modal";
import { ConsultDocument, ConsultDocumentProps } from "./consultDocument";
import { useGetObjectByIdQuery } from "@/store/api";

/**
 * <b>Composant qui affiche le parapheur de paiement</b>
 */
export function SurchargeParapheurPaiement({
  model,
  modelFields,
  modelLayouts,
}: ConsultDocumentProps) {
  const { t } = useTranslation(["common", "invoice"]);
  const { id } = useParams();
  const modelEndpoint = useMemo(() => model.endpoint || "", [model]);

  const {
    data: objectData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetObjectByIdQuery(
    { objectName: modelEndpoint, id },
    { skip: !modelEndpoint || !id }
  );

  /**
   * Enregistrement à afficher
   */
  const record = useMemo(() => {
    return objectData?.data?.records?.at(0);
  }, [objectData]);

  const listCompleteStatus = [
    { label: "Réceptionnée" },
    { label: "A contrôler" },
    { label: "Contrôlée" },
  ];

  const listInProgressStatus = [{ label: "A valider" }];

  const listUpcomingStatus = [
    { label: "A payer" },
    { label: "Attente paiement" },
    { label: "Payée" },
  ];

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

  const valider = { label: "Validée" };
  const reject = [{ label: "Rejetée" }];

  // listCompleteStatus: données venant du serveur
  const [statusCompleted, setStatusCompleted] = useState(listCompleteStatus);
  const [statusInProgressing, setStatusInProgressing] =
    useState(listInProgressStatus);
  const [statusUpcoming, setStatusUpcoming] = useState(listUpcomingStatus);

  // eslint-disable-next-line
  function setStatusOnConfirmValidation() {
    statusCompleted.push(statusInProgressing[0]);
    statusCompleted.push(valider);
    setStatusCompleted(statusCompleted);
    setStatusInProgressing(statusUpcoming.slice(0, 1));
    statusUpcoming.splice(0, 1);
    setStatusUpcoming(statusUpcoming);
  }

  // eslint-disable-next-line
  function setStatusOnConfirmReject() {
    setStatusCompleted(reject);
    setStatusInProgressing([]);
    setStatusUpcoming([]);
  }
  const [open, setOpen] = useState(false);
  function closeModal() {
    setOpen(false);
  }

  enum BoutonType {
    Confirm = "confirm",
    Cancel = "cancel",
  }

  enum ValidationType {
    Accept = "accept",
    Refuse = "refuse",
  }

  // eslint-disable-next-line
  enum PaiementType {
    Espece = "espece",
    Virement = "virement",
  }

  const buttons = [
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

  const subTitleModalClasses = ["text-[var(--color-sec)]"];

  const actionsValidations = [
    {
      value: ValidationType.Accept,
      label: t("label.accept", { ns: "invoice" }),
    },
    {
      value: ValidationType.Refuse,
      label: t("label.refuse", { ns: "invoice" }),
    },
  ];

  const [showMotif, setShowMotif] = useState(false);
  const [commentMandatory, setCommentMandatory] = useState(false);
  const [motifMandatory, setMotifMandatory] = useState(false);
  // eslint-disable-next-line
  const [validation, setValidation] = useState({});
  const [actionValidation, setActionValidation] = useState("");
  const [motif, setMotif] = useState("");
  const [comment, setComment] = useState("");
  const [defaultPropertyComment, setDefaultPropertyComment] = useState(true);

  function onClickBouton(btn: string) {
    setValidation({});
    setActionValidation("");
    setMotif("");
    setComment("");
    setShowMotif(false);
    setCommentMandatory(false);
    if (btn === BoutonType.Confirm) {
      if (actionValidation === null || actionValidation === "") {
        alert(`${t("error_message.action_required", { ns: "invoice" })}`);
      }
      if (actionValidation !== "" || actionValidation !== null) {
        if (motifMandatory) {
          if (motif === "" && comment === "") {
            alert(
              `${t("error_message.reason_comment_required", { ns: "invoice" })}`
            );
          }
          if (motif === "" && comment !== "") {
            alert(`${t("error_message.reason_required", { ns: "invoice" })}`);
          }
          if (comment === "" && motif !== "") {
            alert(`${t("error_message.comment_required", { ns: "invoice" })}`);
          }
        }
        const data = {
          action: actionValidation,
          motif: motif,
          comment: comment,
        };
        setValidation(data);
        if (actionValidation === ValidationType.Accept) {
          //setStatusOnConfirmValidation();
          toast.success("La validation de la facture a bien été confirmée");
        }
        if (actionValidation === ValidationType.Refuse) {
          //setStatusOnConfirmReject();
          toast.success("Le refus de la facture a bien été confirmé");
        }
        setOpen(false);
      }
    }
    if (btn === BoutonType.Cancel) {
      setOpen(false);
    }
  }

  function action() {
    setOpen(true);
  }

  const onChangeAction = useCallback(
    (val: any) => {
      if (val.value === ValidationType.Refuse) {
        setShowMotif(true);
        setCommentMandatory(true);
        setMotifMandatory(true);
      }
      if (val.value === ValidationType.Accept) {
        setShowMotif(false);
        setCommentMandatory(false);
        setMotifMandatory(false);
      }
      setDefaultPropertyComment(false);
      setActionValidation(val.value);
    },
    [ValidationType]
  );

  function onChangeMotif(value: any) {
    setMotif(value);
  }
  const motifs = [
    { value: "numero", label: t("label.refuse_order", { ns: "invoice" }) },
    { value: "quantite", label: t("label.refuse_quantity", { ns: "invoice" }) },
    { value: "article", label: t("label.refuse_article", { ns: "invoice" }) },
    { value: "montant", label: t("label.refuse_amount", { ns: "invoice" }) },
  ];

  function popup() {
    return (
      <div>
        <ModalPopup
          modalTitle={t("modal.title", { ns: "invoice" })}
          openModal={open}
          handleClose={closeModal}
          modalButtons={buttons}
          onClickBtn={onClickBouton}
        >
          <div>
            <span className={`${subTitleModalClasses}`}>
              {t("label.action", { ns: "invoice" })}
            </span>
            <Select
              options={actionsValidations}
              onChange={onChangeAction}
              styles={stylesSelect}
              isSearchable={false}
              placeholder={""}
            />
          </div>
          {showMotif && (
            <div>
              <span className={`${subTitleModalClasses}`}>
                {t("label.cause", { ns: "invoice" })}
              </span>
              <Select
                options={motifs}
                onChange={onChangeMotif}
                styles={stylesSelect}
                isSearchable={false}
                placeholder={""}
              />
            </div>
          )}
          <div>
            <span className={`${subTitleModalClasses}`}>
              {defaultPropertyComment
                ? `${t("label.comment", { ns: "invoice" })}`
                : commentMandatory
                  ? `${t("label.comment", { ns: "invoice" })} (${t(
                    "label.required",
                    { ns: "invoice" }
                  )})`
                  : `${t("label.comment", { ns: "invoice" })} (${t(
                    "label.optional",
                    { ns: "invoice" }
                  )})`}
            </span>
            <textarea
              className={`w-full p-2 rounded-lg border text-[grey]`}
              rows={3}
              onChange={(event) => setComment(event.target.value)}
            ></textarea>
          </div>
        </ModalPopup>
      </div>
    );
  }
  return (
    <>
      <ConsultDocument
        model={model}
        modelFields={modelFields}
        modelLayouts={modelLayouts}
        actionBtn={action}
        listCompletedStatus={listCompleteStatus}
        listInProgressStatus={listInProgressStatus}
        listUpcomingStatus={listUpcomingStatus}
        editButtonVisible={false}
        saveButtonVisible={false}
        deleteButtonVisible={false}
        record={record}
      />
      {popup()}
    </>
  );
}

templatesDictionary.registerTemplate(
  "surcharge_parapheur_paiement",
  SurchargeParapheurPaiement
);
