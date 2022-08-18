import React, { useState } from "react";
import { toastMs } from "../../../../helpers/helpToastMessage";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { closeFilter, setDataFilter } from "../../../../features/filterSlice";
import { StyleFilter } from "./StyleFilter";
import ButtonHeader from "../../../common/ButtonHeader";
import { useSearchParams } from "react-router-dom";
import SelectDepartamentos from "../Selects/SelectDepartamentos";
import SelectMunicipio from "../Selects/SelectMunicipio";
const cookies = new Cookies();

const initialValues = {
  ID_DEPARTAMENTOS: "",
  ID_MUNICIPIOS: "",
};

const dataFilter = () => {
  const ID_DEPARTAMENTOS = cookies.get("id_departamentos");
  const ID_MUNICIPIOS = cookies.get("id_municipios");
  if (ID_DEPARTAMENTOS || ID_MUNICIPIOS)
    return {
      ID_DEPARTAMENTOS: ID_DEPARTAMENTOS || "",
      ID_MUNICIPIOS: ID_MUNICIPIOS || "",
    };
  return null;
};

const Filter = () => {
  const filter = dataFilter();
  const [values, setValues] = useState(filter || initialValues);
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const handleChange = (e) => {
    if (e.target.name === "ID_DEPARTAMENTOS") {
      const valueMunicipio = { ID_MUNICIPIOS: "" };
      if (e.target.value === "11") valueMunicipio.ID_MUNICIPIOS = "001";
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        ...valueMunicipio,
      });
    } else setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.ID_DEPARTAMENTOS && !values.ID_MUNICIPIOS)
      return toastMs().error("No selecciono ningun filtro");
    cookies.set("id_departamentos", values.ID_DEPARTAMENTOS, { path: "/" });
    cookies.set("id_municipios", values.ID_MUNICIPIOS, { path: "/" });
    if (params.has("page")) params.delete("page");
    setParams(params);
    dispatch(closeFilter());
    dispatch(setDataFilter(values));
  };

  return (
    <StyleFilter>
      <form onSubmit={handleSubmit}>
        <div className="Options">
          <SelectDepartamentos handleChange={handleChange} values={values} />
          <SelectMunicipio handleChange={handleChange} values={values} />
        </div>
        <ButtonHeader
          type="Submit"
          imgSrc="svgAccept.svg"
          className="filterButton"
        >
          Aceptar
        </ButtonHeader>
      </form>
    </StyleFilter>
  );
};

export default Filter;
