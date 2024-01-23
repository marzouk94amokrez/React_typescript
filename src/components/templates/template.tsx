import { TemplateProps } from "./templateProps";
import templatesDictionary from "./templatesDictionary";
import "./templates";
import React, { ComponentClass } from "react";
import { logger } from "@/utils/loggerService";

/**
 * Properties of a template renderer
 */
interface TemplateRendererProps extends TemplateProps {
  /**
   * Nom du composant
   */
  name: string;
}

/**
 * <b>Moteur de rendu du composant</b>
 */
export default function Template({ name, model, modelFields, modelLayouts, layoutActions, visuDocWidthIfExist, ...extraProps }: TemplateRendererProps) {

  const templateComponent = templatesDictionary.getTemplate(name);
  
  if (!templateComponent) {
    logger.error(`[TEMPLATE] - Un template invalide a été fourni pour le modèle ${model?.code}.`, process.env.NODE_ENV !== 'production' ? name : '');

    return (
      <span>Invalid template {process.env.NODE_ENV === 'development' ? <span className="inline px-2 italic bg-gray-200 rounded-md">{name}</span> : ''} </span>
    )
  }

  logger.debug(`[TEMPLATE] - Utilisation du composant "${templateComponent.name}" pour afficher le template "${name}".`);

  return (
    <>{
        React.createElement(templateComponent as ComponentClass, {
        name,
        model,
        modelFields,
        modelLayouts,
        layoutActions,
        visuDocWidthIfExist,
        isChild: false,
        endpoint:null,
        ...extraProps,
      } as React.ClassAttributes<{}>)
    }</>
  );
}
