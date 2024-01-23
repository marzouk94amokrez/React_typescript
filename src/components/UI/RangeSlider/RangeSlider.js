import { useState } from "react";
import "./RangeSlider.css";
import { Modal } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import Slider from "@mui/material/Slider";
import { useTranslation } from "react-i18next";
import {
  PrimaryBtnOutlineAction,
  CancelBtnOutlineAction,
} from "../../../styles/Common";

function RangeSlider(props) {
  const { t } = useTranslation();
  const {
    value,
    changed,
    show,
    closeModal,
    title,
    defaultVal,
    defaultValStart,
    defaultValEnd,
  } = props;

  const useStyles = makeStyles({
    root: {
      width: 600,
      height: 8,
      color: "#022f67",
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#ea5e0b",
      border: "2px solid currentColor",
      marginTop: 0,
      marginLeft: 0,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  });

  const classes = useStyles();
  const [sliderValue, setSliderValue] = useState([
    defaultValStart,
    defaultValEnd,
  ]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleValidate = (e) => {
    changed(sliderValue[0], sliderValue[1]);
    closeModal();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={closeModal}
        dialogClassName="modal_w_mc"
        contentClassName="modal_w_mc"
      >
        <Modal.Header closeButton>
          <Modal.Title className="slider_title ICDBlue">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="slider__container">
            <div className="slider__body">
              <div className="slider__start">
                <input
                  className="slider__input"
                  style={{ marginBottom: "5px" }}
                  placeholder="De :"
                  onChange={(e) =>
                    setSliderValue([e.target.value, sliderValue[1]])
                  }
                  value={sliderValue[0]}
                  name="start"
                  type="number"
                  step="0.01"
                  autoComplete="off"
                />
              </div>
              <Slider
                defaultValue={[+value("start"), +value("end")]}
                classes={classes}
                value={sliderValue}
                step={0.01}
                min={+defaultVal?.start}
                max={+defaultVal?.end}
                onChange={handleChange}
                valueLabelDisplay="off"
              />
              <div className="slider__end">
                <input
                  className="slider__input"
                  placeholder="À : "
                  onChange={(e) =>
                    setSliderValue([sliderValue[0], e.target.value])
                  }
                  value={sliderValue[1]}
                  name="end"
                  type="number"
                  step="0.01"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <PrimaryBtnOutlineAction
            variant="primary"
            onClick={(e) => handleValidate(e)}
          >
            {t("global:validate", "Valider")}
          </PrimaryBtnOutlineAction>
          <CancelBtnOutlineAction variant="secondary" onClick={props.clicked}>
            {t("default:cancel", "Annuler")}
          </CancelBtnOutlineAction>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RangeSlider;
