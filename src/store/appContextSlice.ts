import { Model } from '@/api/data/model';
import { createSlice } from '@reduxjs/toolkit';

interface AppContextSliceState {
  model?: Model;
  record?: any;
  screen?: string;
  menu?: any[];
  selectedPathInMenu?: string;
}

const initialState: AppContextSliceState = {};

/**
 * Slice de représentation des contextes
 */
export const appContextSlice = createSlice({
  name: 'appContext',
  initialState: initialState,
  reducers: {
    setModel: (state, action) => {
      state.model = action.payload;
    },
    setScreen: (state, action) => {
      state.screen = action.payload;
    },
    setRecord: (state, action) => {
      state.record = action.payload;
    },
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setSelectedPathInMenu: (state, action) => {
          state.selectedPathInMenu = action.payload; 
    },
    setContext: (state, action) => {
      const context = action.payload || {};
      state.model = context?.model;
      state.record = context?.record;
      state.screen = context?.screen;
      state.menu = context?.menu;
    },
    clearContext: (state) => {
      state.model = undefined;
      state.record = undefined;
      state.screen = undefined;
      state.menu = undefined;
    },
    

  }
});

export const { setModel, setScreen, setRecord, setMenu, clearContext,setSelectedPathInMenu } = appContextSlice.actions
export default appContextSlice.reducer
