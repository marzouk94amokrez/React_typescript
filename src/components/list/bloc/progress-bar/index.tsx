import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

interface ProgressBarProps {
 /** Couleur de fond de la barre de progression */
 bgcolor?: string,
 /** Nombre en pourcentage de la barre actuelle  */
 progress?: any ,
 /** Epaisseur de la barre  */
 height?: Number,
 /** Taille de la barre */
 width?: string,
 /** Si le composant en question est desactivé ou non */
 disabled?:boolean,
 /** Vérifie si il existe une erreur ou non */
 flagError?: boolean,
}

/** <b>Composant de barre de progression qui permet de fournir des informations actualisées sur la progression d'un flux de travail ou d'une action </b> */
export const ProgressBar = ({
  bgcolor = "var(--color-sec)",
  progress ,
  height = 15,
  width = "93%",
  disabled = false,
  flagError = false,
}:ProgressBarProps) => {
  const Parentdiv = {
    height: height,
    width: width,
    backgroundColor: "whitesmoke",
    borderRadius: 40,
  } as any;

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: `${(disabled) ? "var(--bloc-inactive-color)" : (flagError && !disabled) ? "var(--label-state-error)" : bgcolor}`,
    borderRadius: 20,
    textAlign: "right",
  } as any;

  let displayProgressBar;
  if (!flagError) {
    displayProgressBar=<div style={Parentdiv}>
      <div style={Childdiv}></div>
    </div>
  }
  else {
    displayProgressBar=<div className="flex items-center space-x-3">
      <div style={Parentdiv}>
        <div style={Childdiv}></div>
      </div>
      <FontAwesomeIcon
        className={`${disabled ? "text-[var(--bloc-inactive-color)]" : "text-[var(--label-state-error)]"}`}
        icon={faExclamationTriangle}
      />
    </div>
  }
  return (
    <>
    {displayProgressBar}
    </>
  );
};
