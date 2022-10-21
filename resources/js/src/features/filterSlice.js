import {createSlice} from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const ID_DEPARTAMENTOS = cookies.get("id_departamentos");
const ID_MUNICIPIOS = cookies.get("id_municipios");

const initialState = {
  dataFilter: {
    ID_DEPARTAMENTOS: ID_DEPARTAMENTOS || "",
    ID_MUNICIPIOS: ID_MUNICIPIOS || "",
  },
  stateFilter: false, //Si las opciones de filtrado estan abiertas cambia a true
  updateState: false, //Cambia de estado si el usuario actualiza alguna tabla
  searchState: "", //Filtro de busqueda general de la app
};

//Guarda los filtros de consulta
export const filterSlice = createSlice({
  name: "filterSlice",
  initialState: initialState,
  reducers: {
    setDataFilter: (state, action) => {
      state.dataFilter = {
        ...state.dataFilter,
        ...action.payload,
      };
    },
    openFilter: state => {
      state.stateFilter = true;
    },
    closeFilter: state => {
      state.stateFilter = false;
    },
    updateWindow: state => {
      state.updateState = state.updateState ? false : true;
    },
    changeSearch: (state, {payload}) => {
      state.searchState = payload;
    },
  },
});

export const {
  setDataFilter,
  openFilter,
  closeFilter,
  updateWindow,
  changeSearch,
} = filterSlice.actions;
export default filterSlice.reducer;
