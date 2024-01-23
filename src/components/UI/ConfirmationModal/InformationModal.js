import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { SecondaryBtnOutlineAction } from "../../../styles/Common";

function InformationModal({
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
          <SecondaryBtnOutlineAction
            style={{ fontSize: "1.3rem" }}
            onClick={confirm}
            color="#809FB8"
            border="#809FB8"
          >
            {t("default:conff", "Fermer")}
          </SecondaryBtnOutlineAction>

          {/* <SecondaryBtnOutlineAction style={{fontSize: "1.3rem"}}
                             onClick={cancel}
                              >
                             {t('default:cancel', "Annuler")} 
                </SecondaryBtnOutlineAction> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InformationModal;
