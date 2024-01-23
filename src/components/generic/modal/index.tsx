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
import "./modal.scss";
import { GenericButton } from "@/components/generic/button";

export interface ModalPopupProps {
  /** Titre de la fenêtre modale */
  modalTitle: string;
  /** Contenu de la fenêtre */
  children?: any;
  /** Booléen qui indique si la fenêtre est ouverte */
  openModal?: boolean;
  /** Function appelée pour la fermeture de la fenêtre*/
  handleClose: any;
  /** Boutons d'action disponible */
  modalButtons: any;
  /** Évènement sur clic d'un bouton */
  onClickBtn: any;
}

/** <b>Composant qui affiche un popup modal.</b> */
export function ModalPopup({
  modalTitle,
  children,
  openModal,
  handleClose,
  modalButtons,
  onClickBtn,
}: ModalPopupProps) {
  const { refs, context } = useFloating({
    open: openModal,
    onOpenChange: handleClose,
  });
  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  function onClickBtnModal(bouton: string) {
    onClickBtn && onClickBtn(bouton);
  }

  return (
    <FloatingPortal>
      {openModal && (
        <FloatingOverlay className={`Dialog-overlay`}>
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
                  className="ml-auto cursor-pointer"
                  onClick={handleClose}
                />
              </div>
              <hr className="border-[1px] border-solid text-[var(--colors-secondary-3)] mx-[-16px]" />
              <div className="text-[var(--colors-primary-3)] opacity-100  items-start text-[1rem] w-full border-none outline-none p-4 p-0.375rem 0.75rem">
                {children}
              </div>
              <hr className="border-[1px] text-[var(--color-sec)] mx-[-16px]" />
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
