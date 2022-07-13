import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { commentApi } from "./rtkApis/commentApi";
import { issueApi } from "./rtkApis/issueApi";
import { projectApi } from "./rtkApis/projectApi";
import { teamApi } from "./rtkApis/teamApi";
import authSlice from "./slices/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [commentApi.reducerPath]: commentApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  [teamApi.reducerPath]: teamApi.reducer,
  [issueApi.reducerPath]: issueApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(commentApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>
