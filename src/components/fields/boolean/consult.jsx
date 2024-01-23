import { ToggleSwitch } from "@/components/generic/toggle-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";


/**
 * <b>Composant de consultation d'un champ de type booléen</b>
 */
export default function BooleanConsult({
  record,
  fieldName,
  fieldMetadata }) {
  const { t } = useTranslation(["common"]);

  const value = useMemo(() => {
    const r = record || {};
    const v = r[fieldName];

    return v || "";
  }, [record, fieldName]);

  if (fieldMetadata.selector) {
    return (
      <span>
        <ToggleSwitch defaultStatus={value} label={""} disabled={true} />
      </span>
    );
  }

  if (fieldMetadata.marker) {
    const values = fieldMetadata.field_values || [];
    const icon = value ? values[0] || "" : values[1] || "";
    if (!icon) {
      return <></>;
    }
    return (
      <span>
        <FontAwesomeIcon
          icon={icon}
          className={`${value ? "" : "text-[red]"}`}
        />
      </span>
    );
  }

  return <span>{value ? t("yes") : t("no")}</span>;
}
