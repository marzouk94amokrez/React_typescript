import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  PrimaryBtnOutlineAction,
  CancelBtnOutlineAction,
} from "../../../styles/Common";

function ConfirmationModal({
  show,
  modalClosed,
  title,
  message,
  confirm,
  cancel,
}) {
  const { t } = useTranslation();

  return (
    <>
      <Modal show={show} onHide={modalClosed} contentClassName="modal_w_mc">
        <Modal.Header closeButton>
          <Modal.Title className="ICDBlue"> {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="ADMCreationModal__body"
          style={{ width: "650px" }}
        >
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <PrimaryBtnOutlineAction
            style={{ fontSize: "1.3rem" }}
            onClick={confirm}
            color="#809FB8"
            border="#809FB8"
          >
            {t("default:confirm", "Confirmer")}
          </PrimaryBtnOutlineAction>

          <CancelBtnOutlineAction
            style={{ fontSize: "1.3rem" }}
            onClick={cancel}
          >
            {t("default:cancel", "Annuler")}
          </CancelBtnOutlineAction>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
