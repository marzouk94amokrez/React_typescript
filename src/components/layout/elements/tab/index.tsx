import { LayoutElement } from "@/api/data/layoutElement";
import { useEffect, useMemo, useState } from "react";
import { LayoutElementDisplay } from "../layoutElementDisplay";
import { LayoutElementProps } from "../layoutElementProps";
import layoutElementsDictionary from "../layoutElementsDictionary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
/**
 * <b>Composant de rendu d'un groupe d'onglets qui va afficher les enfants de type separator_tab</b>
 * 
 * @param param0 
 */
export function Tab({ model, modelFields, viewType, record, fetchedRecord, layouts, onUpdate, validations }: LayoutElementProps) {
  const tabComponent: LayoutElement = useMemo(() => layouts[0] || {}, [layouts]);
  const tabElements = useMemo(() => tabComponent.elements || [], [tabComponent]);
  const { id } = useParams();
  const { t } = useTranslation();
  /**
   * Liste des entêtes d'onglets
   */
  const [headersWithIcons, setHeadersWithIcons] = useState([]);

  /**
   * Index sélectionné du composant d'onglet
   */
//remmetre a 0 la liste si on changes d'elements sur list-tab
  const [selectedIndex, setSelectedIndex] = useState<number>(
                                            localStorage.getItem(model.code+'Uid')!=id?
                                            0
                                            :
                                            (tabElements.length-1 <parseInt(localStorage.getItem(model.code+'tabIndex') ||'0')?
                                            0
                                            : 
                                            parseInt(localStorage.getItem(model.code+'tabIndex')||'0'))
                                            );

  /**
   * La disposition sélectionnée de l'affichage
   * La disposition change avec le changement d'index du composant
   */
  const [selectedLayout, setSelectedLayout] = useState<LayoutElement[]>([]);

  const [displayElement, setDisplayElement] = useState<any>();

  const [opened, setOpened] = useState(true)

  /**
   * Mise en place des headers lorsque le tableay change
   */

const changeTab = (index: any) => {
  setSelectedIndex(index);
  localStorage.setItem(model.code+'tabIndex', index);
}

  useEffect(() => {
    const headersWithIcons: any = tabElements.map((tt) => {
    
      return {
        label: t(`${(tt.label)}`) || '',
        icon: tt.icon || '',
      }
    }, [t]);
    const display: any = tabElements.map((t) => {
      return { display: t.display || "" }
    });
    setHeadersWithIcons(headersWithIcons);
    setDisplayElement(display)
  }, [tabElements]);

  /**
   * Sélection du layout à afficher lors de l'affichage du composant
   */
  useEffect(() => {
    localStorage.setItem(model.code+'Uid', record?.uuid);
  }, [record]);

  useEffect(() => {
    const t=parseInt(localStorage.getItem(model.code+'tabIndex')||'0');

    const tabElement: LayoutElement = tabElements[selectedIndex] || {};
    setSelectedLayout(tabElement.elements || []);
  }, [localStorage.getItem(model.code+'tabIndex'), tabElements]);

  function closeModal() {
    setOpened(false);
  }

  const { refs, context } = useFloating({
    open: opened,
    onOpenChange: closeModal,
  });
  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const { getFloatingProps } = useInteractions([click, role, dismiss]);

  return (
    <div className="flex flex-col w-full">
      <ul className="flex flex-row flex-none w-full">
        {
          headersWithIcons.map((item: any, i: any) =>
            <li
              key={`${item.label}_${i}`}
              className={`cursor-pointer mr-[3rem] text-[1.15rem] text-[var(--title-color)] rounded-t-md`}
              onClick={() => { changeTab(i) }}
            >
              <span className={`flex flex-row  after:content-[' '] after:pb-[0.3rem] `}>
                <span className={`${i === selectedIndex ? 'border-b-[5px] border-[var(--title-color)]' : 'border-b-[5px] border-white'}`}>
                  {item.label}
                </span>
                {item.icon && <FontAwesomeIcon icon={item.icon} className="text-2xl" />}
              </span>
            </li>)
        }
      </ul>
      {selectedLayout.map((item: any, index) => (
        item.display === "popup" ?
        <FloatingPortal key={`fp_${index}`}>
          <FloatingOverlay className={`Dialog-overlay`}>
            <FloatingFocusManager context={context}>
              <div className="flex items-center text-[var(--color-princ)]">
                <div
                  className="Dialog"
                  ref={refs.setFloating}
                  {...getFloatingProps()}
                >
                  <p className="flex-start text-[1.5rem]">{item.type}</p>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="ml-auto cursor-pointer"
                    onClick={closeModal}
                  />
                  <LayoutElementDisplay
                    model={model}
                    modelFields={modelFields}
                    viewType={viewType}
                    record={record}
                    fetchedRecord={fetchedRecord}
                    layouts={selectedLayout}
                    onUpdate={onUpdate}
                    validations={validations}
                  />
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
        :
        <div className="flex flex-col w-full mt-4" key={`tab_${index}`}>
          <LayoutElementDisplay
            model={model}
            modelFields={modelFields}
            viewType={viewType}
            record={record}
            fetchedRecord={fetchedRecord}
            layouts={item}
            onUpdate={onUpdate}
            validations={validations}
          />
        </div>
      )
      )}
    </div>
  );
}

layoutElementsDictionary.registerLayoutElement('tab', Tab);
