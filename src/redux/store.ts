import { RootReducer } from "./slices/index";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import rootReducer from "./slices";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["lang"],
};

const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
