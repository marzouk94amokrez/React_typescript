import { useEffect, useState } from "react";
import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  size,
  useFloating,
  useInteractions,
  useClick,
  useDismiss,
  useRole,
  FloatingFocusManager,
} from "@floating-ui/react";
import { ButtonProps, GenericButton } from ".";

/**
 * Interface for filter button
 */
export interface FilterButtonProps extends ButtonProps {
  /** Composant du filtre */
  component?: any;
  /** Contrôle l'ouverture ou non du menu bouton filtre */
  menuIsOpen?: boolean;
  /** Propriété CSS qui définit comment gérer le dépassement du contenu d'un élément dans le bloc */
  overFlowStrategy?: string;
  /** Fonction sur l'ouverture du menu */
  onMenuOpened?: Function;
  /** Fonction sur la fermeture du menu */
  onMenuClosed?: Function;
  /** CSS composant filtre */
  filterClassName?: string;
}

/**
 * <b>Composant d'affichage du bouton de filtre générique </b>
 */
export default function FilterButton({
  label,
  icon,
  className,
  labelClassName,
  iconClassName,
  role,
  component,
  overFlowStrategy,
  menuIsOpen,
  onMenuOpened,
  onMenuClosed,
  filterClassName,
}: FilterButtonProps) {
  const [menuOpen, setMenuOpen] = useState(menuIsOpen);
  useEffect(() => {
    setMenuOpen(menuIsOpen);
  }, [menuIsOpen]);

  /**
   * Open change handler
   * @param opened
   */
  const onOpenChange = (opened: boolean) => {
    setMenuOpen(opened);

    if (opened && onMenuOpened) {
      onMenuOpened(opened);
    } else if (!opened && onMenuClosed) {
      onMenuClosed(opened);
    }
  };

  const { x, y, strategy, refs, floatingStyles, context } =
    useFloating<HTMLElement>({
      placement: "bottom-start",
      open: menuOpen,
      onOpenChange: onOpenChange,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(5),
        flip({ padding: 10 }),
        size({
          apply({ rects, elements, availableHeight }) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`,
              width: "max-content",
              overflow: overFlowStrategy || "scroll",
            });
          },
          padding: 10,
        }),
      ],
    });

  const click = useClick(context, { event: "mousedown" });
  const dismiss = useDismiss(context);
  const buttonRole = useRole(context, { role });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    buttonRole,
  ]);

  return (
    <span ref={refs.setReference}>
      <GenericButton
        label={label}
        className={className}
        icon={icon}
        iconClassName={iconClassName}
        labelClassName={labelClassName}
        role={undefined}
        extraProps={getReferenceProps()}
      ></GenericButton>
      {menuOpen && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                overflowY: "auto",
                background: "transparent",
                minWidth: 100,
                borderRadius: 8,
                outline: 0,
              }}
              {...getFloatingProps()}
            >
              <div
                className={`bg-white rounded border-[var(--button-border-sec)] border flex-row flex w-full justify-center p-2 ${filterClassName}`}
              >
                {component?.Menu}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </span>
  );
}
