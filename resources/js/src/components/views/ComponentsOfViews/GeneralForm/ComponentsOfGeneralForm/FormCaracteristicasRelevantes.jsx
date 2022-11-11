import React from "react";
import TipoClima from "../DataJson/DataTipoClima.json";
import AccesoHorarios from "../DataJson/DataAccesoHorarios.json";
import DiasHorarios from "../DataJson/DataDiasHorarios.json";
import TipoEstado from "../DataJson/DataTipoEstadoAtractivo.json";
import {helpCapitalize} from "../../../../../helpers/helpCapitalize";
import LabelSelect from "../../FieldsForm/LabelSelect";
import NameField from "../../FieldsForm/NameField";
import LabelTextarea from "../../FieldsForm/LabelTextarea";
import FieldSelect from "../../FieldsForm/FieldSelect";
import ErrorMessage from "../../FieldsForm/ErrorMessage";
import LabelInput from "../../FieldsForm/LabelInput";

const Clima = ({values, errors, handleChange, handleBlur}) => {
  return (
    <div className="SectionDivType2">
      <h4>Clima</h4>
      <div className="SectionDivType1">
        <LabelSelect
          nameField="Tipo de clima"
          name="ID_TIPO_CLIMA"
          value={values.ID_TIPO_CLIMA}
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES")}
          errors={errors.ID_TIPO_CLIMA}
          className="LabelType1"
        >
          <option value="" disabled>
            Seleccione un tipo de clima
          </option>
          {TipoClima.map(val => {
            return (
              <option
                value={val["ID_TIPO_CLIMA"]}
                key={val["ID_TIPO_CLIMA"] + val["TIPO_CLIMA"]}
              >
                {val["TIPO_CLIMA"]}
              </option>
            );
          })}
        </LabelSelect>
        <LabelInput
          nameField="Temperatura"
          name="TEMPERATURA"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES")}
          value={values.TEMPERATURA}
          className="LabelType1"
          errors={errors.TEMPERATURA}
          autOff
        />
      </div>
    </div>
  );
};

