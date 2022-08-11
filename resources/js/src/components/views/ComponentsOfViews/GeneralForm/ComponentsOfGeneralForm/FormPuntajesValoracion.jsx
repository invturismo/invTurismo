import React from "react";
import DataSignificado from "../DataJson/DataSignificado.json";

const Significado = ({ values, errors, handleChange, handleBlur }) => {
  return (
    <div className="SectionDivType2">
      <h4>Significado</h4>
      <div className="SectionDivType1">
        <label htmlFor="ID_SIGNIFICADO" className="LabelType1">
          <select
            name="ID_SIGNIFICADO"
            id="ID_SIGNIFICADO"
            value={values.ID_SIGNIFICADO}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PUNTAJES_VALORACION")}
          >
            <option value="" disabled>
              Seleccione un significado
            </option>
            {DataSignificado.map((val) => {
              return (
                <option
                  value={val["ID_SIGNIFICADO"]}
                  key={val["ID_SIGNIFICADO"] + val["SIGNIFICADO"]}
                >
                  {val["SIGNIFICADO"]}({val["PUNTAJE"]})
                </option>
              );
            })}
          </select>
          {errors.ID_SIGNIFICADO && (
            <small className="errorMessage">{errors.ID_SIGNIFICADO}</small>
          )}
        </label>
      </div>
      <p className="Results">
        <b>Total :</b> {values.TOTAL || "0"}
      </p>
    </div>
  );
};

const CalidadMaterial = ({ values, errors, handleChange, handleBlur }) => {
  return (
    <div className="SectionDivType2">
      <h4>Calidad</h4>
      <div className="SectionDivType1">
        <label htmlFor="ESTADO_CONSERVACION" className="LabelType1">
          <span className="NameField">Estado de conservacion(21)</span>
          <input
            type="number"
            name="ESTADO_CONSERVACION"
            id="ESTADO_CONSERVACION"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PUNTAJES_VALORACION", "CALIDAD")}
            value={values.ESTADO_CONSERVACION}
            min={0}
            max={21}
          />
          {errors.ESTADO_CONSERVACION && (
            <small className="errorMessage">{errors.ESTADO_CONSERVACION}</small>
          )}
        </label>
        <label htmlFor="CONSTITUCION" className="LabelType1">
          <span className="NameField">Constitucion del bien(21)</span>
          <input
            type="number"
            name="CONSTITUCION"
            id="CONSTITUCION"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PUNTAJES_VALORACION", "CALIDAD")}
            value={values.CONSTITUCION}
            min={0}
            max={21}
          />
          {errors.CONSTITUCION && (
            <small className="errorMessage">{errors.CONSTITUCION}</small>
          )}
        </label>
        <label htmlFor="REPRESENTATIVIDAD" className="LabelType1">
          <span className="NameField">Representatividad general(28)</span>
          <input
            type="number"
            name="REPRESENTATIVIDAD"
            id="REPRESENTATIVIDAD"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PUNTAJES_VALORACION", "CALIDAD")}
            value={values.REPRESENTATIVIDAD}
            min={0}
            max={28}
          />
          {errors.REPRESENTATIVIDAD && (
            <small className="errorMessage">{errors.REPRESENTATIVIDAD}</small>
          )}
        </label>
      </div>
      <p className="Results">
        <b>Subtotal:</b> {values.SUBTOTAL || "0"}
      </p>
    </div>
  );
};

const FormPuntajesValoracion = ({
  values,
  errors,
  handleChange,
  handleChangeCalidadMaterial,
  handleBlur,
  who
}) => {
  return (
    <section>
      <h3>Puntajes de valoracion</h3>
      {who === 1 && (
        <CalidadMaterial
          errors={errors.CALIDAD}
          handleBlur={handleBlur}
          handleChange={handleChangeCalidadMaterial}
          values={values.CALIDAD}
        />
      )}
      <Significado
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        values={values}
      />
    </section>
  );
};

export default FormPuntajesValoracion;
