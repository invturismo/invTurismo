import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalLayoutState: false,
  loaderForm: false,
  dataModalPopper: {},
};

export const modalsSlice = createSlice({
  name: "modalsSlice",
  initialState: initialState,
  reducers: {
    closeModalLayoutState: (state) => {
      state.modalLayoutState = false;
      state.dataModalPopper = {};
    },
    openModalLayoutState: (state,action) => {
      state.modalLayoutState = true;
      state.dataModalPopper = action.payload;
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
