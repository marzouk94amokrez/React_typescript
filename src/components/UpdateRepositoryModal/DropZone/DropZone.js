
        // let temp = {...invoiceAttachement?.attachments,...invoiceAttachement?.attachments[i], type: e.target.value
        //             }
       
import React, { useEffect, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css"
import PublishIcon from '@mui/icons-material/Publish';
import CancelIcon from '@mui/icons-material/Cancel';

function Dropzone({ onDrop, accept, open,  invoiceAttachement,deleteAttachment, setInvoiceAttachement }) {
const [value, setValue] = useState("PF")
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        accept,
        onDrop
    });

    // console.log(invoiceAttachement)
    // const [filesJSX, setFilesJSX] = useState()
    // let jsx = null
    // useEffect(() => {
    //     console.log(invoiceAttachement)
    // }, [invoiceAttachement])
 
    const checkDocumentsType=(e,i)=>{
        const name = e.target.name
        const value = e.target.value
        let temp = invoiceAttachement?.attachments
        temp[i].family = value
        // let k=invoice
        //    achement.attachments,[i]=k,family= value]           
        setInvoiceAttachement({...invoiceAttachement,
            attachments: temp
        }
        )
      }
    return (
        <div className="dropzoneContent">
            
            <div style={{borderBottom: "2px dashed #809FB8", paddingBottom: "9px"}} {...getRootProps({ className: "dropzone" })}>
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

            {
                <>
                    <p style={{color:"#809FB8", padding: "13px 0px 7px 9px"}}>Liste des fichiers</p>
                    {invoiceAttachement?.attachments?.length > 0 && 
                        <div style={{ padding:"4px 0px 7px 9px"}}>
                            <div style={{width: '100%', display: 'flex', padding:"0px 0px 3px 0px"}}>
                                <div style={{width: '60%', fontSize:"0.9rem", color:"#809FB8", fontWeight:"bold"}}>Nom</div>
                                <div style={{width: '50%', fontSize:"0.9rem", color:"#809FB8", fontWeight:"bold"}}>Type</div>
                                <div style={{width: '10%', fontSize:"0.9rem", color:"#809FB8", fontWeight:"bold"}}></div>
                            </div>
                            {invoiceAttachement?.attachments.map((file, index) => (

                                <div key={file?.path} style={{width: '100%', display: 'flex'}}>
                                    <div style={{width: '60%', fontSize:"0.9rem", color:"#505050"}}>
                                        {/* <AttachFileIcon style={{ fontSize: '16px', color: "#809FB8", marginRight: "7px" }} /> */}
                                        <span>{file?.name || file?.docName}</span>
                                    </div>
                                    <div style={{width: '50%'}}>
                                        <select
                                            style={{
                                                fontSize: "0.9rem",
                                                padding: "3px"}}
                                                className="selectForm"
                                                name="family"
                                                onChange={e => checkDocumentsType(e, index)}
                                                value={file?.family}
                                        >
                                            {/* <option value="" key={0}>--- Selectionner un type ---</option> */}
                                            <option value="PF" key={1}>Preuves de facturation</option>
                                            <option value="PC" key={2}>Preuve de commande</option>
                                            <option value="PL" key={3}>Preuves de livraison</option>
                                        </select>

                                    </div>
                                    <div style={{width: '10%'}}>
                                        <CancelIcon onClick={e => deleteAttachment(index,file)} style={{ color: "#EE5A5A", cursor: "pointer", fontSize: "20px" }} />
                                    </div>

                                </div>
                            ))
                            }
                        </div>
                    }
                </>
            }

        </div>
    );
}


export default Dropzone;