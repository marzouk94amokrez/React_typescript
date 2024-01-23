import { useEffect, useMemo } from "react"
import { useParams } from "react-router"
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Model } from "@/api/data/model";
import { ModelField } from "@/api/data/modelField";
import Template from "@/components/templates/template";
import { setModel, setScreen } from "@/store/appContextSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { useGetModelDefinitionQuery } from "@/store/api";
import { useLogger } from "@/utils/loggerService";


/**
 * Propriétés d'un ecran d'affichage d'élément de modèle
 */
export interface ModelScreenProps {
  screen?: string;
  collection?: boolean;
}

/**
 * Composant d'affichage dune page arbitraire d'un élément de modèle
 */
export default function ModelScreen({ screen: defaultScreen, collection = false }: ModelScreenProps) {
  const { logger } = useLogger();
  const dispatch = useAppDispatch();
  const { modelName: fallbackModelName } = useParams();

  const selectedMenu: any[] = useAppSelector((state) => state.appContext.menu || []);

  const modelName = useMemo(() => selectedMenu?.at(0)?.object || fallbackModelName, [selectedMenu?.at(0)?.object, fallbackModelName]);
  const {
    data: modelDefinitions,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetModelDefinitionQuery(modelName ?? skipToken);

  // Sauvegarde de l'objet principal dans le store
  useEffect(() => {
    const model: Model = modelDefinitions?.data?.definitions;
    if (model) {
      logger.debug(`[MODEL SCREEN] - Sauvegarde de la définition du modèle "${modelName}".`);
      dispatch(setModel(model));
    }
  }, [modelDefinitions]);

  // Sauvegarde de l'ecran dans le store
  const { screen: paramsScreen } = useParams();
  useEffect(() => {
    const screen = (paramsScreen ? paramsScreen : defaultScreen) || '';
    if (screen) {
      logger.debug(`[MODEL SCREEN] - Sauvegarde de la vue en cours "${screen}" dans le store .`);
      dispatch(setScreen(screen));
    }
  }, [paramsScreen, defaultScreen]);

  // Chargement du layout du modèle
  const model: Model | undefined = useAppSelector((state) => state.appContext.model);
  const screenName = useAppSelector((state) => state.appContext.screen);

  // Chargement de l'ecran en cours
  const modelScreen = useMemo(() => {
    const screenEntry = model?.screens[screenName || ''] || {};

    if (screenName) {
      logger.debug(`[MODEL SCREEN] - Chargement de l'entrée ecran pour la vue "${screenName}".`, screenEntry);
    }

    return screenEntry;
  }, [model, screenName]);

  // Chargement des champs du model
  const fields = useAppSelector((state) => state.objectsDefinitions[model?.code as string]?.fields);
  const modelFields = useMemo(() => {
    return new Map<string, ModelField>(fields);
  }, [fields]);

  // Chargement de la disposition de l'ecran
  const screenLayout = useMemo(() => {
    const layouts = modelScreen?.elements || [];

    if (screenName) {
      logger.debug(`[MODEL SCREEN] - Chargement des layouts pour la vue "${screenName}".`, layouts);
    }

    return layouts;
  }, [modelScreen, screenName]);

  // Chargement des actions
  const screenActions = useMemo(() => {
    const actions = modelScreen?.actions || {};

    if (screenName) {
      logger.debug(`[MODEL SCREEN] - Chargement des actions pour la vue "${screenName}".`, actions);
    }

    return actions;
  }, [modelScreen, screenName]);

  return (
    model && modelScreen ? (
      <>
        <Template name={modelScreen.type!} model={model} modelFields={modelFields} modelLayouts={screenLayout} layoutActions={screenActions} visuDocWidthIfExist={modelScreen?.visualisator_width} isChild ={false} />
      </>
    )
      : (
        <div className="flex items-center justify-center w-full h-full">
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-[color:var(--color-sec)] animate-spin dark:text-gray-600 fill-[color:var(--color-princ)]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">{fallbackModelName} Loading...</span>
        </div>
      )
  );
}
