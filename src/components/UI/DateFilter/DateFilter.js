import DateRange from "../DateRange/DateRange";
import {
  DFContainer,
  DFInterval,
  DFIntervalFrom,
  DFIntervalTo,
  DFIcon,
} from "./DateFilter.styled";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../shared/utility";

function DateFilter({
  modalTitle,
  from,
  to,
  name,
  activeReset,
  resetInterval,
  show,
  showModal,
  closeModal,
  dateChange,
}) {
  const { t } = useTranslation();

  const dateResetClickHandler = () => {
    if (activeReset) resetInterval(name);
  };

  return (
    <DFContainer>
      <DFInterval onClick={() => showModal(name)}>
        <DFIntervalFrom>
          {t("global:from")}
          <span>{from}</span>
        </DFIntervalFrom>
        <DFIntervalTo>
          {t("global:to")}
          <span>{to}</span>
        </DFIntervalTo>
      </DFInterval>
      <DFIcon activeReset={activeReset} onClick={() => dateResetClickHandler()}>
        <CloseIcon />
      </DFIcon>
      <DateRange
        title={modalTitle}
        format={formatDate}
        show={show}
        clicked={closeModal}
        changed={(date) => dateChange(date)}
        field={name}
        reset={resetInterval}
      />
    </DFContainer>
  );
}

export default DateFilter;
