import { ModelField } from "@/api/data/modelField";
import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";

interface infoBlocProps {
  /** Représente un enregistrement de l'élément du bloc */
  record: any;
  /** Représente les champs d'une modèle */
  modelFields: Map<string, ModelField>;
  /** Vérifie si le bloc est désactivé ou non */
  isInactive?: boolean;
}

/**
 * <b>Composant contenant certains éléments de bloc qui s'affichent dans la zone d'information.</b>
 */
const InfoBloc = ({ modelFields, record, isInactive }: infoBlocProps) => {
  return (
    <div className="inline-grid grid-cols-3">
      {modelFields &&
        Array.from(modelFields.values()).map((field: ModelField) =>
          ["file"].includes(field.type || "") ? (
            <></>
          ) : (
            <span
              key={field.code}
              className={`${
                isInactive ? "text-[var(--bloc-inactive-color)]" : ""
              } text-[var(--color-sec)] text-[0.8rem]`}
            >
              <DisplayField
                fieldMetadata={field}
                fieldLabel={field.code}
                viewType={FieldViewType.LIST}
                record={record}
                fetchedRecord={record}
                fieldName={field.code}
                fieldsMetadataMap={modelFields}
                separatorIndicator={":"}
                disabledLabel={isInactive}
              />
            </span>
          )
        )}
    </div>
  );
};

export default InfoBloc;
