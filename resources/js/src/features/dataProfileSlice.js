import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  dataProfile: {
    PRIMER_NOMBRE: "",
    PRIMER_APELLIDO: "",
  },
};

//Guarda datos relevantes del usuario que se encuentra en sesion
export const dataProfileSlice = createSlice({
  name: "dataProfileSlice",
  initialState: initialState,
  reducers: {
    storeDataProfile: (state, action) => {
      state.dataProfile = action.payload;
    },
  },
});

export const {storeDataProfile} = dataProfileSlice.actions;
export default dataProfileSlice.reducer;
