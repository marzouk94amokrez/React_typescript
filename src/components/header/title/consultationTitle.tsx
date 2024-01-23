import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import { useTranslation } from "react-i18next";
import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";

interface ConsultationTitleProps {
  /**
   * Objet de modèle à utiliser
   */
  model: Model;

  /**
   * Liste des champs de modèles
   */
  modelFields: Map<string, ModelField>;

  /**
   * Enregistrement à utiliser pour l'affichage du titre
   */
  record?: any;

  /** Titre de la page */
  title?: ModelField;

  /** Titre additionnel*/

  additionalTitle?: ModelField[];

  /** Classe css permettant de modifier l'apparence générale du composant */
  className?: string;

  /**
   * Flag indiquant si le titre est visible ou pas
   */
  titleVisible?: boolean;
}

/**
 *  <b>Composant permettant d'afficher le titre d'une page de consultation générique</b>
 */
export const ConsultationTitle = ({
  model,
  modelFields,
  record,
  title,
  additionalTitle,
  className,
  titleVisible = true,
}: ConsultationTitleProps) => {
  const { t } = useTranslation();

  const titleClasses = ["text-[var(--color-princ)]", "text-[1.5rem]"];

  return (
    <>
      {titleVisible && model ? (
        <div className={`flex ${titleClasses.join(" ")} ${className}`}>
          <span>{t(`models.${model.code}`, { ns: "common" })}</span>
          <span className="inline-block px-2">:</span>{" "}
          {
            <DisplayField
              viewType={FieldViewType.CONSULT}
              model={model}
              fieldName={title?.field_name}
              fieldMetadata={title}
              fieldsMetadataMap={modelFields}
              record={record}
              className={`${className}`}
              componentClassName={className}
              hideLabel={true}
            />
          }
          {additionalTitle && additionalTitle?.length && (
            <ul className="inline-flex ml-2">
              (
              {additionalTitle.map((field: ModelField, index: number) => (
                <li
                  key={`${field.field_name}.${index}`}
                  className="flex flex-row after:content-['-'] after:px-2 last:after:content-[''] last:after:px-0"
                >
                  <DisplayField
                    key={`${field.field_name}.${index}`}
                    viewType={FieldViewType.CONSULT}
                    model={model}
                    fieldName={field.field_name}
                    fieldMetadata={field}
                    fieldsMetadataMap={modelFields}
                    record={record}
                    className={""}
                    componentClassName={""}
                    hideLabel={true}
                  />
                </li>
              ))}
              )
            </ul>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
