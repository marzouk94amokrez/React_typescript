import { ButtonProps, GenericButton } from ".";

/** <b>Composant d'affichage du bouton secondaire</b> */
export default function SecondaryButton({
  label,
  icon,
  className,
  buttonVisible = true,
  onClick,
}: ButtonProps) {
  return (
    <>
      {buttonVisible ? (
        <GenericButton
          label={label}
          icon={icon}
          className={`border-[var(--button-border-sec)] ${className}`}
          onClick={onClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}
