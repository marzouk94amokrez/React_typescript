import { Model } from "@/api/data/model";
import { logger } from "@/utils/loggerService";
import { createSlice } from "@reduxjs/toolkit";

/**
 * Structure de configuration d'un objet
 */
interface ObjectConfigurations {
  // Définitions d'un objet
  definitions: Model;
  // Structuration des champs sous forme d'objets
  fields: any[];
  // Liste des champs spéciaux par propriétés
  specialFields: [string, string[]][];
}

/**
 * Etat clé valeur contenant le cache de configuration d'un objet
 */
interface ObjectsDefinitionSliceState {
  // Entrée des configurations d'un objet
  [object: string]: ObjectConfigurations;
}

const initialState: ObjectsDefinitionSliceState = {};

/**
 * Structure des définitions des objets
 */
export const objectsDefinitionState = createSlice({
  name: 'objectsDefinitions',
  initialState,
  reducers: {
    setObjectDefinition: (state, action) => {
      const payload: any = action.payload;
      state[payload.object] = payload.params;
      logger.debug("[OBJECTS DEFINITIONS] - Set objects definitions", payload.object, payload.params);
    }
  }
});

export const { setObjectDefinition } = objectsDefinitionState.actions
export default objectsDefinitionState.reducer
