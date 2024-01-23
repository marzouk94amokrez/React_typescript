import { useTranslation } from "react-i18next";
import { ModelField } from "@/api/data/modelField";
import { HandleChange } from "@/components/generic/button/searchButton";
import FilterButton from "@/components/generic/button/filterButton";
import { FilterButtonProps } from "@/components/generic/button/filterButton";
import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Period filter component
 */
interface PeriodFilterProps extends FilterButtonProps, HandleChange {
  /** Sur une période donnée, contenant une date de début et une date de fin */
  period?: any;
  /** Pour pouvoir afficher ou masquer le composant en question */
  periodFilterVisible?: boolean;
}

/**
 * Period filter menu properties
 */
interface PeriodFilterMenuProps extends HandleChange {
  record?: Object;
  field?: ModelField;
  fieldMap?: Map<string, ModelField>;
}

/**
 * Period filter menu component
 */
function PeriodFilterMenu({
  record,
  field,
  fieldMap,
  onChange,
}: PeriodFilterMenuProps) {
  return (
    <DisplayField
      fieldName={field?.code}
      hideLabel={true}
      record={record}
      fetchedRecord={record}
      viewType={FieldViewType.FILTER}
      fieldMetadata={field}
      fieldsMetadataMap={fieldMap}
      onUpdate={(event: any) => {
        const updatedValue = {
          start: event.period.start,
          end: event.period.end,
        };

        if (onChange) {
          onChange(updatedValue);
        }
      }}
    />
  );
}

/**
 * <b>Composant Periode permettant d'effectuer une recherche entre une période donnée indiquant une date de début et une date de fin</b>
 */
export function PeriodFilter({
  period,
  onChange,
  periodFilterVisible = true,
}: PeriodFilterProps) {
  const { t } = useTranslation(["common"]);

  const record = {
    period: {
      start: period?.start || "",
      end: period?.end || "",
    },
  };

  const periodFilterField: ModelField = {
    code: "period",
    type: "datetime",
  };

  const filterMap: Map<string, ModelField> = new Map<string, ModelField>();
  filterMap.set(periodFilterField.code || "", periodFilterField);

  return (
    <>
      {periodFilterVisible ? (
        <FilterButton
          label={t("actions.period", { ns: "common" })}
          overFlowStrategy="visible"
          icon={
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-[var(--color-princ)]"
            />
          }
          component={{
            Menu: (
              <PeriodFilterMenu
                record={record}
                field={periodFilterField}
                fieldMap={filterMap}
                onChange={(e: any) => onChange && onChange(e)}
              />
            ),
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
