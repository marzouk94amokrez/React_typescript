import { faFileSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ZoneTimelineProps {
  /**
   * Toute la liste des status effectués
   */
  listCompletedStatus?: any[];
  /**
   * Toute la liste des status en cours
   */
  listInProgressStatus?: any[];
  /**
   * Toute la liste des status à venir
   */
  listUpcomingStatus?: any[];

  /** Classe css pour personaliser la ZoneTimeline du suivi statatut*/
  className?: any;
}

interface ZoneTimelineBarProps {
  /**
   * Liste en tableau des statuts
   */
  data: any;

  /**
   * Couleur du statut
   */
  statusClassName?: string;
  /**
   * Couleur du statut suivant
   */
  nextClassName?: string;
  /**
   * Vérifier si la bordure est en pointillé ou non
   */
  isBorderDashed?: boolean;

  /** CSS label */
  labelClassName?: any;
}

/**
 * Valeur par défaut de la liste des statuts effectués
 */
const defaultListCompleteStatus = [
  { label: "Demande enregistrée" },
  { label: "En validation" },
  { label: "Décision" },
  { label: "Demande acceptée" },
  { label: "Attente de signature de contrat" },
];

/**
 * Valeur par défaut de la liste des statuts à venir
 */
const defaultListInProgressStatus = [{}];

/**
 * Valeur par défaut de la liste des statuts à venir
 */
const defaultListUpcomingStatus = [{ label: "Référencé " }];

/**
 * Composant permettant d'afficher les barres correspondant aux statuts sous forme d'une ligne de tableau
 */
const DisplayBarZoneTimeline = ({
  data,
  statusClassName,
  nextClassName,
  isBorderDashed = false,
  labelClassName,
}: ZoneTimelineBarProps) => {
  
  function isInWaitingSignature(item: any) {
    if (item.label === "Attente de signature de contrat") {
      return true;
    }
    return false;
  }

  return (
    <ul className={`flex flex-row group/list`}>
      {JSON.stringify(data) !== JSON.stringify([{}]) && data.map((item: any) => (
        <li key={item?.label} className="flex flex-col pt-5 group/item">
          <span
            className={`flex relative items-center group-first:justify-start md:group-first:justify-center justify-center flex-row w-full overflow-hidden`}
          >
            <i className={`absolute h-[4px] w-1/2 left-0 group-first/list:group-first/item:hidden ${statusClassName}`} />
            <i className={`inline-block rounded-full h-[20px] w-[20px] z-10 ${statusClassName}`} />
            <i className={`absolute h-[4px] w-1/2 group-first:w-full md:group-first:w-1/2 right-0 group-last/list:group-last/item:hidden ${statusClassName} ${nextClassName}`} />
          </span>
          <span
            className={`block text-[var(--bleu-secondaire)] text-[0.9rem] mt-2 mx-2 ${labelClassName}`}
          >
            <span className="inline-block mx-auto w-max">
              {item?.label}
              {!isInWaitingSignature(item) ? "" :
                <span className="block mt-4">
                  <button className="border-2 w-full rounded-2xl border-[var(--color-princ)] text-xs flex flex-col items-center shadow-none cursor-pointer" onClick={() => alert("Signer contrat en ligne")}>
                    <FontAwesomeIcon
                      icon={faFileSignature}
                      className="text-[var(--color-princ)] w-6 h-6"
                    />
                    <span className="inline-block text-[var(--color-princ)]">
                      Signer mon contrat <br /> en ligne
                    </span>
                  </button>
                </span>
              }
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
};

/**
 * Composant ZoneTimeline pour afficher tous les statuts effectués, en cours et à venir sous forme de barre
 */
const ZoneTimeline = ({
  listCompletedStatus = defaultListCompleteStatus,
  listInProgressStatus = defaultListInProgressStatus,
  listUpcomingStatus = defaultListUpcomingStatus,
  className,
}: ZoneTimelineProps) => {
  return (
    <div className={`flex flex-row ${className ? className : ''}`}>
      <DisplayBarZoneTimeline
        data={listCompletedStatus}
        statusClassName={"bg-[var(--label-state-done)]"}
        nextClassName={"group-last/item:bg-[var(--label-state-upcoming)]"}
      />
      <DisplayBarZoneTimeline
        data={listInProgressStatus}
        statusClassName={"bg-[var(--label-state-done)]"}
      />
      <DisplayBarZoneTimeline
        data={listUpcomingStatus}
        statusClassName={"bg-[var(--label-state-upcoming)]"}
        labelClassName={`upcoming`}
      />
    </div>
  );
};

export default ZoneTimeline;
