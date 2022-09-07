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

const LabelCalidad = ({
  name,
  NameField,
  max,
  handleChange,
  handleBlur,
  values,
  errors,
}) => {
  return (
    <label htmlFor={name} className="LabelType1">
      <span className="NameField">{`${NameField} (${max})`}</span>
      <input
        type="number"
        name={name}
        id={name}
        onChange={(e) => handleChange(e)}
        onBlur={(e) => handleBlur(e, "PUNTAJES_VALORACION", "CALIDAD")}
        value={values[name]}
        min={0}
        max={max}
      />
      {errors[name] && <small className="errorMessage">{errors[name]}</small>}
    </label>
  );
};

const CalidadMaterial = (props) => {
  return (
    <div className="SectionDivType2">
      <h4>Calidad</h4>
      <div className="SectionDivType1">
        <LabelCalidad
          NameField={"Estado de conservacion"}
          max={21}
          name="ESTADO_CONSERVACION"
          {...props}
        />
        <LabelCalidad
          NameField={"Constitucion del bien"}
          max={21}
          name="CONSTITUCION"
          {...props}
        />
        <LabelCalidad
          NameField={"Representatividad general"}
          max={28}
          name="REPRESENTATIVIDAD"
          {...props}
        />
      </div>
      <p className="Results">
        <b>Subtotal:</b> {props.values.SUBTOTAL || "0"}
      </p>
    </div>
  );
};

const CalidadInmaterial = (props) => {
  return (
    <div className="SectionDivType2">
      <h4>Calidad</h4>
      <div className="SectionDivType1">
        <LabelCalidad
          NameField={"Colectiva"}
          max={14}
          name="COLECTIVA"
          {...props}
        />
        <LabelCalidad
          NameField={"Tradicional"}
          max={14}
          name="TRADICIONAL"
          {...props}
        />
        <LabelCalidad
          NameField={"Anónima"}
          max={14}
          name="ANONIMA"
          {...props}
        />
        <LabelCalidad
          NameField={"Espontánea"}
          max={14}
          name="ESPONTANEA"
          {...props}
        />
        <LabelCalidad
          NameField={"Popular"}
          max={14}
          name="POPULAR"
          {...props}
        />
      </div>
      <p className="Results">
        <b>Subtotal:</b> {props.values.SUBTOTAL || "0"}
      </p>
    </div>
  );
};

const FormPuntajesValoracion = ({
  values,
  errors,
  handleChange,
  handleChangeCalidadMaterial,
  handleChangeCalidadInmaterial,
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
      {who === 2 && (
        <CalidadInmaterial
          errors={errors.CALIDAD}
          handleBlur={handleBlur}
          handleChange={handleChangeCalidadInmaterial}
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
