import { ButtonProps, GenericButton } from ".";

/**
 * Interface for a component that can handle change
 */
export interface HandleChange {
  /** Fonction du composant pour gérer le changement */
  onChange?: Function;
}

/**
 * Interface for a component that has a placeholder
 */
export interface HasPlaceHolder {
  /** Libellé texte pour le bouton recherche  */
  placeholder?: any;
}

export interface HasValue {
  /** Valeur du texte saisi */
  value?: any;
}

export interface SearchButtonProps
  extends ButtonProps,
    HandleChange,
    HasValue,
    HasPlaceHolder {
  /** Contrôle si le bouton de recherche est visible ou non */
  searchButtonVisible?: boolean;
  inputClassName?: string;
}
/** <b>Composant d'affichage du bouton de recherche générique</b> */
export default function SearchButton({
  icon,
  className,
  placeholder,
  labelClassName,
  value,
  onChange,
  searchButtonVisible = true,
  inputClassName,
  onClick,
}: SearchButtonProps) {
  let displaySearchButton = <></>;

  if (searchButtonVisible)
    displaySearchButton = (
      <GenericButton
        className={`border-[var(--button-border-sec)] ${className}`}
        icon={icon}
        onClick={onClick}
      >
        {placeholder ? (
          <span className={`${labelClassName}`}>
            <input
              type="texte"
              onChange={(params) => {
                if (onChange) onChange(params);
              }}
              placeholder={placeholder}
              className={` placeholder:italic  placeholder-[color:var(--color-princ)] hover:border-none bg-transparent outline-none ${inputClassName}`}
              value={value}
            />
          </span>
        ) : undefined}
      </GenericButton>
    );
  return <>{displaySearchButton}</>;
}
