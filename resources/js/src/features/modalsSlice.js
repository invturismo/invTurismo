import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalLayoutState: false,
  loaderForm: false,
};

export const modalsSlice = createSlice({
  name: "modalsSlice",
  initialState: initialState,
  reducers: {
    closeModalLayoutState: (state) => {
      state.modalLayoutState = false;
    },
    openModalLayoutState: (state) => {
      state.modalLayoutState = true;
    },
    closeLoaderForm: (state) => {
      state.loaderForm = false;
    },
    openLoaderForm: (state) => {
      state.loaderForm = true;
    },
  },
});

export const {
  closeModalLayoutState,
  openModalLayoutState,
  closeLoaderForm,
  openLoaderForm,
} = modalsSlice.actions;
export default modalsSlice.reducer;
