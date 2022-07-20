import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./rtkApis/api";

import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [api.reducerPath]: api.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
