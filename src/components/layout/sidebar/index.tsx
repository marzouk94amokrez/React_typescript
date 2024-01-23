import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/fontawesome-svg-core";
import { Link, useNavigate } from "react-router-dom";
import styles from "./sidebar.module.scss";
import MobileMenu from "./mobileMenu";
import {
  faArrowDownLeftAndArrowUpRightToCenter,
  faBars,
} from "@fortawesome/pro-regular-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { useLogger } from "@/utils/loggerService";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useGetMenusQuery } from "@/store/api";
import { setSelectedPathInMenu } from "@/store/appContextSlice";
import { Menu } from "./dropdownMenu";

/**
 * Propriétés d'une entrée sidebar
 */
interface SidebarMenuProps {
  /** Liste des menus */
  menu: any;
  /** Vérifie si le menu est en mode élargi ou non */
  expanded: boolean;
  /** Pour connaître le profondeur du menu */
  depth: number;
}

/**
 * 
 * <b> Composant qui permet d'afficher le menu de la barre latérale </b>
 * @returns 
 */
export function SidebarMenuItem({ menu, expanded, depth = 0 }: SidebarMenuProps) {
  const { t } = useTranslation(["common"]);
  const { logger } = useLogger();
  const navigate = useNavigate();
  const selectedMenu = useAppSelector((state) => state.appContext.menu);

  const label = useMemo(() => (menu.label ? t(menu.label) : ""), [t, menu]);

  // L'élément est sélectionné mais pas en cours (premier élément du tableau)
  const [menuActive, setMenuActive] = useState(false)
  const [subMenuVisible, setSubMenuVisible] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const active = selectedMenu?.includes(menu) || false;
    const selected = selectedMenu?.at(0)
      && selectedMenu?.at(0) === menu
    const submenuVisible = active && !selected;

    setMenuActive(active);
    setSubMenuVisible(submenuVisible);
  }, [menu?.path, selectedMenu]);

  return (
    <div
      aria-label={label}
      className="flex flex-col"
    >
      <div
        className={`${styles.menu_wrapper} ${styles[`depth__${depth}`]} ${menuActive ? styles.active : ""}`}
        onClick={() => {
          if (!expanded) {
            return;
          }

          const path = menu?.path || '';
          if (!path) {
            logger.debug(`[Sidebar] - Entrée de menu sans path`);
          } else {
            logger.debug(`[Sidebar] - Navigation vers ${path}`);
            dispatch(setSelectedPathInMenu(path));
            navigate(path);
          }

          if (menu.elements) {
            setSubMenuVisible(!subMenuVisible);
          }
        }}
      >
        {depth === 0 ? <>
          <Menu menu={{ elements: [menu] }} expanded={expanded}>
            <span className={`hidden w-6 h-6 md:flex items-center justify-center relative group`}>
              <FontAwesomeIcon icon={menu.picto} />
            </span>
          </Menu>
        </> : <></>
        }
        <span className={styles.label}>{label}</span>
      </div>
      {menu.elements && (
        <ul
          className={`flex flex-col items-center ${depth == 0 ? "ml-10" : "ml-4"} ${subMenuVisible ? (expanded ? "lg:block" : "lg:hidden") : "lg:hidden"}`}
        >
          {
            menu.elements?.map((childMenu: any, index: number) => (
              <li key={`${depth}_${index}`}>
                <SidebarMenuItem
                  menu={childMenu}
                  expanded={expanded}
                  depth={depth + 1}
                />
              </li>
            ))
          }
        </ul>
      )}
    </div>
  )
}

interface SidebarProps {
  opened: boolean;
  onToggle: ((e: any) => any);
  expanded: boolean;
}

/** <b>Composant contenant le menu de la page</b> */
export default function Sidebar({ opened, onToggle, expanded }: SidebarProps) {
  const { t } = useTranslation(["common"]);
  const { logger } = useLogger();
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMenusQuery(null)

  const menu = data?.data || [];

  return (
    <div
      className={`${styles.sidenav} ${expanded ? `${styles.expanded}` : ""}`}
      aria-expanded={expanded}
    >
      <Link to="">
        <span className="flex items-center justify-center w-full h-full">
          <img
            className="flex items-center justify-center object-contain w-full h-full"
            src={`${process.env.REACT_APP_COMPANY_LOGO || process.env.PUBLIC_URL + '/logos/ingramLogo.png'}`}
            alt={t("brand_logo") as string}
          />
        </span>
      </Link>
      <span className={styles.expand_button} onClick={onToggle}>
        <FontAwesomeIcon
          icon={expanded ? faArrowDownLeftAndArrowUpRightToCenter : faBars}
          className={expanded ? "w-5 h-5" : "w-6 h-6"}
        />
      </span>
      {
        <nav className="flex-auto mt-8 overflow-y-auto">
          <ul className="max-w-md mx-auto lg:max-w-none lg:px-4">
            {menu &&
              menu.map((item: any, index: number) => (
                <li key={`menu_${index}`} className="mb-2">
                  <SidebarMenuItem menu={item} expanded={expanded} depth={0} />
                </li>
              ))}

          </ul>
        </nav>
      }
    </div>
  );
}

export { MobileMenu };
