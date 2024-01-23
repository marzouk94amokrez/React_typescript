import { useState } from 'react';
import './EntitiesComponent.css';
import EntityUserModal from '../EntityUserModal/EntityUserModal';
import BusinessIcon from '@mui/icons-material/Business';
import CloseIcon from '@mui/icons-material/Close';


function EntitiesComponent({ show, label, radioName, radioValue, radioGender, onChangeRadio, entities, deleteEntity, addEntity, entitiesType, userType, userUid }) {
  const [showEntityModal, setShowEntityModal] = useState(false);

  return (
    <div className="entitiesComponent__container" style={{ display: show ? "block" : "none" }}>
      <div className="entitiesComponent__entitiesList_header">
        <label for="last_name">{label}</label>
        {
          userType === "owner" ? (
            <div className="entitiesList_header_radiosContainer">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name={radioName}
                  id={`${radioName}F`}
                  checked={radioValue != "1"}
                  value="0"
                  onChange={(e) => onChangeRadio(radioName, e.target.value)}
                />
                <label className="form-check-label" for={`${radioName}F`}>Sélection</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name={radioName}
                  id={`${radioName}T`}
                  checked={radioValue == "1"}
                  value="1"
                  onChange={(e) => onChangeRadio(radioName, e.target.value)}
                />
                <label className="form-check-label" for={`${radioName}T`}>
                  {
                    radioGender === "M" ? "Tous" : "Toutes"
                  }
                </label>
              </div>
            </div>
          ) : null
        }
      </div>
      {
        <>
          <div className="entitiesComponent__entitiesList_container">
            {
              entities?.length > 0 ? entities.map(entity => (
                <div className="entitiesComponent_pillElement_container" key={entity.uid}>
                  <div className="entitiesComponent__pillElement_infos">
                    <BusinessIcon className="entitiesComponent__pillElement_icon" fontSize="small" />
                    <div className="entitiesComponent__pillElement_label">{entity.name}</div>
                  </div>
                  {
                    !userUid ? (
                      <CloseIcon style={{ color: "red", cursor: "pointer" }} fontSize="small" onClick={() => deleteEntity(entity)} />
                    ) : null
                  }

                </div>
              )) : null
            }
          </div>
          <div className="entitiesComponent__entitiesList_addBtn">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowEntityModal(true)}
            >
              Ajouter
            </button>
          </div>
        </>
      }
      {showEntityModal ? (
        <EntityUserModal
          handleClose={() => setShowEntityModal(false)}
          show={showEntityModal}
          addEntitiesUser={addEntity}
          userEntities={entities}
          entitiesType={entitiesType}
        />
      ) : null}
    </div>
  )
}

export default EntitiesComponent
