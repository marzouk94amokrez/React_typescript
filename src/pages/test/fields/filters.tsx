import { ModelField } from "@/api/data/modelField";
import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { useCallback, useState } from "react";

/**
 * Model name for testing
 */
const model = "testmodel";

/**
 * Example of modelfields for testing
 */
const fields: ModelField[] = [
  {
    field: "shorttext",
    code: "shorttext",
    type: "shorttext",
    nature: "",
    order: 0,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
  },
  {
    field: "mediumtext",
    code: "mediumtext",
    type: "mediumtext",
    nature: "",
    order: 1,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
  },
  {
    field: "longtext",
    code: "longtext",
    type: "longtext",
    nature: "",
    order: 2,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
  },
  {
    field: "htmltext",
    code: "htmltext",
    type: "htmltext",
    nature: "",
    order: 3,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
  },
  {
    field: "boolean",
    code: "boolean",
    type: "boolean",
    nature: "",
    order: 4,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
  },
  {
    field: "monoval",
    code: "monoval",
    type: "monoval",
    nature: "",
    order: 5,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
    field_values: ["INITIAL", "ACTIF", "INACTIF", "TERMINE"],
  },
  {
    field: "multival",
    code: "multival",
    type: "multival",
    nature: "",
    order: 6,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
    field_values: ["INITIAL", "ACTIF", "INACTIF", "TERMINE"],
  },
  {
    field: "date",
    code: "date",
    type: "date",
    nature: "",
    order: 6,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
    field_values: undefined,
  },
  {
    field: "datetime",
    code: "datetime",
    type: "datetime",
    nature: "",
    order: 6,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
    field_values: undefined,
  },
  {
    field: "decimal",
    code: "decimal",
    type: "decimal",
    nature: "",
    order: 7,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
    field_values: undefined,
    amount: true,
  },
  {
    field: "integer",
    code: "integer",
    type: "integer",
    nature: "",
    order: 7,
    listable: true,
    viewable: true,
    editable: false,
    mandatory: true,
    controls: "",
    exportable: true,
    field_values: undefined,
    amount: true,
  },
];

/**
 * Example of modelfield map for testing
 */
const fieldsMap: Map<string, ModelField> = new Map<string, ModelField>(
  fields.map((f) => [f.code as string, f])
);

/**
 * Filter Fields test
 * @returns
 */
export default function TestFilterFields(): JSX.Element {
  const [filter, setFilter] = useState({
    shorttext: "SHORTTEXT DEFAULT",
    mediumtext: "MEDIUMTEXT DEFAULT",
    longtext: "NON CONSEILLE D'AFFICHER EN LISTE",
    htmltext: "NON CONSEILLE D'AFFICHER EN LISTE",
    boolean: "1",
    monoval: "INITIAL",
    multival: ["INITIAL", "INACTIF"],
    date: { start: "", end: "" },
    datetime: { start: "", end: "" },
    decimal: { min: "", max: "" },
    integer: { min: "", max: "" },
  });

  const onFilterUpdate = useCallback(
    (value: any) => {
      const updatedFilter = { ...filter, ...value };
      setFilter(updatedFilter);
    },
    [filter]
  );

  return (
    <div>
      <h2 className="my-4 text-lg font-bold text-[color:var(--color-sec)]">
        Filter fields test
      </h2>
      <a href="Test">Test de valeur</a>
      <div className="flex flex-row">
        <div className="flex-none w-[30rem]">
          {Array.from(fieldsMap.values()).map((f) => (
            <div
              key={f.code}
              className={`flex flex-row p-2 odd:bg-slate-50 ${f.code}`}
            >
              <label
                key={`label ${f.code}`}
                className="flex items-center flex-none w-48 px-4 text-sm bg-gray-200 rounded-lg"
              >
                {f.type}
              </label>
              <div key={f.code} className="w-full">
                <DisplayField
                  key={`displayField_${f.code}`}
                  record={filter}
                  fieldName={f.code}
                  fieldLabel={`${model}_${f.code}_label`}
                  hideLabel={true}
                  fetchedRecord={filter}
                  fieldMetadata={f}
                  fieldsMetadataMap={fieldsMap}
                  viewType={FieldViewType.FILTER}
                  onUpdate={onFilterUpdate}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex-auto">{JSON.stringify(filter)}</div>
      </div>
    </div>
  );
}
