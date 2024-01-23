import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { logger } from "@/utils/loggerService";

i18n
  // i18next-http-backend
  // loads translations from your server
  // https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: false,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    returnObjects: true,
    
    backend: {
      // path where resources get loaded from, or a function
      // returning a path:
      // function(lngs, namespaces) { return customPath; }
      // the returned path will interpolate lng, ns if provided like giving a static path
      // the function might return a promise
      // returning falsy will abort the download
      //
      // If allowMultiLoading is false, lngs and namespaces will have only one element each,
      // If allowMultiLoading is true, lngs and namespaces can have multiple elements

      //loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
      loadPath: `${process.env.REACT_APP_API_URL}i18/{{lng}}`,
      // path to post missing resources, or a function
      // function(lng, namespace) { return customPath; }
      // the returned path will interpolate lng, ns if provided like giving a static path
      //addPath: `${process.env.PUBLIC_URL}/locales/add/{{lng}}/{{ns}}`,
    },
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      const params = { lng, ns, key, fallbackValue };
      const message = `Entrée de traduction manquante: "${ns}.${key}"`;
      
      process.env.NODE_ENV !== "production"
        ? logger.warn(message, params)
        : logger.info(message, params)
    }
  });
export default i18n;
