import { useCallback, useMemo, useState } from "react";
import { ModalPopup } from "@/components/generic/modal";
import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "../generic/toggle-switch";
import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ListLogHeader } from "@/components/header/buttons/consultationLogHeader";
import DateTimePicker from "react-datetime-picker";

/**
 * <b>Composant de consultation de listes des fichiers logs selon le type correspondant classées par: </b>
 * <li>Fichier partiel</li>
 * <li>Fichier entier</li>
 * <li>Tableau</li>
 * @returns 
 */
export function ConsultLogsFiles() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const format = "dd/MM/yyyy";
  const dateFormat = useMemo(
    () =>
      format ||
      `${t("settings.date.dateformat")} ${t("settings.date.timeformat")}`,
    [t, format]
  );

  const fichierPartiel = [
    {
      id: "1",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "2",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "3",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "4",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "5",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "6",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "7",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "8",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "9",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "10",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "11",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "12",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "13",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "14",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "15",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "16",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "17",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "18",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "19",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "20",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "21",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "22",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
  ];

  const fichierEntier = [
    {
      id: "1",
      infos: `127.0.0.1--[01/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "2",
      infos: `127.0.0.1--[02/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "3",
      infos: `127.0.0.1--[02/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "4",
      infos: `127.0.0.1--[03/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "5",
      infos: `127.0.0.1--[03/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "6",
      infos: `127.0.0.1--[04/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "7",
      infos: `127.0.0.1--[04/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "8",
      infos: `127.0.0.1--[05/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "9",
      infos: `127.0.0.1--[05/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "10",
      infos: `127.0.0.1--[06/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "11",
      infos: `127.0.0.1--[06/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "12",
      infos: `127.0.0.1--[07/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "13",
      infos: `127.0.0.1--[07/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "14",
      infos: `127.0.0.1--[08/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "15",
      infos: `127.0.0.1--[08/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "16",
      infos: `127.0.0.1--[09/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "17",
      infos: `127.0.0.1--[09/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "18",
      infos: `127.0.0.1--[10/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "19",
      infos: `127.0.0.1--[11/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "20",
      infos: `127.0.0.1--[12/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "21",
      infos: `127.0.0.1--[12/sep/2022:22:35:28 +0200]"GET/dev/bzg.jspz HTTP/1.1" 404 -`,
    },
    {
      id: "22",
      infos: `127.0.0.1--[13/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
    {
      id: "22",
      infos: `127.0.0.1--[14/sep/2022:22:35:28 +0200]"GET/beta/__san/bov3/js/vue/vue-dev.min.js_vs=B4AA5EOD624R45357GHK HTTP/1.1" 200 15313`,
    },
  ];

  const tableau = [
    {
      timestamp: "15:24:11,502",
      level: "INFO",
      thread: "ICD",
      threadname: "Accesslog",
      message: `GET /dev/bzg.jspzHTTP/1/1" 404 -`,
      color: "#55efc4",
    },
    {
      timestamp: "15:24:11,502",
      level: "WARN",
      thread: "ICD",
      threadname: "Accesslog",
      message: `GET /favicon.ico HTTP/1/1" 404`,
      color: "#FF5733",
    },
    {
      timestamp: "15:24:11,502",
      level: "DEBUG",
      thread: "ICD",
      threadname: "Accesslog",
      message: `GET /beta/bzg.jspzHTTP/1/1" 404 -`,
      color: "#55efc4",
    },
    {
      timestamp: "15:24:11,502",
      level: "INFO",
      thread: "ICD",
      threadname: "Accesslog",
      message: `GET /beta/__san/bov3/css/v11/styles.less?_vs=B4AA5EOD625A946C4921301AHTTP/1/1"200 511868`,
      color: "#55efc4",
    },
    {
      timestamp: "15:24:11,502",
      level: "INFO",
      thread: "ICD",
      threadname: "Accesslog",
      message: `GET /beta/__san/bov3/css/v11/custom-theme/jquery-ui.css?_vs=B4AA5EOD625A946C4921301AHTTP/1/1"200 432118`,
      color: "#55efc4",
    },
  ];

  const [openedModalDownload, setOpenedModalDownload] = useState(false);

  const onConfirm = () => {
    //On récupère la valeur de date et checked ici
    setOpenedModalDownload(false);
  };

  const openSearchGrep = () => {
    alert("open search");
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

  /**
   * Index sélectionné du composant d'onglet
   */
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const titreOnglet = [
    {
      label: "Fichier partiel",
    },
    {
      label: "Fichier entier",
    },
    {
      label: "Mise en forme",
    },
  ];

  const [grepValue, setGrepValue] = useState("");
  const [numberValue, setNumberValue] = useState<Number>();
  const commitSearch = () => {
    console.log(`Grep>>> `, grepValue, `Nombre de lignes>>> `, numberValue);
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="flex-none">
        <ListLogHeader
          title="Logs: Serveur d'application"
          subtitle="09/11/22"
          labelButtonDownload={`${t("actions.donwload", { ns: "common" })}`}
          additionalTitleVisible={true}
          additionalTtile="Chemin physique:C:\tomcat\logs\catalina.2022-09-01\log"
          searchFilterVisible={true}
          onDownloadClicked={() => setOpenedModalDownload(true)}
          onBack={() => navigate(-1)}
          onChangeValueSearch={(e: string) => {
            setGrepValue(e);
          }}
          onChangeNumberValueSearch={(e: Number) => {
            setNumberValue(e);
          }}
          onCommitSearch={() => {
            commitSearch();
          }}
        />
      </div>

      <div className="flex flex-col w-full">
        <ul className="flex flex-row flex-none w-full">
          {titreOnglet.map((item: any, i: any) => (
            <li
              key={`${item.label}_${i}`}
              className={`cursor-pointer mr-[3rem] text-[1.15rem] text-[var(--title-color)] rounded-t-md`}
              onClick={() => {
                setSelectedIndex(i);
              }}
            >
              <span
                className={`flex flex-row  after:content-[' '] after:pb-[0.3rem] `}
              >
                <span
                  className={`${
                    i === selectedIndex
                      ? "border-b-[5px] border-[var(--title-color)]"
                      : "border-b-[5px] border-white"
                  }`}
                >
                  {item.label}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row pt-4 space-x-12">
        {selectedIndex === 0 && (
          <ul>
            {fichierPartiel.map((item: any, i: any) => (
              <li key={i} className="text-[0.9rem]">
                {item.infos}
              </li>
            ))}
          </ul>
        )}
        {selectedIndex === 1 && (
          <ul>
            {fichierEntier.map((item: any, i: any) => (
              <li key={i} className="text-[0.9rem]">
                {item.infos}
              </li>
            ))}
          </ul>
        )}
        {selectedIndex === 2 && (
          <table className="border border-solid border-[var(--gris-bleu)] text-[0.9rem]">
            <thead className="">
              <tr className="">
                <th className="border border-solid border-[var(--gris-bleu)]"></th>
                <th className="border border-solid border-[var(--gris-bleu)] px-2">
                  Timestamp
                </th>
                <th className="border border-solid border-[var(--gris-bleu)] px-2">
                  Level
                </th>
                <th className="border border-solid border-[var(--gris-bleu)] px-2">
                  Thread
                </th>
                <th className="border border-solid border-[var(--gris-bleu)] px-2">
                  Threadname
                </th>
                <th className="border border-solid border-[var(--gris-bleu)] px-2">
                  Message
                </th>
              </tr>
            </thead>
            <tbody>
              {tableau.map((item, index) => (
                <tr key={index} className="">
                  <td
                    className={`border border-solid border-[var(--gris-bleu)] px-2`}
                    style={{ backgroundColor: `${item.color}` }}
                  ></td>
                  <td className="border border-solid border-[var(--gris-bleu)] px-2">
                    {item.timestamp}
                  </td>
                  <td className="border border-solid border-[var(--gris-bleu)] px-2">
                    {item.level}
                  </td>
                  <td className="border border-solid border-[var(--gris-bleu)] px-2">
                    {item.thread}
                  </td>
                  <td className="border border-solid border-[var(--gris-bleu)] px-2">
                    {item.threadname}
                  </td>
                  <td className="border border-solid border-[var(--gris-bleu)] px-2">
                    {item.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ModalPopup
        modalTitle={`${t("labels.download_logs", { ns: "common" })}`}
        openModal={openedModalDownload}
        handleClose={() => setOpenedModalDownload(false)}
        modalButtons={popupButtons}
        onClickBtn={(command: any) => {
          switch (command) {
            case "confirm":
              onConfirm();
              break;
            case "cancel":
              setOpenedModalDownload(false);
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
