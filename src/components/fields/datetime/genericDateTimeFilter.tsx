import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DateTimeRangePicker from "@wojtekmaj/react-datetimerange-picker";
import "@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css";
import {
  faCalendar,
} from "@fortawesome/pro-solid-svg-icons";
import { ModalPopup } from "@/components/generic/modal";
import "./datetime.scss";
import moment from "moment"


interface GenericDateTimeFilterProps {
  /** Nom du champ */
  fieldName?: any;
  /** Valeur du champ */
  record?: any;
  /** Evénement permettant de détecter la valeur du champ saisie  */
  onUpdate?: Function,
  /** Format de la date */
  format?: string,
}

/**
 * <b>Composant de filtre générique d'un champ date et datetime</b>
 */
export function GenericDateTimeFilter({
  fieldName,
  record,
  onUpdate,
  format = "dd/MM/yyyy HH:mm",
}: GenericDateTimeFilterProps) {
  const { t } = useTranslation(["common"]);

  const containerRef = useRef(null);

  const value = useMemo(() => {
    return record[fieldName] || {};
  }, [record, fieldName]);
  const start = useMemo(() => {
    return value && value.start ? new Date(value.start) : ""
  }, [value]);
  const end = useMemo(() => {
    return value && value.end ? new Date(value.end) : "";
  }, [value]);

  const [open, setOpened] = useState(false);
  const buttons = [
    {
      type: "confirm",
      label: t("actions.validate", { ns: "common" }),
      labelClassName: "text-[var(--button-color)]",
      className: "border-[var(--button-border-principal)]",
    },
    {
      type: "cancel",
      label: t("actions.cancel", { ns: "common" }),
      labelClassName: "text-red-500",
      className: "border-red-500",
      iconClassName: "text-red-500 ",
    },
  ];

  const showModal = () => {
    setOpened(true)
  }

  const [openedCalendar, setOpenedCalendar] = useState(true);
  const [valuePeriod, setValuePeriod] = useState([]);
  const datenow = new Date();
  const currentYear = new Date().getFullYear();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const onModalButtonClicked = useCallback((button: any) => {
    if (button === "confirm") {
      const start = moment(valuePeriod && valuePeriod[0]).format("YYYY-MM-DD") as string;
      const end = moment(valuePeriod && valuePeriod[1]).format("YYYY-MM-DD") as string;
      setStartDate(start);
      setEndDate(end);
      if (!onUpdate) {
        return;
      }
      onUpdate({
        [fieldName]: { start, end },
      });
    }
    setOpened(false)
  }, [valuePeriod, fieldName, onUpdate]);


  const presets = [[
    "Ce mois ci",
    () => {
      const firstDateOfMonth = `${moment().startOf('month').format('YYYY-MM-DD')}T00:00:00`;
      const lastDateOfMonth = `${moment().endOf('month').format('YYYY-MM-DD')}T23:59:59`;
      const arrayDate = [];
      arrayDate[0] = firstDateOfMonth;
      arrayDate[1] = lastDateOfMonth;
      setValuePeriod(arrayDate as any)
    }
  ],
  [
    "Le mois dernier",
    () => {
      const firstDayOfPreviousMonth = `${moment(new Date(datenow.getFullYear(), datenow.getMonth() - 1, 1)).format("YYYY-MM-DD")}T00:00:00`;
      const lastDayOfPreviousMonth = `${moment(new Date(datenow.getFullYear(), datenow.getMonth(), 1 - 1)).format("YYYY-MM-DD")}T23:59:59`;
      const arrayDate = [];
      arrayDate[0] = firstDayOfPreviousMonth;
      arrayDate[1] = lastDayOfPreviousMonth;
      setValuePeriod(arrayDate as any)
    }
  ],
  [
    "Cette année",
    () => {
      const firstDayOfYear = `${moment(new Date(currentYear, 0, 1)).format("YYYY-MM-DD")}T00:00:00`;
      const lastDayOfYear = `${moment(new Date(currentYear, 11, 31)).format("YYYY-MM-DD")}T23:59:59`;
      const arrayDate = [];
      arrayDate[0] = firstDayOfYear;
      arrayDate[1] = lastDayOfYear;
      setValuePeriod(arrayDate as any)
    }
  ]
  ]

  return (
    <div className="text-sm text-[var(--color-sec)] w-full">
      <div className="flex flex-col items-center w-full after:content-['\ '] after:w-full cursor-pointer">
        <ul className="divide-y-2 divide-solid" onClick={showModal}>
          <li>
            <span className="flex">De:<input type="text" value={!moment(startDate).isValid() ? "" : moment(startDate).format("YYYY-MM-DD") as string} className={`border-none w-full ml-1 cursor-pointer`} readOnly />
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </li>
          <li>
            <span className="flex">
              <span className="pr-2">A: </span>
              <input type="text" value={!moment(startDate).isValid() ? "" : moment(endDate).format("YYYY-MM-DD") as string} className={`border-none w-full ml-1 cursor-pointer`} readOnly />
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </li>
          <li></li>
        </ul>
      </div>
      <ModalPopup
        modalTitle="Période"
        openModal={open}
        handleClose={() => setOpened(false)}
        modalButtons={buttons}
        onClickBtn={onModalButtonClicked}
      >
        <div className="flex flex-row items-stretch justify-start w-full">
          <div className="block w-1/3">
            <ul className="divide-y divide-solid ">
              {presets.map((element: any) => (
                <li key={element} className="flex items-center px-2 py-2"><button onClick={element[1]}>{element[0]}</button></li>
              ))}
              <li></li>
            </ul>
          </div>
          <div className="flex flex-col w-2/3 pl-4">
            <DateTimeRangePicker
              onChange={setValuePeriod as any}
              value={valuePeriod as any}
              format={format}
              isCalendarOpen={openedCalendar}
              onCalendarClose={() => setOpenedCalendar(true)}
              shouldCloseWidgets={() => !openedCalendar}
              className={"border-red-500"}
              calendarIcon={false}
            />
          </div>
        </div>
      </ModalPopup>

    </div>
  );
}
