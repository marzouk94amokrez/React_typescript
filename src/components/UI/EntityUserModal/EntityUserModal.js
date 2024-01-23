import { useCallback, useEffect, useState } from "react";
import "./EntityUserModal.css";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import Axios from "../../../axios-proas";
import { Modal } from "react-bootstrap";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  PrimaryBtnOutlineAction,
  CancelBtnOutlineAction,
} from "../../../styles/Common";

function EntityUserModal({
  handleClose,
  show,
  addEntitiesUser,
  userEntities,
  entitiesType,
  userRole,
  role,
  authUserId,
}) {
  const [entities, setEntities] = useState([]);
  const [selectedEntities, setSelectedEntities] = useState(
    userEntities ? userEntities : []
  );
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const { t } = useTranslation();

  const getEntitiesList = useCallback(() => {
    let filter = {
      searchQuery: searchQuery,
      type: entitiesType,
    };
    Axios.get("/client//modalEntities", {
      params: filter,
    }).then((res) => {
      setEntities(res.data?.result);
    });
  }, [searchQuery]);

  useEffect(() => {
    getEntitiesList();
  }, [searchQuery]);

  const SelectEntity = (entity) => {
    let entityIndex = selectedEntities.findIndex(
      (row) => row.uid === entity.uid
    );
    let selectedTemp = [...selectedEntities];
    if (entityIndex >= 0) selectedTemp.splice(entityIndex, 1);
    else selectedTemp = [...selectedEntities, entity];
    setSelectedEntities(selectedTemp);
  };

  const selectAllEntities = () => {
    let selectedTemp = [];
    if (selectAll) selectedTemp = entities.map((e) => e);
    setSelectedEntities(selectedTemp);
  };

  useEffect(() => {
    selectAllEntities();
  }, [selectAll]);

  const addClickHandler = () => {
    addEntitiesUser(selectedEntities);
    handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal_w_mc"
        contentClassName="modal_w_mc"
      >
        <Modal.Header closeButton>
          <Modal.Title className="ICDBlue">
            {"Associer la documentation aux " +
              (entitiesType === "supplier" ? "fournisseurs" : "clients")}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="entityUserModal__body"
          style={{ minWidth: "40rem" }}
        >
          <div className="entityUserModal__header">
            <div class=" input-group input-group-sm">
              <input
                type="text"
                class="form-control"
                placeholder={t("masterData:search", "Rechercher")}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery || ""}
              />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">
                  <SearchIcon className="ICDBlue" />{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="entityUserModal_items bg-white">
            <table class="table entityUserModal__table">
              <thead class="thead-light">
                <tr>
                  <th scope="col" style={{ width: "50px" }}>
                    <div
                      className="columnHead__container"
                      style={{ justifyContent: "center" }}
                    >
                      <div className="columnHead__title">
                        <CheckIcon onClick={() => setSelectAll(!selectAll)} />
                      </div>
                    </div>
                  </th>
                  <th scope="col">
                    {t("default:companyName", "Raison sociale")}{" "}
                  </th>
                  <th scope="col">Code</th>
                </tr>
              </thead>
              <tbody>
                {entities?.length > 0 ? (
                  entities.map((entity) => (
                    <tr>
                      <td>
                        <div
                          className="productsModal__itemIcon"
                          onClick={() =>
                            SelectEntity({
                              uid: entity.uid,
                              name: entity.name,
                              new: true,
                            })
                          }
                        >
                          {selectedEntities.some(
                            (row) => row.uid === entity.uid
                          ) ? (
                            <ThumbUpIcon
                              style={{ cursor: "pointer", color: "green" }}
                            />
                          ) : (
                            <AddIcon
                              style={{ cursor: "pointer", color: "blue" }}
                            />
                          )}
                        </div>
                      </td>
                      <td>{entity.name} </td>
                      <td>{entity.code} </td>
                    </tr>
                  ))
                ) : (
                  <div style={{ whiteSpace: "nowrap" }}>
                    {t("mandat:noAgencies", "Aucune entreprise à afficher")}
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <PrimaryBtnOutlineAction
            variant="primary"
            onClick={() => addClickHandler()}
          >
            {t("default:associate", "Associer")}
          </PrimaryBtnOutlineAction>
          <CancelBtnOutlineAction variant="secondary" onClick={handleClose}>
            {t("default:cancel", "Annuler")}
          </CancelBtnOutlineAction>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EntityUserModal);
