import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  dataProfile: {
    PRIMER_NOMBRE: "",
    PRIMER_APELLIDO: "",
  },
};

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
