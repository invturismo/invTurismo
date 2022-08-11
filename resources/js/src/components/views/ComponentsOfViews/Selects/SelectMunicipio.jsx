import React from 'react';
import Municipios from "../../ListadoPreliminar/Form/DataJson/DataMunicipio.json";

const SelectMunicipio = ({ values, handleChange}) => {
  return (
    <select
      name="ID_MUNICIPIOS"
      id="ID_MUNICIPIOS"
      value={values.ID_MUNICIPIOS}
      onChange={(e) => handleChange(e)}
      disabled={values.ID_DEPARTAMENTOS ? false : true}
    >
      <option value="" disabled>
        Municipio
      </option>
      {values.ID_DEPARTAMENTOS &&
        Municipios[values.ID_DEPARTAMENTOS].map((val) => {
          return (
            <option
              value={val["Id_Municipio"]}
              key={val["Id_Municipio"] + val["Nombre"]}
            >
              {val["Nombre"][0].toUpperCase() +
                val["Nombre"].slice(1).toLocaleLowerCase()}
            </option>
          );
        })}
    </select>
  );
};

export default SelectMunicipio