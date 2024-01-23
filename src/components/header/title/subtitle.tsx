interface SubtitleProps {
  /** Classe css permettant de modifier l'apparence générale du composant */
  className?: string;
  /** Libellé à afficher pour le sous-titre */
  label?: any;
}

/** <b>Composant permettant d'afficher un sous-titre d'une page </b>*/
export const Subtitle = ({ className, label }: SubtitleProps) => {
  const subtitleClasses = [
    "text-[var(--color-sec)]",
    "text-[1.2rem]",
  ];
  return <p className={`${subtitleClasses.join(" ")} ${className}`}>{label}</p>;
};
