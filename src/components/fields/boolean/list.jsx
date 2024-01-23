import { ToggleSwitch } from "@/components/generic/toggle-switch";

/**
 * <b>Composant de liste d'un champ de type booléen</b>
 */
export default function BooleanList({
  record,
  fieldLabel,
  fieldMetadata,
  fieldName,
  fieldClassName,
  disabled,
}) {
  return (
    <span>
      <ToggleSwitch
        defaultStatus={record[fieldName]}
        label={""}
        disabled={true}
      />
    </span>
  );
}
