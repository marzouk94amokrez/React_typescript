import { useDropzone } from "react-dropzone";
<<<<<<< HEAD
import "./DropZone.css";
import PublishIcon from "@mui/icons-material/Publish";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {
  FormSelect,
  FormLabel,
  FormECListContainerAccountRequest,
} from "@/styles/Common";
import CancelIcon from "@mui/icons-material/Cancel";
=======
import "./DropZone.css"
import PublishIcon from '@mui/icons-material/Publish';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CancelIcon from '@mui/icons-material/Cancel';
>>>>>>> a90293070b47a0287270652dbda5d2b1929a3e9d

function Dropzone({
  onDrop,
  accept,
  open,
  checkDocumentsType,
  entity,
  deleteAttachment,
}) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      onDrop,
    });

  // const [filesJSX, setFilesJSX] = useState()
  // let jsx = null
  // useEffect(() => {
  //     console.log(entity.attachments)
  //     console.log("heyyyyyyyyyyyyyyy")
  // }, [])

  return (
    <div className="dropzoneContent">
      {
        <div>
          {entity?.attachments.map((file, index) => (
            <div key={file?.path} className="documentsListContainer">
              <div>
                <AttachFileIcon
                  style={{
                    fontSize: "16px",
                    color: "#809FB8",
                    marginRight: "7px",
                  }}
                />
                <span style={{ color: "#2174B9" }}>{file.name}</span>
              </div>
              <select
                style={{
                  border: "1px solid #809fb866",
                  fontSize: "0.7rem",
                  borderRadius: "3px",
                  padding: "3px",
                }}
                className="selectForm"
                name="family"
                onChange={(e) => checkDocumentsType(e, index)}
                value={file?.docType}
              >
                <option value="" key={0}>
                  --- Selectionner un type ---
                </option>
                <option value="KBIS" key={1}>
                  Justificatif d’Immatriculation KBIS
                </option>
                <option value="URSSAF" key={2}>
                  Attestation sociale de vigilance URSSAF
                </option>
                <option value="INSURANCE" key={3}>
                  Attestation d'assurance
                </option>
                <option value="IBAN" key={4}>
                  RIB
                </option>
                <option value="FOREIGN" key={5}>
                  Liste des salariés étrangers soumis à autorisation de travail
                </option>
              </select>
              <CancelIcon
                onClick={(e) => deleteAttachment(index)}
                style={{
                  color: "#EE5A5A",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              />
            </div>
          ))}
        </div>
      }
      <div {...getRootProps({ className: "dropzone" })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          {/* {isDragActive ? () : () */}
          <p className="dropzone-content">
            <PublishIcon />
            Déposez vos fichiers ou cliquez pour sélectionner vos fichiers
          </p>
          {/* )} */}
          {/* <button type="button" onClick={open} className="btn">
                        Click to select files
                    </button> */}
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
=======

>>>>>>> a90293070b47a0287270652dbda5d2b1929a3e9d
export default Dropzone;
