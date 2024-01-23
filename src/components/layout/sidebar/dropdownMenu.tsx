import {
  FloatingTree,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useListItem,
  useFloatingTree,
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  useHover,
  useClick,
  useRole,
  useDismiss,
  useListNavigation,
  useTypeahead,
  useInteractions,
  safePolygon,
  FloatingNode,
  useMergeRefs,
  FloatingList,
  FloatingPortal,
  FloatingFocusManager
} from "@floating-ui/react"
import { faCaretRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ButtonHTMLAttributes,
  Dispatch,
  FocusEvent,
  HTMLProps,
  MouseEvent,
  SetStateAction,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import styles from "./dropdownMenu.module.scss";
import { logger, useLogger } from "@/utils/loggerService";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/hooks/store";
import { setSelectedPathInMenu } from "@/store/appContextSlice";

const MenuContext = createContext<{
  getItemProps: (
    userProps?: HTMLProps<HTMLElement>
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  setHasFocusInside: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: () => { },
  setHasFocusInside: () => { },
  isOpen: false
});

/**
 * <b>Composant pour afficher le menu</b>
 */
export const MenuComponent = forwardRef(({ children, menu, expanded, ...props }: any, forwardedRef) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFocusInside, setHasFocusInside] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const parent = useContext(MenuContext);

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();
  const item = useListItem();

  const isNested = parentId !== null;

  const { floatingStyles, refs, context } = useFloating<HTMLButtonElement>({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? 'right-start' : 'right',
    middleware: [
      offset({ mainAxis: isNested ? 0 : 4, alignmentAxis: isNested ? -4 : 0 }),
      flip(),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  const hover = useHover(context, {
    enabled: !expanded,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true })
  });

  const click = useClick(context, {
    enabled: !expanded,
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested
  });

  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex
  });

  const typeahed = useTypeahead(context, {
    listRef: labelsRef,
    onMatch: isOpen ? setActiveIndex : undefined,
    activeIndex
  });

  const {
    getReferenceProps,
    getFloatingProps,
    getItemProps
  } = useInteractions([hover, click, role, dismiss, listNavigation, typeahed]);

  // Event emitter
  // Close menu on click
  useEffect(() => {
    if (!tree) {
      return;
    }

    const handleTreeClick = () => setIsOpen(false);
    const onSubmenuOpen = (event: { nodeId: string, parentId: string }) => {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on('click', handleTreeClick);
    tree.events.on('menuopen', onSubmenuOpen);

    return () => {
      tree.events.off('click', handleTreeClick);
      tree.events.off('menuopen', onSubmenuOpen);
    }
  }, [tree, nodeId, parentId]);

  // Emit menuOpen
  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit('menuopen', { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <FloatingNode id={nodeId}>
    <button
      ref={useMergeRefs([refs.setReference, item.ref, forwardedRef])}
      tabIndex={
        !isNested ? undefined : parent.activeIndex === item.index ? 0 : -1
      }
      role={isNested ? "menuitem" : undefined}
      data-open={isOpen ? "" : undefined}
      data-nested={isNested ? "" : undefined}
      data-focus-inside={hasFocusInside ? "" : undefined}
      className={isNested ? styles.MenuItem : styles.RootMenu}
      {...getReferenceProps(
        parent.getItemProps({
          ...props,
          onFocus(event: FocusEvent<HTMLButtonElement>) {
            props.onFocus?.(event);
            setHasFocusInside(false);
            parent.setHasFocusInside(true);
            logger.debug(`Focus on parent menu: `, menu);
          },
          onClick(event: MouseEvent<HTMLButtonElement>) {
            logger.debug(`Click on parent menu: `, menu);
            tree?.events.emit('click');

            const path = menu?.path || '';
            if (!path) {
              logger.debug(`[Sidebar] - Entrée de menu sans path`);
            } else {
              logger.debug(`[Sidebar] - Navigation vers ${path}`);
              dispatch(setSelectedPathInMenu(path));
              navigate(path);
            }
          },
        })
      )}
    >
      {menu?.label}
      {children}
      {isNested && (
        <span aria-hidden className="flex items-center justify-center">
          <FontAwesomeIcon className="w-4 h-4" icon={faCaretRight} />
        </span>
      )}
    </button>
    <MenuContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        getItemProps,
        setHasFocusInside,
        isOpen
      }}
    >
      <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
        {isOpen && (
          <FloatingPortal>
            <FloatingFocusManager
              context={context}
              modal={false}
              initialFocus={isNested ? -1 : 0}
              returnFocus={!isNested}
            >
              <div
                ref={refs.setFloating}
                className={styles.Menu}
                style={floatingStyles}
                {...getFloatingProps()}
              >
                {menu?.elements?.map((element: any) => {
                  return element?.elements
                    ? <Menu menu={element} expanded={expanded} />
                    : <MenuItem menu={element} />
                })}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </FloatingList>
    </MenuContext.Provider>
  </FloatingNode>
})

interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  menu: any;
  disabled?: boolean;
}

/**
 * Element de menu sans enfant
 */
export const MenuItem = forwardRef(({ menu, disabled, ...props }: MenuItemProps, forwardedRef) => {
  const parent = useContext(MenuContext);
  const item = useListItem({ label: disabled ? null : menu?.label });
  const tree = useFloatingTree();
  const isActive = item.index === menu.activeIndex;
  const { logger } = useLogger();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  return (
    <button
      {...props}
      ref={useMergeRefs([item.ref, forwardedRef])}
      type="button"
      role="menuitem"
      className={styles.MenuItem}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      {...parent.getItemProps({
        onFocus(event: FocusEvent<HTMLButtonElement>) {
          logger.debug('Focus', menu);
          parent.setHasFocusInside(true);
        },
        onClick(event: MouseEvent<HTMLButtonElement>) {
          logger.debug(`Click on: `, menu);
          tree?.events.emit('click');

          const path = menu?.path || '';
          if (!path) {
            logger.debug(`[Sidebar] - Entrée de menu sans path`);
          } else {
            logger.debug(`[Sidebar] - Navigation vers ${path}`);
            dispatch(setSelectedPathInMenu(path));
            navigate(path);
          }
        },
      })}
    >
      {menu?.label}
    </button>
  )
})

/**
 * Element de menu avec enfant
 */
export const Menu = forwardRef((props: any, ref: any) => {
  const parentId = useFloatingParentNodeId();

  if (!parentId) {
    return (
      <FloatingTree>
        <MenuComponent {...props} ref={ref} />
      </FloatingTree>
    );
  }

  return <MenuComponent {...props} ref={ref} />
})
