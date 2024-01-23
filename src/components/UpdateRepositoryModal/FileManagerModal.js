import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./FileManagerModal.css";
import { Button, Modal } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
// import { getStatusWithKey } from '@/shared/utility';
import {
  PrimaryBtnOutlineAction,
  SecondaryBtnOutlineAction,
  CancelBtnOutlineAction,
  FormGroup,
  FormLabel,
} from "../../styles/Common";
import DropZone from "./DropZone/DropZone";
import FileUploaderBtn from "../../components/UI/FileUploaderBtn/FileUploaderBtn";
import Checkbox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import GetAppIcon from "@mui/icons-material/GetApp";
import { ModalPopup } from "@/components/generic/modal";
function FileManagerModal(props) {
  const { show, modalClosed } = props;
  const [fields, setFields] = useState(null);

  useEffect(() => {}, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0] && e.target.name === "file") {
      let tmpDoc = {
        formData: e?.target.files[0],
        fileName: e?.target.files[0].name,
        fileType: e?.target.files[0].type,
      };
      setFields(tmpDoc);
    }
  };
  const getUserRole = (level) => {
    if (level == "admin" || level == "standard") return "Admin";
    if (level == "superAccountant") return "DAF";
    if (level == "accountant") return "Comptable";
  };

  return (
    <div style={{ width: "100%" }}>
      <ModalPopup openModal={show} handleClose={modalClosed} modalTitle={" Gestion & mise à jour du référentiel(Fournisseurs)"} className="Repository">
     
        <div style={{ borderBottom: "3px solid #D9E1E7" }} className="ADMCreationModal__body">
          <p style={{ color: "#505050", padding: "4px 0px 7px 9px" }}>
            Ce mode de mise a jour est uniquement compatible avec le fichier de
            référentiel CSV standard . Vous pouvez télécharger sa définition
            vide à travers le lien suivant :{" "}
            <GetAppIcon style={{ color: "#2174B9 " }} />{" "}
            <span style={{ color: "#2174B9 " }}>fichier CSV standard</span>
          </p>
          <div>
            <FormGroup>
              <FileUploaderBtn
                border={true}
                label={true}
                btnLabel="Charger le fichier de mise à jour"
                handleChange={handleFileChange}
                name="file"
              />
              <FormLabel color="#505050">
                {fields?.fileName}{" "}
                {fields?.fileName ? (
                  <CancelIcon style={{ color: "#EE5A5A" }} />
                ) : null}
              </FormLabel>
            </FormGroup>
          </div>

          <div style={{ marginTop: "25px" }}>
            <FormLabel>{"Mode de mise à jour"}</FormLabel>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checkedIcon={<CheckCircleOutlinedIcon />} // Icon to show when the checkbox is checked
                icon={<RadioButtonUncheckedIcon />} // Icon to show when the checkbox is not checked
                checked={true} // Set this to true to show the checked icon, or false for the unchecked icon
                onChange={(e) => console.log(e.target.checked)} // Handle the checkbox state change
              />
              <span style={{ color: "#505050" }}>{"Ajouter et modifier"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checkedIcon={<CheckCircleOutlinedIcon />} // Icon to show when the checkbox is checked
                icon={<RadioButtonUncheckedIcon />} // Icon to show when the checkbox is not checked
                checked={false} // Set this to true to show the checked icon, or false for the unchecked icon
                onChange={(e) => console.log(e.target.checked)} // Handle the checkbox state change
              />
              <span style={{ color: "#505050" }}>
                {"Supprimer et remplacer"}
              </span>
            </div>
          </div>

          {/* <div style={{padding: "0px 3px", maxHeight: "200px", height: "200px"}}>
                        <div className="row">
                            <div className="col-sm-5">Nom</div>
                            <div className="col-sm-4">Type</div>
                            <div className="col-sm-1"></div>
                        </div>
                        {
                            invoiceData?.attachments.map(attachment => {
                                return (
                                    <div className="row">
                                        <div className="col-sm-5">{attachment?.docName}</div>
                                        <div className="col-sm-4">{attachment?.docName}</div>
                                        <div className="col-sm-1"></div>
                                    </div>

                                )

                            })
                        }
                    </div> */}
        </div>
        <div style={{ display:"flex",justifyContent: "center",    marginTop: "10px" }}>
          <PrimaryBtnOutlineAction
            variant="primary"
            onClick={modalClosed}
            // disabled={statusValue === "LITIGATION" && !comment}
          >
            Confirmer
          </PrimaryBtnOutlineAction>
          <CancelBtnOutlineAction variant="secondary" onClick={modalClosed}>
            Annuler
          </CancelBtnOutlineAction>
        </div>
      </ModalPopup>
    </div>
  );
}

export default FileManagerModal;
