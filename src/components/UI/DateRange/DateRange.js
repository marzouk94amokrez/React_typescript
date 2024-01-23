import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { OverrideStaticRanges } from "./RangesOverride";
import "./DateRange.css";
// import Modal from '../../../../UI/Modal/Modal';
import { Modal } from "react-bootstrap";
import { fr, enGB, de } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import {
  PrimaryBtnOutlineAction,
  CancelBtnOutlineAction,
} from "../../../styles/Common";

function DateRange(props) {
  const newStaticRanges = OverrideStaticRanges;
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: props.field,
  };

  const currentLanguageCode = localStorage.getItem("i18nextLng");
  let locale = fr;
  switch (currentLanguageCode) {
    case "fr":
      locale = fr;
      break;
    case "en":
      locale = enGB;
      break;
    case "de":
      locale = de;
      break;
  }

  function handleSelect(ranges) {
    let selection = ranges[props.field];
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
  }
  const handleApply = (e) => {
    e.preventDefault();
    props.changed({
      startDate: selectionRange.startDate,
      endDate: selectionRange.endDate,
      field: props.field,
    });
    props.clicked();
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.clicked}
        dialogClassName="modal_w_mc"
        contentClassName="modal_w_mc"
      >
        <Modal.Header closeButton>
          <Modal.Title className="dateRangeTitle ICDBlue">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <DateRangePicker
              staticRanges={newStaticRanges}
              inputRanges={[]}
              ranges={[selectionRange]}
              onChange={handleSelect}
              locale={locale}
              rangeColors={["#19629e"]}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <PrimaryBtnOutlineAction
            variant="primary"
            onClick={(e) => handleApply(e)}
          >
            {t("global:validate")}
          </PrimaryBtnOutlineAction>
          <CancelBtnOutlineAction variant="secondary" onClick={props.clicked}>
            {t("default:cancel", "Annuler")}
          </CancelBtnOutlineAction>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DateRange;
