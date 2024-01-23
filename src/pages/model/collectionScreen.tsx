import { useAppDispatch } from "@/hooks/store";
import ModelScreen, { ModelScreenProps } from "./screen";
import { useLogger } from "@/utils/loggerService";
import { useEffect } from "react";

/**
 * Composant d'affichage de la page de liste des modèles
 */
export default function ModelCollectionScreen({ screen } : ModelScreenProps) {
  const { logger } = useLogger();
  useEffect(() => {
    logger.debug(`Chargement de la vue ${screen} pour collections.`)
  }, []);

  return <ModelScreen screen={screen} collection={true} />
}
