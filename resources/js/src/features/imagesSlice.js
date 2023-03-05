import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  urlImage: {
    IMAGEN1: "",
    IMAGEN2: "",
  },
  loadImage: {
    IMAGEN1: false,
    IMAGEN2: false,
  },
};

//Guarda el valor de la url de las imagenes
export const imagesSlice = createSlice({
  name: "imagesSlice",
  initialState: initialState,
  reducers: {
    setUrlImage: (state, action) => {
      state.urlImage = {...state.urlImage, ...action.payload};
    },
    deleteUrlImage: (state, action) => {
      state.urlImage = {...state.urlImage, [action.payload]: ""};
    },
    openLoadImage: (state, action) => {
      state.loadImage = {...state.loadImage, [action.payload]: true};
    },
    closeLoadImage: (state, action) => {
      state.loadImage = {...state.loadImage, [action.payload]: false};
    },
  },
});

export const {setUrlImage, deleteUrlImage, openLoadImage, closeLoadImage} =
  imagesSlice.actions;
export default imagesSlice.reducer;
