import { FieldVisibility } from "@/components/list/table/selection/columnSelector";
import { DensityValue } from "@/components/list/table/selection/densityListSelector";
import { logger } from "@/utils/loggerService";
import { createSlice } from "@reduxjs/toolkit";

/**
 * Structure des filtres pour un ecran
 */
interface ScreenFilters {
  searchString?: string;
  filters?: any;
  period?: any;
  currentPage?: number;
  pageSize?: number;
  sortParams?: any;

  // propriétés additionnelles
  [props: string]: any;
}

interface ScreenSettings {
  filtersVisible?: boolean;
  lineDensity?: DensityValue;
  availableFields?: FieldVisibility[];
  selectedIds?: string[];
  unselectedIds?: string[];
  allSelected?: boolean;

  // propriétés additionnelles
  [props: string]: any;
}

/**
 * Propriétés de l'écran
 */
interface ScreenContext {
  // Filtres de recherche
  filters?: ScreenFilters;
  settings?: ScreenSettings;

  // propriétés additionnelles
  [props: string]: any;
}

/**
 * Etat contenant les propriétés de l'ecran
 */
interface ScreenContextSliceState {
  // entrée des paramètres de l'ecran
  [path: string]: ScreenContext;
}

const initialState: ScreenContextSliceState = {};

export const screenContextSlice = createSlice({
  name: "screenContext",
  initialState,
  reducers: {
    updateScreenFilters: (state, action) => {
      const payload: any = action.payload;
      const path = payload.path?.replace(/\/+?$/, "");
      state[path] = {
        ...state[path],
        filters: { ...state[path]?.filters, ...payload.params },
      };
      logger.debug(
        `[SCREEN CONTEXT] - Mise à jour des filtres pour "${path}"`,
        payload.params
      );
    },
    updateScreenSettings: (state, action) => {
      const payload: any = action.payload;
      const path = payload.path?.replace(/\/+?$/, "");
      state[path] = {
        ...state[path],
        settings: { ...state[path]?.settings, ...payload.params },
      };
      logger.debug(
        `[SCREEN CONTEXT] - Mise à jour des paramétrages pour "${path}"`,
        payload.params
      );
    },
    setScreenParams: (state, action) => {
      const payload: any = action.payload;
      const path = payload.path?.replace(/\/+?$/, "");
      state[path] = payload.params;
      logger.debug("[SCREEN CONTEXT] - Set params", path, payload.params);
    },
  },
});

export const { setScreenParams, updateScreenFilters, updateScreenSettings } =
  screenContextSlice.actions;
export default screenContextSlice.reducer;
