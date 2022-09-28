import React from "react";
import Departamentos from "../ListadoPreliminar/Form/DataJson/DataDepartamentos.json";
import Municipios from "../ListadoPreliminar/Form/DataJson/DataMunicipio.json";
import LabelInput from "./FieldsForm/LabelInput";
import LabelSelect from "./FieldsForm/LabelSelect";

const GeneralFieldsGeneralidades = ({
  values,
  valuesCodigo,
  errors,
  handleChange,
  handleBlur,
  stateWho,
}) => {
  return (
    <>
      <LabelSelect
        nameField="Departamento"
        name="ID_DEPARTAMENTOS"
        value={valuesCodigo.ID_DEPARTAMENTOS}
        onChange={e => handleChange(e)}
        onBlur={e => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
        errors={errors.ID_DEPARTAMENTOS}
        className="LabelType1"
        req
      >
        <option value="" disabled>
          Seleccione un departamento
        </option>
        {Departamentos.map(val => {
          return (
            <option value={val["Código"]} key={val["Código"] + val["Nombre"]}>
              {val["Nombre"][0].toUpperCase() +
                val["Nombre"].slice(1).toLocaleLowerCase()}
            </option>
          );
        })}
      </LabelSelect>
      <LabelSelect
        nameField="Municipio"
        name="ID_MUNICIPIOS"
        value={valuesCodigo.ID_MUNICIPIOS}
        onChange={e => handleChange(e)}
        onBlur={e => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
        disabled={valuesCodigo.ID_DEPARTAMENTOS ? false : true}
        errors={errors.ID_MUNICIPIOS}
        className="LabelType1"
        req
      >
        <option value="" disabled>
          {valuesCodigo.ID_DEPARTAMENTOS
            ? "Seleccione un municipio"
            : "Primero seleccione departamento"}
        </option>
        {valuesCodigo.ID_DEPARTAMENTOS &&
          Municipios[valuesCodigo.ID_DEPARTAMENTOS].map(val => {
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
      </LabelSelect>
      <LabelInput
        nameField="Nombre"
        name="NOMBRE"
        onChange={e => handleChange(e)}
        onBlur={e => handleBlur(e, "GENERALIDADES")}
        value={values.NOMBRE}
        className="LabelType1"
        errors={errors.NOMBRE}
        autOff
        req
      />
      {!stateWho && (
        <LabelInput
          nameField="Ubicación"
          name="UBICACION"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES")}
          value={values.UBICACION}
          className="LabelType1"
          errors={errors.UBICACION}
          autOff
        />
      )}
    </>
  );
};

export default GeneralFieldsGeneralidades;
