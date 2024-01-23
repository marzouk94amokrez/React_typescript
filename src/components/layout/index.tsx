import { Suspense, useEffect, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import Navbar from "@/components/layout/navbar";
import Sidebar, { MobileMenu } from "@/components/layout/sidebar";
import { useAppDispatch } from "@/hooks/store";
import { useGetMenusQuery } from '@/store/api';
import { setMenu } from "@/store/appContextSlice";
import { useLogger } from "@/utils/loggerService";

/** 
 * <b>Composant de mise en page qui est utilisé pour partager une section commune entre plusieurs pages.</b> 
 * <br/> Ce dernier aura une section commune:
 * <li> En-tête </li>
 * <li> Navigation latérale </li>
 * <li> Contenu </li>
 */
export default function Layout({ children }: any) {
  const { logger } = useLogger();
  const dispatch = useAppDispatch();
  const location = useLocation();


  const [opened, setOpened] = useState(false);
  const [expanded, setExpanded] = useState(true);

  function toggleExpanded() {
    setExpanded(!expanded);
  }

  function toggleOpened() {
    setOpened(!opened);
  }

  const outlet = useOutlet() || children;

  // Chargement du menu
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetMenusQuery(null)

  // Gestion du menu sélectionné
  const updateSelectedMenu = (data: any) => {
    if (!data) {
      dispatch(setMenu(undefined));
      return;
    }

    const s = location.pathname;

    const dfs = (node: any, previousPath: any[]): any[] => {
      if (!node) {
        return [];
      }

      const path = [node, ...previousPath];

      // Recherche avec suppression / final
      if (node.path?.replace(/\/+$/, '') === s.replace(/\/+$/, '')) {
        return path;
      }

      const children = node.elements || [];
      for (const element of children) {
        const childPath = dfs(element, [...path]);
        
        const lastElement = childPath[0] || {};

        // Recherche avec suppression / final
        if (lastElement.path?.replace(/\/+$/, '') === s.replace(/\/+$/, '')) {
          return childPath;
        }
      }

      return [];
    };

    const root = { path: undefined, elements: data }
    const menuPath: any[] = dfs(root, []);
    dispatch(setMenu(menuPath));
  }

  useEffect(() => {
    updateSelectedMenu(data?.data);
  }, [data, location.pathname]);

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="flex flex-row items-center flex-none w-full py-1 h-11">
        <MobileMenu className="lg:hidden" opened={opened} onClick={toggleOpened} />
        <Navbar />
      </div>
      <div className="flex flex-row flex-auto overflow-hidden">
        <div className={`flex-none ${opened ? 'w-full' : 'w-0'} overflow-hidden ${expanded ? 'lg:w-56' : 'lg:w-20'} transition-all`}>
          <Sidebar opened={opened} expanded={expanded} onToggle={toggleExpanded} />
        </div>
        <div className="page-container flex flex-auto px-[3rem] py-[2rem] mt-0 mx-4 mb-4 lg:ml-0 overflow-auto bg-[color:white] shadow-[0_3px_6px_rgba(0,0,0,0.16)] rounded-[18px]">
          <Suspense fallback={<div className="flex items-center justify-center w-full h-full">...</div>}>
            {outlet}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
