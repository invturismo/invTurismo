import React from 'react';
import Departamentos from "../../ListadoPreliminar/Form/DataJson/DataDepartamentos.json";

const SelectDepartamentos = ({ values, handleChange }) => {
  return (
    <select
      name="ID_DEPARTAMENTOS"
      id="ID_DEPARTAMENTOS"
      value={values.ID_DEPARTAMENTOS}
      onChange={(e) => handleChange(e)}
    >
      <option value="" disabled>
        Departamento
      </option>
      {Departamentos.map((val) => {
        return (
          <option value={val["Código"]} key={val["Código"] + val["Nombre"]}>
            {val["Nombre"][0].toUpperCase() +
              val["Nombre"].slice(1).toLocaleLowerCase()}
          </option>
        );
      })}
    </select>
  );
};

export default SelectDepartamentos