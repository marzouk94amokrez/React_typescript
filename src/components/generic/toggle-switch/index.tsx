import { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToggleOff,
  faToggleOn,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface ToggleProps {
  /**
   * Libellé à afficher à coté du composant
   */
  label?: any;
  /**
   * Statut par défaut prise par le composant
   */
  defaultStatus?: boolean;
  /**
   * Status du composant
   */
  status?: boolean;
  /**
   * Classe css permettant de modifier l'apparence générale du composant
   */
  className?: string;
  /**
   * Classe css permettant de modifier le libellé
   */
  labelClassName?: string;
  /**
   * Icone Fontawesome à mettre si la valeur est vraie (true|1)
   */
  iconActive?: IconDefinition;
  /**
   * Icone Fontawesome à mettre si la valeur est fausse (false|0)
   */
  iconInactive?: IconDefinition;
  /**
   * Classe css permettant de personnaliser l'apparence de l'icone
   */
  iconActiveClassName?: string;
  /**
   * Classe css permettant de personnaliser l'apparence de l'icone
   */
  iconInactiveClassName?: string;
  /**
   * Propriété permettant de désactiver le composant
   */
  disabled?: boolean;
  /** Évènement sur changement du composant */
  onToggle?: React.EventHandler<any> | undefined;
  /**
   * Propriété permettant de cacher le toggle
   */
  hiddable?: boolean;
}

/**
 * <b>Composant permettant d'afficher/modifier une valeur booléenne sous forme d'interrupteur à bascule (toggle switch)</b>
 * @returns {ToggleSwitch} Composant ToggleSwitch
 */
export function ToggleSwitch({
  label,
  defaultStatus,
  status,
  className,
  labelClassName,
  iconActive,
  iconInactive,
  iconActiveClassName,
  iconInactiveClassName,
  disabled,
  onToggle,
  hiddable,
}: ToggleProps) {
  /**
   * Toogle status management
   */
  const [currentStatus, setStatus] = useState(defaultStatus || false);
  useEffect(() => {
    if (status !== undefined) {
      setStatus(status as boolean);
    }
  }, [status]);

  function handleClick() {
    if (disabled) {
      return;
    }
    setStatus(!currentStatus);
    if (onToggle) {
      onToggle(!currentStatus);
    }
  }

  /**
   * Check if the component is active
   */
  const isActive = useCallback(() => {
    if (status !== undefined) {
      return status;
    }

    return currentStatus;
  }, [status, currentStatus]);

  return (
    <button onClick={handleClick} className="flex flex-row items-center">
      {isActive() ? (
        <span
          className={`pr-2 text-[var(--toggle-active-color)] ${
            disabled ? "cursor-not-allowed" : "cursor-auto"
          }`}
        >
          {!hiddable ? (
            <FontAwesomeIcon
              icon={iconActive || faToggleOn}
              className={`${iconActiveClassName}`}
            />
          ) : (
            <span className="mr-5"></span>
          )}
        </span>
      ) : (
        <span
          className={`pr-2 text-[var(--toggle-inactive-color)] ${
            disabled ? "cursor-not-allowed" : "cursor-auto"
          }`}
        >
          {!hiddable ? (
            <FontAwesomeIcon
              icon={iconInactive || faToggleOff}
              className={`${iconInactiveClassName || ""}`}
            />
          ) : (
            <span className="mr-5"></span>
          )}
        </span>
      )}
      <span className={`text-[var(--color-sec)] bg-none ${labelClassName}`}>
        {label}
      </span>
    </button>
  );
}
