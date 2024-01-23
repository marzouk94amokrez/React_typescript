// import React, { useCallback, useEffect, useMemo, useState } from 'react'

// import { Button, Modal } from 'react-bootstrap';
// import SearchIcon from '@mui/icons-material/Search';
// // import { getStatusWithKey } from '@/shared/utility';
// import { PrimaryBtnOutlineAction, SecondaryBtnOutlineAction, CancelBtnOutlineAction } from '../@/styles/Common';

// function UsersModal(props) {
//     const { show, modalClosed, confirm, usersList,fields } = props;
//     const [comment, setComment] = useState(null);

//     useEffect(() => {
//     }, [])

//     const getUserRole = (level) => {
//         if (level == 'admin' || level == 'standard') return 'Admin'
//         if (level == 'superAccountant') return 'DAF'
//         if (level == 'accountant') return 'Comptable'
//     }

//     return (
//         <div style={{ width: "700px" }}>
//             <Modal show={show} onHide={modalClosed}  >
//                 <Modal.Header closeButton style={{borderBottom: "1px solid #D9E1E7"}}>
//                     <Modal.Title className="ICDBlue" style={{width: "-webkit-fill-available",textAlign: "center", fontWeight:"normal"}}>
//                         Liste de contacts
//                     </Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body className="ADMCreationModal__body">
//                     <div className=" input-group input-group-sm">
//                         <input
//                             style={{color: "#505050"}}
//                             type="text"
//                             className="form-control"
//                             placeholder="Rechercher ..."
//                             // onChange={(e) => setSearchQuery(e.target.value)}
//                             // value={searchQuery || ''}
//                         />
//                         {/* <div className="input-group-append" >
//                             <span className="input-group-text" id="basic-addon2"><SearchIcon className="ICDBlue" /> </span>
//                         </div> */}
//                     </div>
//                     <div style={{padding: "0px 13px", maxHeight: "200px", height: "200px", overflowY: "auto"}}>
//                         <div className="row tableHeader">
//                             {
//                                 fields?.map(field => {
//                                     return (
//                                         <div style={{fontWeight: "normal"}} className="col-md-3">{field}</div>
//                                     )
//                                 })
//                             }

//                         </div>
//                         {
//                             usersList?.map(user => {
//                                 return (
//                                     <div className="row tableBody">
//                                         {
//                                             fields?.map(field => {
//                                                 return (
//                                                     <div className="col-md-3">{user[field]}</div>
//                                                 )
//                                             })
//                                         }

//                                     </div>

//                                 )

//                             })
//                         }
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer style={{borderTop: "1px solid #D9E1E7"}}>
//                     {/* <PrimaryBtnOutlineAction
//                     variant="primary"
//                     onClick={confirm}
//                     // disabled={statusValue === "LITIGATION" && !comment}
//                 >
//                     Confirmer
//                 </PrimaryBtnOutlineAction> */}
//                     <SecondaryBtnOutlineAction variant="secondary" onClick={modalClosed}>
//                         Retour
//                     </SecondaryBtnOutlineAction>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     )
// }

// export default UsersModal;

import { useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { ModalPopup } from "@/components/generic/modal";
import { useTranslation } from "react-i18next";
import "./UsersModal.css";
import styled from "styled-components";
// import { getStatusWithKey } from '@/shared/utility';
//import {PrimaryBtnOutlineAction, SecondaryBtnOutlineAction, CancelBtnOutlineAction } from '../@/styles/Common';
interface ActionPopupProps {
  record?: any;
  show?: boolean;
  modalClosed?: Function;
  confirm: Function;
  usersList?: any[];
  fields?: any[];
  buttons?: any[];
}

enum BoutonType {
  Confirm = "confirm",
  Cancel = "cancel",
}

function UsersModal({
  show,
  modalClosed,
  confirm,
  usersList,
  fields,
}: ActionPopupProps) {
  const { t } = useTranslation();
  const [comment, setComment] = useState<string | null>(null);
  const defaultButtons = [
    {
      type: BoutonType.Cancel,
      label: t("actions.cancel", { ns: "common" }),
      labelClassName: "{`border-[var(--button-border-sec)]`}",
      className: "{`border-[var(--button-border-sec)] `}",
      iconClassName: "text-red-500 ",
    },
  ];

  const onModalButtonClicked = async (button: any) => {
    if (modalClosed) {
      modalClosed(true);
    }
  };

  const DivInput = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2px;
    border: 1px solid ${({ theme }) => theme.colors.grisBleu};
    border-radius: 4px;
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
    outline: none;

    /* Add more styles as needed */
  `;
  return (
    <ModalPopup
      modalTitle={"Confirmation de relance"}
      openModal={show}
      handleClose={modalClosed}
      modalButtons={defaultButtons}
      onClickBtn={onModalButtonClicked}
    >
      <DivInput>
        <input
          style={{ color: "#505050" }}
          type="text"
          className="text-blue-500"
          placeholder="Rechercher ..."
          // onChange={(e) => setSearchQuery(e.target.value)}
          // value={searchQuery || ''}
        />
        <div>
          <span className="input-group-text" id="basic-addon2">
            <SearchIcon className="text-blue-500" />{" "}
          </span>
        </div>
      </DivInput>
      <div
        style={{
          padding: "0px 13px",
          maxHeight: "200px",
          height: "200px",
          overflowY: "auto",
        }}
      >
        <div
          className="row tableHeader"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {fields?.map((field) => {
            return (
              <div style={{ fontWeight: "normal" }} className="col-md-3">
                {field}
              </div>
            );
          })}
        </div>
        {usersList?.map((user) => {
          return (
            <div
              className="row tableBody"
              style={{ display: "flex", justifyContent: "spaceBetween" }}
            >
              {fields?.map((field) => {
                return <div className="col-md-3">{user[field]}</div>;
              })}
            </div>
          );
        })}
      </div>
    </ModalPopup>
  );
}

export default UsersModal;
