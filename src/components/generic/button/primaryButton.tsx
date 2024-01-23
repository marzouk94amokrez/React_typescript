import { GenericButton } from ".";
import { ButtonProps } from ".";

/** <b>Composant d'affichage du bouton principale générique</b> */
export default function PrimaryButton({
  label,
  icon,
  className,
  iconClassName,
  buttonVisible = true,
  type,
  onClick,
}: ButtonProps) {
  return (
    <>
      {buttonVisible ? (
        <GenericButton
          label={label}
          icon={icon}
          className={`border-[var(--color-princ)] ${className}`}
          iconClassName={iconClassName}
          onClick={onClick}
          type={type}
        />
      ) : (
        <></>
      )}
    </>
  );
}
