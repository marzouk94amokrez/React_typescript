import "./InfoModal.css";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SecondaryBtnOutlineAction } from "../../../styles/Common";

function InfoModal({ handleClose, show, title, content }) {
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="modal_w_mc"
      contentClassName="modal_w_mc"
    >
      {title && (
        <Modal.Header closeButton>
          <Modal.Title className="ICDBlue">{title} </Modal.Title>
        </Modal.Header>
      )}
      {content && (
        <Modal.Body style={{ minWidth: "40rem" }}>{content}</Modal.Body>
      )}
      <Modal.Footer>
        <SecondaryBtnOutlineAction variant="primary" onClick={handleClose}>
          {t("default:close", "Fermer")}
        </SecondaryBtnOutlineAction>
      </Modal.Footer>
    </Modal>
  );
}

export default InfoModal;
