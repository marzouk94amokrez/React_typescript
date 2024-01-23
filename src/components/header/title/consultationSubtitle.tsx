import DisplayField from "@/components/fields/displayField";
import { FieldViewType } from "@/components/fields/fieldViewType";
import { ModelField } from "@/api/data/modelField";
import { Model } from "@/api/data/model";

interface ConsultationSubtitleProps {
  /**Objet de modèle à utiliser*/
  model: Model;
  /** Dictionnaire des champs de modèle*/
  modelFields: Map<string, ModelField>;
  /** Enregistrement par défaut à afficher*/
  record?: any;
  /** Tableau contenant le(s) sous-titre(s) */
  subtitles: any;
  /** Tableau contenant le(s) sous-titre(s) additionnel(s) */
  additionalSubtitles: any;
  /** Classe css permettant de modifier l'apparence générale des sous-titres */
  subtitleClassName?: string;
  /** Classe css permettant de modifier l'apparence générale des sous-titres additionnels */
  additionalSubtitleClassName?: string;
  /**Pour pouvoir cacher ou non le(s) sous-titre(s)*/
  subtitleVisible?: boolean;
}

/** <b>Composant permettant d'afficher les sous-titres d'une page de consultation générique</b> */
export const ConsultationSubtitle = ({
  model,
  modelFields,
  record,
  subtitles,
  additionalSubtitles,
  subtitleClassName,
  additionalSubtitleClassName,
  subtitleVisible = true,
}: ConsultationSubtitleProps) => {
  const subtitleClasses = ["text-[var(--color-princ)]", "text-[1.2rem]"];
  const additionalSubtitleClasses = [
    "text-[var(--color-sec)]",
    "text-[0.9rem]",
  ];
  return (
    <>
      {subtitleVisible && Array.isArray(subtitles) ? (
        <div className="flex flex-col">
          {subtitles?.map((field: ModelField, index: number) => (
            <span
              key={`${field?.field_name}.${index}`}
              className={`${subtitleClasses.join(" ")} ${subtitleClassName}`}
            >
              <DisplayField
                key={`${field?.field_name}.${index}`}
                viewType={FieldViewType.CONSULT}
                model={model}
                fieldName={field?.field_name}
                fieldMetadata={field}
                fieldsMetadataMap={modelFields}
                record={record}
                className={subtitleClassName}
                componentClassName={subtitleClassName}
                hideLabel={true}
              />
            </span>
          ))}
          {additionalSubtitles?.map((field: ModelField, index: number) => (
            <span
              key={`${field?.field_name}.${index}`}
              className={`${additionalSubtitleClasses.join(
                " "
              )} ${additionalSubtitleClassName}`}
            >
              <DisplayField
                key={`${field?.field_name}.${index}`}
                viewType={FieldViewType.CONSULT}
                model={model}
                fieldName={field?.field_name}
                fieldMetadata={field}
                fieldsMetadataMap={modelFields}
                record={record}
                className={additionalSubtitleClassName}
                componentClassName={additionalSubtitleClassName}
                hideLabel={true}
              />
            </span>
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
