import { useCallback, useMemo, useState } from "react";
import { ModalPopup } from "@/components/generic/modal";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../generic/toggle-switch";
import {
  faDownload,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useOutlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListLogHeader } from "@/components/header/buttons/consultationLogHeader";
import DateTimePicker from "react-datetime-picker";

/**
 * <b>Composant de consultation de listes des logs disponibles selon le type correspondant</b>
 * @returns 
 */
export function ConsultLogsDisponibles() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const format = "dd/MM/yyyy";
  const dateFormat = useMemo(
    () =>
      format ||
      `${t("settings.date.dateformat")} ${t("settings.date.timeformat")}`,
    [t, format]
  );

  const listLogsDispo = [
    {
      date: "09/11/22 15:35",
      chemin: "C:\\tomcat\\logs\\cataline.2022-09-01.log",
      taille: "270o",
    },
    {
      date: "08/11/22 22:57",
      chemin: "C:\\tomcat\\logs\\cataline.2022-08-01.log",
      taille: "415o",
    },
    {
      date: "07/11/22 18:12",
      chemin: "C:\\tomcat\\logs\\cataline.2022-07-01.log",
      taille: "316o",
    },
    {
      date: "06/11/22 20:34",
      chemin: "C:\\tomcat\\logs\\cataline.2022-06-01.log",
      taille: "256o",
    },
    {
      date: "05/11/22 21:43",
      chemin: "C:\\tomcat\\logs\\cataline.2022-05-01.log",
      taille: "144o",
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
          title="Logs: Serveur d'application"
          labelButtonDownload={`${t("actions.donwload_logs", {
            ns: "common",
          })} ...`}
          searchButtonVisible={false}
          onDownloadClicked={() => setOpenedModal(true)}
          onBack={() => navigate(-1)}
        />
      </div>
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Date</th>
              <th>Chemin physique</th>
              <th>Taille</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listLogsDispo.map((item, index) => (
              <tr key={index}>
                <td>
                  <Link
                    to={"files"}
                    className="visited:text-[var(--color-default)]"
                  >
                    {item.date}
                  </Link>
                </td>
                <td>{item.chemin}</td>
                <td>{item.taille}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faDownload}
                    className="text-[var(--bleu-icd)]"
                  />
                </td>
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
