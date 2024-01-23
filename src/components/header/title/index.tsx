interface TitleProps {
  /** Classe css permettant de modifier l'apparence générale du composant */
  className?: string;
  /** Libellé à afficher pour le titre */
  label?: any;
}

/** <b>Composant permettant d'afficher un titre d'une page</b> */
export const Title = ({ className, label }: TitleProps) => {
  const titleClasses = [
    "text-[var(--color-princ)]",
    "text-[1.5rem]",
  ];
  return <p className={`${titleClasses.join(" ")} ${className}`}>{label}</p>;
};

