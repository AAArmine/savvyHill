import { combineReducers } from "@reduxjs/toolkit";
import langReducer from "./langSlice";

const rootReducer = combineReducers({
  lang: langReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
