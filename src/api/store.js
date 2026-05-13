

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducer from "./mainReducer/main";

const reducers = combineReducers(reducer);

export const store = configureStore({
  reducer: reducers,
});
