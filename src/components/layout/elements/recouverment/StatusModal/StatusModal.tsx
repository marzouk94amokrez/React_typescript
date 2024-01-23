import { useEffect, useState } from "react";
import "./StatusModal.css";
import { ModalPopup } from "@/components/generic/modal";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
// import { getStatusWithKey } from '@/shared/utility';
interface ActionPopupProps {
  record?: any;
  show?: boolean;
  modalClosed?: Function;
  confirm: Function;
  buttons?: any[];
}

enum BoutonType {
  Confirm = "confirm",
  Cancel = "cancel",
}

function StatusModal({ show, modalClosed, confirm }: ActionPopupProps) {
  const { t } = useTranslation();
  const [comment, setComment] = useState<string | null>(null);
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

  const onModalButtonClicked = async (button: any) => {
    //setSelectedAction({});
    if (button === "confirm") {
      confirm(comment);
    }
    if (modalClosed) {
      modalClosed(true);
    }
  };
  useEffect(() => {}, []);
  const StyledLabel = styled.label`
    color: ${({ theme }) => theme.colors.colorSec};
  `;
  const StyledTextarea = styled.textarea`
    width: 100%;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.gris};
    border-radius: 4px;
    font-size: 16px;
    resize: vertical;
    color: ${({ theme }) => theme.colors.colorDefault};
    background-color: ${({ theme }) => theme.colors.background};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.gris};
    }
  `;

  return (
    <ModalPopup
      modalTitle={"Confirmation de relance"}
      openModal={show}
      handleClose={modalClosed}
      modalButtons={defaultButtons}
      onClickBtn={onModalButtonClicked}
    >
      <div className="statusModal__status_conatiner">
        <p style={{ color: "gray", fontSize: "0.9rem" }}>
          Cette action est définitive.
          <br />
          Veuillez confirmer.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <StyledLabel className="" htmlFor="comment">
          Commentaire (facultatif)
        </StyledLabel>
        <StyledTextarea
          className=""
          id="comment"
          value={comment || ""}
          onChange={(e: any) =>
            setComment(e?.target?.value ? e.target.value : "")
          }
          rows={3}
        ></StyledTextarea>
      </div>
    </ModalPopup>
  );
}

export default StatusModal;
