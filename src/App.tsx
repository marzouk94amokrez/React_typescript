import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "@/routes";
import numeral from "numeral";
import "./App.scss";
import { useTranslation } from "react-i18next";
import { Suspense, useEffect } from "react";
import { useLogger } from "@/utils/loggerService";
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import {
  fas,
} from "@fortawesome/pro-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas)

function App() {
  const router = createBrowserRouter(routes, {
    basename: `${process.env.PUBLIC_URL}`,
  });
  const { t, i18n } = useTranslation(["common"]);
  const { logger } = useLogger();

  /**
  * Enregistrer une chaine de traduction
  *
  * @param locale Code de traduction à enregistrer
  * @param t Fonction de traduction
  */
  function registerNumeralLocale(locale: string, t: Function) {
    try {
      delete numeral.locales[locale];

      const configuration = {
        delimiters: {
          thousands: t("settings.number.delimiters.thousands", { ns: "common" }),
          decimal: t("settings.number.delimiters.decimal", { ns: "common" }),
        },
        abbreviations: {
          thousand: t("settings.number.abbreviations.thousand", { ns: "common" }),
          million: t("settings.number.abbreviations.million", { ns: "common" }),
          billion: t("settings.number.abbreviations.billion", { ns: "common" }),
          trillion: t("settings.number.abbreviations.trillion", { ns: "common" }),
        },
        ordinal: (num: number) => {
          return num.toString();
        },
        currency: {
          symbol: t("settings.number.currency.symbol", { ns: "common" }),
        },
      };

      logger.debug("Enregistrement des paramètres de traduction des nombres.");
      numeral.register("locale", locale, configuration);
    } catch (e: any) {
      logger.error("Erreur d'enregistrement des paramètres de traduction des nombres.");
    }
  }


  // load a locale
  useEffect(() => {
    document.title = process.env.REACT_APP_SITE_TITLE || 'ICD EINV';
    registerNumeralLocale(i18n.language, t);
  }, [t?.name, i18n.language]);

  // switch between locales
  numeral.locale(i18n.language);

  return (
    <div className="relative bg-[color:var(--color-app-bg)] w-full h-full">
      <ThemeProvider theme={theme}>
        <Suspense fallback={"..."}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
      {process.env.REACT_APP_REVISION && (
        <i className="absolute text-xs text-red-700 bottom-4 right-6">{process.env.REACT_APP_REVISION}</i>
      )}
    </div>
  );
}

export default App;

