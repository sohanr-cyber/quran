import { configureStore, combineReducers } from "@reduxjs/toolkit";
import savedReducer from "./savedSlice";
import themeReducer from "./themeSlice";

const rootReducer = combineReducers({
  saved: savedReducer,
  theme: themeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
