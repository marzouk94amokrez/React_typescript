import { LayoutElement } from "@/api/data/layoutElement";
import React, { ComponentClass, useEffect, useState } from "react";
import layoutElementsDictionary from "./layoutElementsDictionary";
import { LayoutElementProps } from "./layoutElementProps";
import "./layoutElements";
import { useLogger } from "@/utils/loggerService";

/**
 * <b>Composant pour le rendu d'un élément de layout</b>
 * 
 * @param param0 
 * @returns 
 */
export function LayoutElementDisplay({ model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate, labelClassName, fieldClassName, validations, ...extraProps }: LayoutElementProps) {
  const { logger } = useLogger();

  /**
   * Element de layout propre à afficher
   * Les separator_tab sont à regrouper dans des élements de type tab
   */
  const [sanitizedLayout, setSanitizedLayout] = useState<LayoutElement[]>([]);
  useEffect(() => {
    const layout: LayoutElement[] = [];
    let currentTab: LayoutElement | undefined = undefined;
    let previousType: string = '';

    (Array.isArray(layouts) ? layouts : [layouts]).forEach((e) => {
      if (e.type !== 'separator_tab') {
        layout.push(e);
      } else {
        if (previousType !== e.type || currentTab === undefined) {
          currentTab = { type: 'tab', elements: [] };
          logger.debug(`[LAYOUT] - Création d'un composant "Tab" pour les éléments de layouts restant.`, e);

          layout.push(currentTab);
        }

        logger.debug(`[LAYOUT] - Réorganisation de l'onglet "separator_tab" dans un composant "Tab".`, e);
        currentTab?.elements?.push(e);
      }

      previousType = e.type || '';
    });
    logger.debug(`[LAYOUT] - Nettoyage du layout avant utilisation dans l'application.`, { "avant": layouts, "après": layout });
    setSanitizedLayout(layout);
  }, [layouts]);

  if (sanitizedLayout) {
    let componentIndex = 0;
    return <> {
      sanitizedLayout.map((l) => {
        const elementName = l.type || '';
        const layoutComponent = layoutElementsDictionary.getLayoutElement(elementName);
        
        if (layoutComponent) {
          logger.debug(`[LAYOUT] - Utilisation du composant "${layoutComponent.name}" pour afficher le type "${elementName}".`)

          return React.createElement(layoutComponent as ComponentClass, {
            key: `element_${componentIndex++}`,
            model,
            modelFields,
            viewType,
            record,
            fetchedRecord,
            layouts: [l],
            onUpdate,
            labelClassName,
            fieldClassName,
            validations,
            ...extraProps
          } as React.ClassAttributes<{}>);
        } else if (elementName === '') {
          logger.debug('[LAYOUT] - Pas de type de layout fourni, les enfants seront affichés directement sur plusieurs lignes.', l);
          return (<LayoutElementDisplay
            key={`element_${componentIndex++}`}
            model={model}
            modelFields={modelFields}
            viewType={viewType}
            record={record}
            fetchedRecord={fetchedRecord}
            layouts={l.elements || []}
            onUpdate={onUpdate}
            labelClassName={labelClassName}
            fieldClassName={fieldClassName}
            validations={validations}
            {...extraProps}
          />)
        }

        if (process.env.NODE_ENV === 'development') {
          logger.debug(`[LAYOUT] - Composant inconnu : "${elementName}".`, l);

          return (<p key={`element_${componentIndex++}`}>{`Unknown component: ${elementName}`}<br/></p>);
        }

        return <></>
      })
    }</>
  }

  return (<></>);
}
