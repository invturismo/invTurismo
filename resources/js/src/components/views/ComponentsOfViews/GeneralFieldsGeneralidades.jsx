import React from 'react';
import Departamentos from "../ListadoPreliminar/Form/DataJson/DataDepartamentos.json";
import Municipios from "../ListadoPreliminar/Form/DataJson/DataMunicipio.json";

const GeneralFieldsGeneralidades = ({
  values,
  valuesCodigo,
  errors,
  handleChange,
  handleBlur,
  stateWho
}) => {
  return (
    <>
      <label htmlFor="ID_DEPARTAMENTOS" className="LabelType1">
        <span className="NameField">Departamento</span>
        <select
          name="ID_DEPARTAMENTOS"
          id="ID_DEPARTAMENTOS"
          value={valuesCodigo.ID_DEPARTAMENTOS}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
        >
          <option value="" disabled>
            Seleccione un departamento
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
        {errors.ID_DEPARTAMENTOS && (
          <small className="errorMessage">{errors.ID_DEPARTAMENTOS}</small>
        )}
      </label>
      <label htmlFor="ID_MUNICIPIOS" className="LabelType1">
        <span className="NameField">Municipio</span>
        <select
          name="ID_MUNICIPIOS"
          id="ID_MUNICIPIOS"
          value={valuesCodigo.ID_MUNICIPIOS}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
          disabled={valuesCodigo.ID_DEPARTAMENTOS ? false : true}
        >
          <option value="" disabled>
            {valuesCodigo.ID_DEPARTAMENTOS
              ? "Seleccione un municipio"
              : "Primero seleccione departamento"}
          </option>
          {valuesCodigo.ID_DEPARTAMENTOS &&
            Municipios[valuesCodigo.ID_DEPARTAMENTOS].map((val) => {
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
        {errors.ID_MUNICIPIOS && (
          <small className="errorMessage">{errors.ID_MUNICIPIOS}</small>
        )}
      </label>
      <label htmlFor="NOMBRE" className="LabelType1">
        <span className="NameField">Nombre</span>
        <input
          type="text"
          name="NOMBRE"
          id="NOMBRE"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, "GENERALIDADES")}
          value={values.NOMBRE}
          autoComplete="off"
        />
        {errors.NOMBRE && (
          <small className="errorMessage">{errors.NOMBRE}</small>
        )}
      </label>
      {!stateWho && (
        <label htmlFor="UBICACION" className="LabelType1">
          <span className="NameField">Ubicación</span>
          <input
            type="text"
            name="UBICACION"
            id="UBICACION"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "GENERALIDADES")}
            value={values.UBICACION}
            autoComplete="off"
          />
          {errors.UBICACION && (
            <small className="errorMessage">{errors.UBICACION}</small>
          )}
        </label>
      )}
    </>
  );
};

export default GeneralFieldsGeneralidades