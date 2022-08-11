import { configureStore } from "@reduxjs/toolkit";
import dataProfileSlice from "../features/dataProfileSlice";
import filterSlice from "../features/filterSlice";
import mainLayoutSlice from "../features/mainLayoutSlice";
import modalsSlice from "../features/modalsSlice";

export const store = configureStore({
  reducer: {
    mainLayoutSlice : mainLayoutSlice,
    modalsSlice : modalsSlice,
    dataProfileSlice : dataProfileSlice,
    filterSlice : filterSlice,
  },
});