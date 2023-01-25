import React from "react";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "universal-cookie";
import {setDataFilter} from "../../../../features/filterSlice";
import {helpCapitalize} from "../../../../helpers/helpCapitalize";
import Departamentos from "../../ListadoPreliminar/Form/DataJson/DataDepartamentos.json";
import Municipios from "../../ListadoPreliminar/Form/DataJson/DataMunicipio.json";
import {StyleLabelFilter} from "./StyleLabelFilter";

const SpanTag = ({children, id, handleClick}) => {
  return (
    <span className="tag" id={"span" + id}>
      {children}
      <button id={id} onClick={handleClick}>
        <img src="/img/iconsMenu/IconCloseMenu.svg" alt="close" />
      </button>
    </span>
  );
};

const LabelFilter = () => {
  const dataFilter = useSelector(state => state.filterSlice.dataFilter);
  const dispatch = useDispatch();

  const handleClick = e => {
    const cookies = new Cookies();
    const id = e.target.id ? e.target.id : e.target.parentElement.id;
    const ID_MUNICIPIOS = cookies.get("id_municipios");
    if (id === "ID_DEPARTAMENTOS" && ID_MUNICIPIOS) {
      cookies.remove("id_departamentos", {path: "/"});
      cookies.remove("id_municipios", {path: "/"});
      return dispatch(setDataFilter({ID_DEPARTAMENTOS: "", ID_MUNICIPIOS: ""}));
    }
    if (id === "ID_DEPARTAMENTOS")
      cookies.remove("id_departamentos", {path: "/"});
    if (id === "ID_MUNICIPIOS") cookies.remove("id_municipios", {path: "/"});
    dispatch(setDataFilter({[id]: ""}));
  };

  return (
    <div>
      {(dataFilter.ID_DEPARTAMENTOS || dataFilter.ID_MUNICIPIOS) && (
        <StyleLabelFilter>
          {dataFilter.ID_DEPARTAMENTOS && (
            <SpanTag id="ID_DEPARTAMENTOS" handleClick={handleClick}>
              {Departamentos.map(val => {
                if (val.Código === dataFilter.ID_DEPARTAMENTOS)
                  return helpCapitalize(val.Nombre);
                return null;
              })}
            </SpanTag>
          )}
          {dataFilter.ID_MUNICIPIOS && dataFilter.ID_DEPARTAMENTOS !== "11" && (
            <SpanTag id="ID_MUNICIPIOS" handleClick={handleClick}>
              {Municipios[dataFilter.ID_DEPARTAMENTOS].map(val => {
                if (val.Id_Municipio === dataFilter.ID_MUNICIPIOS)
                  return helpCapitalize(val.Nombre);
                return null;
              })}
            </SpanTag>
          )}
        </StyleLabelFilter>
      )}
    </div>
  );
};

export default LabelFilter;
