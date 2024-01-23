// Component to show a field for display (view, edit & list)
import React, { RefObject, useRef } from "react";
import { useOutsideAlerter } from "@/utils/outsideAlerter";
import { DisplayFieldProps } from "./displayFieldProps";
import fieldsDictionary from "./fieldsDictionary";
import "./fields";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FieldViewType } from "./fieldViewType";
import { useLogger } from "@/utils/loggerService";
import { useTranslation } from "react-i18next";

/**
 * <b>Composant qui utilise la bibliothèque de champs pour transmettre le rendu au champ approprié avec tous ses paramètres.</b>
 *
 * @description This component uses the field library to pass the rendering to the appropriate field with all its parameters.
 *
 * @param {DisplayFieldProps} props
 * @returns
 */
export default function DisplayField({
  model,
  fieldName,
  fieldLabel,
  viewType,
  fieldMetadata,
  fieldsMetadataMap,
  record,
  fetchedRecord,
  onBlur,
  onFocus,
  onUpdate,
  className,
  fieldClassName,
  hideLabel,
  labelClassName,
  disabled,
  disabledLabel,
  separatorIndicator,
  validations,
  componentClassName,
  isExternal,
}: DisplayFieldProps) {
  const { logger } = useLogger();
  const { t } = useTranslation(['common', model?.code as string]);

  const fieldType = fieldMetadata?.type;

  const fieldComponent = fieldsDictionary.getField(viewType, fieldType || "");
  const componentRef: RefObject<HTMLDivElement> = useRef(null);
  useOutsideAlerter(componentRef, onBlur);

  if (fieldName && !fieldType) {
    logger.error(
      `[FIELD] - Pas de type de champ renseigné pour le champ ${fieldName} de l'objet ${model?.code}`
    );
  }

  if (fieldComponent !== undefined) {
    logger.debug(
      `[FIELD] - Utilisation du composant ${fieldComponent.name} pour afficher le champ ${fieldName}(${fieldType}) de la vue ${viewType}`
    );

    return (
      <div className="flex flex-col">
        <div
        style={[FieldViewType.EDIT,FieldViewType.CONSULT].includes(viewType)?{borderBottom: "2px solid #f5fbff"}:{}}
          ref={componentRef}
          className={`flex flex-row flex-wrap items-center ${className || ""} `}
        > 
          {!hideLabel && (
            <label 
              className={`first-letter:capitalize ${labelClassName || ""} ${
                disabledLabel
                  ? "text-[color:var(--label-disabled-color)]"
                  : "text-[color:var(--color-sec)]"
              } `}
              htmlFor={fieldName}
            >
              {!isExternal&&t(`fields.${fieldLabel}`, { ns: [model?.code as string] })}
              {viewType === FieldViewType.EDIT &&
                fieldMetadata &&
                fieldMetadata?.mandatory && <span className="ml-1">*</span>}
              {fieldMetadata?.description && (
                <span className="relative inline-block group">
                  <span className="p-2">
                    <FontAwesomeIcon icon={faInfoCircle} />
                  </span>
                  <span className="hidden group-hover:block absolute border border-solid border-[var(--gris-bleu)] left-0 rounded-[18px] text-sm text-[var(--text-color)] p-2 bg-white">
                    {fieldMetadata.description}
                  </span>
                </span>
              )}
              <span className="mx-1">{separatorIndicator}</span>
            </label>
          )}
          {React.createElement(fieldComponent, {
            model,
            fieldName,
            fieldLabel,
            fieldClassName,
            viewType,
            fieldMetadata,
            fieldsMetadataMap,
            record,
            fetchedRecord,
            onUpdate,
            disabled,
            disabledLabel,
            separatorIndicator,
            validations,
            componentClassName,
          } as React.ClassAttributes<{}>)}
        </div>
        {validations && (
          <ul>
            {(validations.get(fieldLabel) || []).map((v, index) => (
              <li
                key={index}
                className="text-[var(--label-state-error)] text-right text-sm"
              >
                <FontAwesomeIcon icon={"triangle-exclamation"} /> {v}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  logger.warn(
    `Aucun composant pour afficher le champ ${fieldName}(${fieldType}) pour la vue ${viewType}`
  );

  return <></>;
}
