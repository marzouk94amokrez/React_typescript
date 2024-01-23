import { useCallback, useMemo, useState } from "react";
import { ModalPopup } from "@/components/generic/modal";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../generic/toggle-switch";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { Link, useOutlet } from "react-router-dom";
import { ListLogHeader } from "@/components/header/buttons/consultationLogHeader";
import DateTimePicker from "react-datetime-picker";

/**
 * <b>Composant de consultation de listes des logs disponibles</b>
 * @returns 
 */
export function ListLogs() {
  const { t } = useTranslation();
  const format = "dd/MM/yyyy";
  const dateFormat = useMemo(
    () =>
      format ||
      `${t("settings.date.dateformat")} ${t("settings.date.timeformat")}`,
    [t, format]
  );
  const listLogs = [
    {
      type: "Serveur d'application",
      description: "Logs du serveur d'application",
      niveau: "DEBUG",
    },
    {
      type: "Authentification",
      description: "Logs du système d'authentification",
      niveau: "ERROR",
    },
    {
      type: "OCR",
      description: "Logs des traitements OCR",
      niveau: "ERROR",
    },
    {
      type: "SAE",
      description: "Logs des échanges avec le coffre-fort",
      niveau: "ERROR",
    },
    {
      type: "Activité",
      description:
        "Logs des activités de la solution(connexion, consultation, modification, suppression, etc)",
      niveau: "ALL",
    },
    {
      type: "Batch",
      description: "Logs des batchs de traietement drivers",
      niveau: "INFO",
    },
  ];

  const [openedModal, setOpenedModal] = useState(false);

  const onConfirm = () => {
    //On récupère la valeur de date et checked ici
    setOpenedModal(false);
  };

  /**
   * Boutons par défaut du popup
   */
  const defaultButtons = [
    {
      type: "confirm",
      label: t("actions.confirm", { ns: "common" }),
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

  const onChange = useCallback((date: any) => {
    setValue(date);
  }, []);

  // Mise en place des boutons
  const [popupButtons, setPopupButtons] = useState(defaultButtons);
  const [value, setValue] = useState(new Date());

  //Checkbox
  //const defaultChecked = checked ? checked : false;
  const [checked, setChecked] = useState(false);

  const outlet = useOutlet();
  if (outlet) {
    return outlet;
  }

  return (
    <div className="flex flex-col w-full ">
      <div className="flex-none">
        <ListLogHeader
          title="Monitoring"
          subtitle="Consultation des logs"
          labelButtonDownload={`${t("actions.donwload_logs", {
            ns: "common",
          })} ...`}
          searchButtonVisible={false}
          backButtonVisible={false}
          onDownloadClicked={() => setOpenedModal(true)}
        />
      </div>
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Niveau d'info global</th>
            </tr>
          </thead>
          <tbody>
            {listLogs.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={"consult"}
                    className="visited:text-[var(--color-default)]"
                  >
                    {item.type}
                  </Link>
                </td>
                <td>{item.description}</td>
                <td>{item.niveau}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalPopup
        modalTitle={`${t("labels.download_logs", { ns: "common" })}`}
        openModal={openedModal}
        handleClose={() => setOpenedModal(false)}
        modalButtons={popupButtons}
        onClickBtn={(command: any) => {
          switch (command) {
            case "confirm":
              onConfirm();
              break;
            case "cancel":
              setOpenedModal(false);
              break;
          }
        }}
      >
        <div>
          {t("actions.donwload_logs", { ns: "common" })} :
          <div className="pt-2">
            <DateTimePicker
              className={`border border-solid rounded-[5px] border-[var(--gris-bleu)] w-full ml-1 text-end text-[var(--gris)]`}
              clearIcon={null}
              onChange={onChange}
              dayPlaceholder="JJ"
              monthPlaceholder="MM"
              yearPlaceholder="YYYY"
              value={value}
              format={dateFormat.replaceAll("D", "d")}
              openWidgetsOnFocus={false}
            />
          </div>
          <div className="flex pt-2 space-x-2 align-center ">
            <ToggleSwitch
              status={checked}
              iconActive={faSquareCheck}
              iconInactive={faSquare}
              iconActiveClassName={
                "text-[color:var(--toggle-alt-active-color)]"
              }
              iconInactiveClassName={
                "border-[0.5px] border-solid border-[var(--toggle-inactive-color)] text-white"
              }
              onToggle={() => {
                setChecked((prev) => !prev);
              }}
            />
            <span>
              Cocher si vous ne souhaitez que les logs de cette journée
            </span>
          </div>
        </div>
        <div></div>
      </ModalPopup>
    </div>
  );
}
