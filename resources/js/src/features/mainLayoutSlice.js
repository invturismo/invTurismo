import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  menuState: false,
};

//Guarda el estado del menu
export const mainLayoutSlice = createSlice({
  name: "mainLayoutSlice",
  initialState: initialState,
  reducers: {
    closeMenu: state => {
      state.menuState = false;
    },
    openMenu: state => {
      state.menuState = true;
    },
  },
});

export const {closeMenu, openMenu} = mainLayoutSlice.actions;
export default mainLayoutSlice.reducer;
