import React from "react";
import ErrorMessage from "../../FieldsForm/ErrorMessage";
import FieldSelect from "../../FieldsForm/FieldSelect";
import LabelInput from "../../FieldsForm/LabelInput";
import DataSignificado from "../DataJson/DataSignificado.json";

const Significado = ({values, errors, handleChange, handleBlur}) => {
  return (
    <div className="SectionDivType2">
      <h4>Significado</h4>
      <div className="SectionDivType1">
        <label htmlFor="ID_SIGNIFICADO" className="LabelType1">
          <FieldSelect
            name="ID_SIGNIFICADO"
            value={values.ID_SIGNIFICADO}
            onChange={e => handleChange(e)}
            onBlur={e => handleBlur(e, "PUNTAJES_VALORACION")}
          >
            <option value="" disabled>
              Seleccione un significado
            </option>
            {DataSignificado.map(val => {
              return (
                <option
                  value={val["ID_SIGNIFICADO"]}
                  key={val["ID_SIGNIFICADO"] + val["SIGNIFICADO"]}
                >
                  {val["SIGNIFICADO"]}({val["PUNTAJE"]})
                </option>
              );
            })}
          </FieldSelect>
          <ErrorMessage errors={errors.ID_SIGNIFICADO} />
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
    <LabelInput
      type="number"
      name={name}
      id={name}
      onChange={e => handleChange(e)}
      onBlur={e => handleBlur(e, "PUNTAJES_VALORACION", "CALIDAD")}
      value={values[name]}
      min={0}
      max={max}
      className="LabelType1"
      nameField={`${NameField} (${max})`}
      errors={errors[name]}
      req
    />
  );
};

const CalidadMaterial = props => {
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

const CalidadInmaterial = props => {
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

const CalidadGrupos = props => {
  return (
    <div className="SectionDivType2">
      <h4>Calidad</h4>
      <div className="SectionDivType1">
        <LabelCalidad
          NameField={"Respeto por las costumbres"}
          max={70}
          name="R_COSTUMBRES"
          {...props}
        />
      </div>
      <p className="Results">
        <b>Subtotal:</b> {props.values.SUBTOTAL || "0"}
      </p>
    </div>
  );
};

const CalidadFestividades = props => {
  return (
    <div className="SectionDivType2">
      <h4>Calidad</h4>
      <div className="SectionDivType1">
        <LabelCalidad
          NameField={"Organización del evento"}
          max={30}
          name="ORGANIZACION"
          {...props}
        />
        <LabelCalidad
          NameField={"Beneficios socioculturales para la comunidad"}
          max={20}
          name="B_SOCIOCULTURALES"
          {...props}
        />
        <LabelCalidad
          NameField={"Beneficios económicos locales"}
          max={20}
          name="B_ECONOMICOS"
          {...props}
        />
      </div>
      <p className="Results">
        <b>Subtotal:</b> {props.values.SUBTOTAL || "0"}
      </p>
    </div>
  );
};

const CalidadSitios = props => {
  return (
    <div className="SectionDivType2">
      <h4>Calidad</h4>
      <div className="SectionDivType1">
        <LabelCalidad
          NameField={"Sin contaminación del aire"}
          max={10}
          name="S_C_AIRE"
          {...props}
        />
        <LabelCalidad
          NameField={"Sin contaminación del agua"}
          max={10}
          name="S_C_AGUA"
          {...props}
        />
        <LabelCalidad
          NameField={"Sin contaminación visual"}
          max={10}
          name="S_C_VISUAL"
          {...props}
        />
        <LabelCalidad
          NameField={"Estado de conservación"}
          max={10}
          name="CONSERVACION"
          {...props}
        />
        <LabelCalidad
          NameField={"Sin contaminación sonora"}
          max={10}
          name="S_C_SONORA"
          {...props}
        />
        <LabelCalidad
          NameField={"Diversidad"}
          max={10}
          name="DIVERSIDAD"
          {...props}
        />
        <LabelCalidad
          NameField={"Singularidad"}
          max={10}
          name="SINGULARIDAD"
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
  handleChangeCalidadGrupos,
  handleChangeCalidadSitios,
  handleChangeCalidadFestividades,
  handleBlur,
  who,
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
      {who === 3 && (
        <CalidadFestividades
          errors={errors.CALIDAD}
          handleBlur={handleBlur}
          handleChange={handleChangeCalidadFestividades}
          values={values.CALIDAD}
        />
      )}
      {who === 4 && (
        <CalidadGrupos
          errors={errors.CALIDAD}
          handleBlur={handleBlur}
          handleChange={handleChangeCalidadGrupos}
          values={values.CALIDAD}
        />
      )}
      {who === 5 && (
        <CalidadSitios
          errors={errors.CALIDAD}
          handleBlur={handleBlur}
          handleChange={handleChangeCalidadSitios}
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