const Horario = ({values, handleChange, errors, handleBlur}) => {
  return (
    <div className="SectionDivType2">
      <h4>Horario</h4>
      <div className="MainHorario">
        <div className="LabelType1 ContainerCheckbox">
          <NameField name="Acceso" />
          <div>
            {AccesoHorarios.map(({NOMBRE}) => {
              return (
                <div
                  className="ContainerOptionAcceso"
                  key={"ACCESO_HORARIOS" + NOMBRE}
                >
                  <input
                    type="checkbox"
                    id={"ACCESO_HORARIOS" + NOMBRE}
                    name="ACCESO_HORARIOS"
                    value={NOMBRE}
                    checked={values.ACCESO_HORARIOS[NOMBRE]}
                    onChange={e => handleChange(e)}
                  />
                  <label htmlFor={"ACCESO_HORARIOS" + NOMBRE}>
                    {helpCapitalize(NOMBRE)}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="LabelType1 ContainerCheckbox">
          <NameField name="Dias de visita" />
          <div>
            {DiasHorarios.map(({NOMBRE}) => {
              return (
                <div
                  className="ContainerOptionAcceso"
                  key={"DIAS_HORARIOS" + NOMBRE}
                >
                  <input
                    type="checkbox"
                    id={"DIAS_HORARIOS" + NOMBRE}
                    name="DIAS_HORARIOS"
                    value={NOMBRE}
                    checked={values.DIAS_HORARIOS[NOMBRE]}
                    onChange={e => handleChange(e)}
                  />
                  <label htmlFor={"DIAS_HORARIOS" + NOMBRE}>
                    {helpCapitalize(NOMBRE)}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <LabelTextarea
          nameField="Descripcion del horario"
          name="HORAS"
          onChange={e => handleChange(e)}
          value={values.DIAS_HORARIOS.HORAS}
          onBlur={e =>
            handleBlur(e, "CARACTERISTICAS_RELEVANTES", "DIAS_HORARIOS")
          }
          rows={3}
          errors={errors.HORAS}
          className="LabelType1"
        />
      </div>
    </div>
  );
};

const Tarifas = ({values, handleChange, handleBlur, errors}) => {
  return (
    <div className="SectionDivType2">
      <h4>Tarifas</h4>
      <div className="SectionDivType1">
        <LabelInput
          nameField="Niños"
          name="NINOS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES", "TARIFAS")}
          value={values.NINOS}
          className="LabelType1"
          errors={errors.NINOS}
          autOff
        />
        <LabelInput
          nameField="Adultos"
          name="ADULTOS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES", "TARIFAS")}
          value={values.ADULTOS}
          className="LabelType1"
          errors={errors.ADULTOS}
          autOff
        />
        <LabelInput
          nameField="Adulto mayor"
          name="ADULTO_MAYOR"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES", "TARIFAS")}
          value={values.ADULTO_MAYOR}
          className="LabelType1"
          errors={errors.ADULTO_MAYOR}
          autOff
        />
        <LabelInput
          nameField="Extranjeros"
          name="EXTRANJEROS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES", "TARIFAS")}
          value={values.EXTRANJEROS}
          className="LabelType1"
          errors={errors.EXTRANJEROS}
          autOff
        />
        <LabelInput
          nameField="Estudiantes"
          name="ESTUDIANTES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES", "TARIFAS")}
          value={values.ESTUDIANTES}
          className="LabelType1"
          errors={errors.ESTUDIANTES}
          autOff
        />
        <LabelInput
          nameField="Cita previa"
          name="CITA_PREVIA"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES", "TARIFAS")}
          value={values.CITA_PREVIA}
          className="LabelType1"
          errors={errors.CITA_PREVIA}
          autOff
        />
        <LabelInput
          nameField="General"
          name="GENERAL"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES", "TARIFAS")}
          value={values.GENERAL}
          className="LabelType1"
          errors={errors.GENERAL}
          autOff
        />
      </div>
    </div>
  );
};

const EstadoAtractivo = ({values, errors, handleChange, handleBlur}) => {
  return (
    <div className="SectionDivType2">
      <h4>Estado del atractivo</h4>
      <div className="SectionDivType1">
        <label htmlFor="ID_ESTADO" className="LabelType1">
          <FieldSelect
            name="ID_ESTADO"
            value={values.ID_ESTADO}
            onChange={e => handleChange(e)}
            onBlur={e => handleBlur(e, "CARACTERISTICAS_RELEVANTES")}
          >
            <option value="" disabled>
              Seleccione un tipo de estado
            </option>
            {TipoEstado.map(val => {
              return (
                <option
                  value={val["ID_ESTADO"]}
                  key={val["ID_ESTADO"] + val["ESTADO"]}
                >
                  {val["ESTADO"]}
                </option>
              );
            })}
          </FieldSelect>
          <ErrorMessage errors={errors.ID_ESTADO} />
        </label>
        <small className="textEstado">
          {values.ID_ESTADO && TipoEstado[values.ID_ESTADO - 1]["DESCRIPCION"]}
        </small>
      </div>
    </div>
  );
};

const FormCaracteristicasRelevantes = ({
  values,
  errors,
  handleChange,
  handleChangeTarifas,
  handleBlur,
  handleChangeCheckbox,
}) => {
  return (
    <section>
      <div className="infoForm">
        <h3>Caracteristicas relevantes</h3>
        <small>
          (En este apartado solo se llenan los campos que crea necesarios)
        </small>
      </div>
      <Clima
        values={values}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <Horario
        values={values}
        handleChange={handleChangeCheckbox}
        handleBlur={handleBlur}
        errors={errors.DIAS_HORARIOS}
      />
      <Tarifas
        values={values.TARIFAS}
        handleChange={handleChangeTarifas}
        errors={errors.TARIFAS}
        handleBlur={handleBlur}
      />
      <EstadoAtractivo
        values={values}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
    </section>
  );
};

export default FormCaracteristicasRelevantes;
