import { configureStore } from '@reduxjs/toolkit'
import appContextReducer from './appContextSlice'
import authReducer from './authSlice';
import screenContextReducer from './screenContextSlice';
import objectsDefinitionReducer from './objectsDefinitionsSlice';
import { apiSlice } from './api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    appContext: appContextReducer,
    screenContext: screenContextReducer,
    objectsDefinitions: objectsDefinitionReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;
