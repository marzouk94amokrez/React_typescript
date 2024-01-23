import { useTranslation } from "react-i18next";
import { ProgressBar } from "../progress-bar";
import moment from "moment";
import { isValidDate } from "@/api/data/modelHelper";

interface trioDatesProps {
  /** date de création */
  datecreate?: any;
   /** date de démarrage */
  datestart?: any;
   /** date de fin */
  dateend?: any;
   /** vérifie en cas d'erreur */
  flagError?: boolean;
   /** vérifie si le composant en question est desactivé ou non */
  isInactive?: boolean;
}

/** <b>Ce composant est un ensemble de trois dates avec une barre de progression correspondante.</b>
 * Il s'affiche selon les dates obtenues avec des conditions d'affichages
 * <li>Date de création</li>
 * <li>Date de démarrage</li>
 * <li>Date de fin</li>
 * 
*/
const TrioDates = ({
  datecreate,
  datestart,
  dateend,
  flagError = false,
  isInactive,
}: trioDatesProps) => {
  let progress;

  const displayProgressBar = (percentage: number) => {
    return (
      <ProgressBar
        flagError={flagError}
        disabled={isInactive}
        progress={percentage}
      />
    );
  };

  const isInValidDateFormat = (date: any) => {
    let dateformat = date ? new Date(date) : null;
    return typeof date === "undefined" || (!isValidDate(date) && dateformat)
      ? true
      : false;
  };

  const datecreateformat = datecreate ? new Date(datecreate) : null;
  const datestartformat = datestart ? new Date(datestart) : null;
  const dateendformat = dateend ? new Date(dateend) : null;
  const today = new Date();
  const percentageBar = 100;

  if (
    isInValidDateFormat(datecreate) ||
    isInValidDateFormat(datestart) ||
    isInValidDateFormat(dateend)
  ) {
    progress = <></>;
  } else {
    if (
      (datecreateformat && !datestartformat && !dateendformat) ||
      (datecreateformat &&
        datestartformat &&
        !dateendformat &&
        today < datestartformat)
    ) {
      progress = displayProgressBar(percentageBar / 3);
    }
    if (
      datecreateformat &&
      datestartformat &&
      !dateendformat &&
      today > datestartformat
    ) {
      progress = displayProgressBar(percentageBar / 2);
    }
    if (datecreateformat && datestartformat && dateendformat) {
      progress = displayProgressBar(percentageBar);
    }
  }

  const { t } = useTranslation(["common"]);

  return (
    <div className="w-[500px]">
      <p className={`text-[var(--color-sec)] text-[0.8rem] dates`}>
        <span className="mr-[15px]">
          {t("labels.creation", { ns: "common" })}:{" "}
          {datecreate ? moment(datecreate).format("DD/MM/YYYY") : ""}{" "}
        </span>{" "}
        &nbsp;
        <span className="mr-[15px]">
          {t("labels.startup", { ns: "common" })}:{" "}
          {datestart ? moment(datestart).format("DD/MM/YYYY") : ""}
        </span>
        &nbsp;
        <span>
          {t("labels.end", { ns: "common" })}:{" "}
          {dateend ? moment(dateend).format("DD/MM/YYYY") : ""}
        </span>
      </p>
      <div className="pt-[5px] bar ">{progress}</div>
    </div>
  );
};

export default TrioDates;
