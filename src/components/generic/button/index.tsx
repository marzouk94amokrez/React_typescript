import React from "react";

/**
 * Generic interface for button properties
 */
export interface ButtonProps {
  /** Référence pour référer le composant*/
  ref?: any;
  /** Libellé du bouton */
  label?: any;
  /** Icone du bouton */
  icon?: any;
  /** Classe CSS pour personnaliser l'aspect du bouton en général */
  className?: String;
  /** Classe CSS pour personnaliser l'aspect du libellé du bouton. */
  labelClassName?: String;
  /** Classe CSS pour personnaliser l'aspect de l'icône */
  iconClassName?: String;
  /** Élément fille du composant. */
  children?: any;
  /** Événement clique qui permet d'exécuter l'action du bouton */
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  /** Pour définir le type du composant pour le cas que le composant ne se comporte comme button */
  role?: any;
  /** Propriété en cas d'ajout de props */
  extraProps?: any;
  /** Caractérise si le bouton est visible ou non */
  buttonVisible?: boolean;
  /** Type de bouton */
  type?: any;
}

export const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: "16px",
    borderColor: "var(--button-border-sec)",
    fontSize: "0.9rem",
    alignItems: "center",
    paddingRight: "10px",
    paddingLeft: "10px",
    boxShadow: "none",
    cursor: "pointer",
    "&:hover": {
      background: "var(--button-background-hover)",
    },
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    cursor: "pointer",
    color: "var(--color-princ)",
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none",
  }),
  placeholder: (defaultStyles: any) => {
    return {
      ...defaultStyles,
      color: "var(--color-princ)",
    };
  },
  valueContainer: (provided: any) => ({
    ...provided,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "var(--color-princ)",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    background: "transparent",
    cursor: "pointer",
    borderRadius: "10px",
  }),
};

/** <b>Composant d'affichage principal des boutons générique </b>
 *
 * <li>PrimaryButton</li>
 * <li>SecondaryButton</li>
 * <li>SearchButton</li>
 * <li>CancelButton</li>
 * <li>FilterButton</li>
 */

export function GenericButton({
  ref,
  label,
  icon,
  className,
  labelClassName,
  iconClassName,
  onClick,
  children,
  role,
  extraProps,
  type,
}: ButtonProps) {
  const buttonClasses = [
    "flex flex-row",
    "bg-white",
    "text-[color:var(--color-princ)]",
    "border",
    "cursor-pointer",
    "py-2",
    "px-4",
    "rounded-[16px]",
    "text-[0.9rem]",
    "first-letter:uppercase",
    "hover:bg-[color:var(--button-background-hover)]",
  ];

  return (
    <button
      ref={ref}
      className={`${buttonClasses.join(" ")} ${className ? className : ""}`}
      role={role}
      {...extraProps}
      onClick={onClick}
      type={type}
    >
      {label&&<span className={`pointer-events-none ${labelClassName}`}>{label}</span>}
      {children}
      {icon ? (
        <span className={`inline-block pl-1 ${iconClassName}`}>{icon}</span>
      ) : undefined}
    </button>
  );
}
