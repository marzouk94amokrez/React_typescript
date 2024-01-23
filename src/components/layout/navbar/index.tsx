import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./navbar.module.scss";
import LanguageList from './LanguageList/LanguageList';
import {
  faGlobe,
  faArrowAltCircleRight,
  faLock,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/utils/contexts/app";
import { useAppSelector } from "@/hooks/store";
import { useEffect } from "react";
/**<b>Composant de navigation de l'en-tête de la page</b>*/
export default function NavBar() {
  const { t } = useTranslation(["common"]);
  const { logout } = useAuth();

  const user: any = useAppSelector(
    (state) => state.auth.currentUser || {}
  );

  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_left}></div>
      <div className={styles.navbar_right}>
        <ul className="flex flex-row">
          <li>
            <button>
              <FontAwesomeIcon size="sm" icon="user-group" className="icon" />&nbsp;{user?.login}
            </button>
          </li>
          <li>
            <button>
              <FontAwesomeIcon size="sm" icon={faLock} className="icon" />
              &nbsp;{t("menus.changePassword", { ns: "common" })}
            </button>
          </li>
          <li>
            <button onClick={logout}>
              <FontAwesomeIcon size="sm" icon={faArrowAltCircleRight} className="icon" />
              &nbsp;{t("menus.logout", { ns: "common" })}
            </button>
          </li>
          {/**
          <li>
            <button>
              <FontAwesomeIcon size="lg" icon={faToggleOn} />
              {t("menus.darkMode", { ns: "common" })}
            </button>
          </li>
           */}
          <li>
            <button>
              <span>
              <LanguageList />
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
