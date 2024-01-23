import { ToggleSwitch } from "@/components/generic/toggle-switch";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import MonovalEdit from "../monoval/edit";

/**
 * <b>Composant d'édition d'un champ de type booléen</b>
 */
export default function BooleanEdit({
  record,
  fieldName,
  fieldMetadata,
  fieldClassName,
  onUpdate,
}) {
  const { t } = useTranslation(["common"]);
  const value = useMemo(() => {
    const r = record || {};
    const v = r[fieldName];

    return v || "";
  }, [record, fieldName]);

  // Construction d'un metadata pour l'edition du boléen
  //const booleanList = useMemo(() => [t("yes"), t("no")], [t]);
  const booleanList = useMemo(() => [{value:1,label:t("yes")}, {value:0,label:t("no")}], [t]);
  // Métadonnées pour le champ
  const boolMetadata = useMemo(
    () => ({
      title_field:"label",
      value_field:"value",
      field: fieldName,
      code: fieldName,
      field_values: booleanList,
    }),
    [fieldName, booleanList]
  );

  // Valeur chaîne du booléen
  const booleanListItem = useMemo(() => {
    return booleanList[value ? 0 : 1];
  }, [value, booleanList]);

  // Enregistrement pour passer le booléen dans la liste
  const boolListRecord = useMemo(
    () => ({
      [fieldName]: booleanListItem,
    }),
    [booleanListItem, fieldName]
  );

  if (fieldMetadata.selector) {
    return (
      <span>
        <ToggleSwitch
          status={value}
          label={""}
          onToggle={(e) => {
            if (e !== value && onUpdate) {
              const patched = {
                [fieldName]: e,
              };
              onUpdate(patched);
            }
          }}
        />
      </span>
    );
  }

  return (
    <div className="flex-wrap">
      <div className={`flex-1 ${fieldClassName ? fieldClassName : ""}`}>
        <MonovalEdit
          record={boolListRecord}
          fieldName={fieldName}
          fieldMetadata={boolMetadata}
          fieldClassName="pr-0 after:hidden"
          onUpdate={(e) => {
            console.log("e", e[fieldName]);
            const patched = {
              [fieldName]:
              e[fieldName].value,
            };

            onUpdate(patched);
          }}
        />
      </div>
    </div>
  );
}
