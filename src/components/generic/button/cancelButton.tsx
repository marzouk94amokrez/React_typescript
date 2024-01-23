import { ButtonProps, GenericButton } from ".";

/** <b>Composant d'affichage du bouton d'annulation générique</b> */
export default function CancelButton({
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
          className={`border-red-500 ${className}`}
          labelClassName="text-red-500"
          iconClassName="text-red-500"
          onClick={onClick}
        />
      ) : (
        <></>
      )}
    </>
  );
}
