import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GenericButton } from "@/components/generic/button";
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";

enum BoutonType {
  Confirm = "confirm",
  Cancel = "cancel",
}
interface ActionProps {
  /** Liste de toutes les actions qu'on peut effectuer au niveau d'un block
   * <br/>
   * comme le Téléchargement, Modification, Suppression.*/
  listAction?: any;
  /** Événement qui exécute la fonction d'action block pour effectuer le téléchargement, la modification ou la suppression. */
  onClickAction?: any;
  /** Vérifie si le block est inactif ou non en fonction de la valeur de statut de l'élément block.*/
  isInactive?: boolean;
  /** Contrôle sur l'exécution des opérations si autorisé ou non selon le profil utilisateur. */
  isAllowed?: boolean;
  /** Vérifie le besoin de confirmation de l'action. */
  needConfirm?: boolean;
}

/**
 *
 */
function ButtonAction({ label, pictos, onClick, isInactive = false }: any) {
  return (
    <>
      <div
        className={`p-2 pictos ${
          isInactive ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={(event) => onClick && onClick(event)}
      >
        {pictos}
      </div>
    </>
  );
}
/**
 * <b>Opération à effectuer au niveau d'un bloc comme le téléchargment,
 * la modification et la suppression d'un élément du bloc.</b>
 *
 */

export function ActionBloc({
  listAction,
  isInactive,
  onClickAction,
}: ActionProps) {
  const [openModal, setOpenModal] = useState(false);
  const { refs, context } = useFloating({
    open: openModal,
    onOpenChange: setOpenModal,
  });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const [currentAction, setCurrentAction] = useState<any>();

  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  function onClickBtnModal(bouton: any) {
    if (bouton === BoutonType.Confirm) {
      onClickAction && onClickAction(currentAction?.value || "");
      setOpenModal(false);
    }
    setOpenModal(false);
  }

  function onActionClicked(action: any) {
    if (!action.needConfirm && !action.needPermission) {
      //allowed and no need confirmation
      return onClickAction && onClickAction(action.value);
    }
    if (action.needConfirm && !action.needPermission) {
      //allowed and need confirmation
      setCurrentAction(action);
      setOpenModal(true);
    }
  }

  const { t } = useTranslation(["common"]);
  const defaultModalTitle = t("messages.deletionPopupTitle", { ns: "common" });
  const defaultContent = t("messages.confirmDeletion", { ns: "common" });
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

  function ModalPopup(
    modalTitle = defaultModalTitle,
    modalContent = defaultContent,
    modalButtons = buttons
  ) {
    return (
      <FloatingPortal>
        {openModal && (
          <FloatingOverlay className="Dialog-overlay">
            <FloatingFocusManager context={context}>
              <div
                className="Dialog"
                ref={refs.setFloating}
                {...getFloatingProps()}
              >
                <div className="flex items-center text-[var(--color-princ)] text-[1.5rem]">
                  <p className="flex-start">{modalTitle}</p>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="ml-auto"
                    onClick={() => setOpenModal(false)}
                  />
                </div>
                <hr className="border-[1px] border-solid text-[var(--colors-secondary-3)] mx-[-16px]" />
                <div className="text-[var(--colors-primary-3)] opacity-100  items-start text-[1rem] w-full border-none outline-none p-4 p-0.375rem 0.75rem">
                  {modalContent}
                </div>
                <hr className="border-[2px] text-[var(--color-sec)] mx-[-16px]" />
                <div className="flex flex-row justify-center mt-3 text-center">
                  {modalButtons &&
                    modalButtons.map((btn: any) => (
                      <span
                        key={btn.type}
                        onClick={() => onClickBtnModal(btn.type)}
                        className="p-1"
                      >
                        <GenericButton
                          label={btn.label}
                          labelClassName={btn.labelClassName}
                          className={btn.className}
                        />
                      </span>
                    ))}
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    );
  }

  return (
    <div className="flex items-center text-[var(--color-princ)]">
      {listAction.map((action: any) => (
        <ButtonAction
          key={action?.value}
          label={action?.value}
          pictos={action?.pictos}
          isInactive={isInactive}
          onClick={() => (isInactive ? "" : onActionClicked(action))}
        />
      ))}
      {ModalPopup()}
    </div>
  );
}
