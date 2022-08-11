import React from 'react'
import GeneralFieldsGeneralidades from '../../GeneralFieldsGeneralidades';
import TipoAcceso from "../DataJson/DataTipoAcceso.json";

const ExtraDataGeneralidades = ({
  values,
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <>
      <label htmlFor="GEORREFERENCIACION" className="LabelType1">
        <span className="NameField">Georrefereniciación</span>
        <input
          type="text"
          name="GEORREFERENCIACION"
          id="GEORREFERENCIACION"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, "GENERALIDADES")}
          value={values.GEORREFERENCIACION}
          autoComplete="off"
        />
        {errors.GEORREFERENCIACION && (
          <small className="errorMessage">{errors.GEORREFERENCIACION}</small>
        )}
      </label>
      <label htmlFor="ID_TIPO_ACCESO" className="LabelType1">
        <span className="NameField">Tipo de Acceso</span>
        <select
          name="ID_TIPO_ACCESO"
          id="ID_TIPO_ACCESO"
          value={values.ID_TIPO_ACCESO}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, "GENERALIDADES")}
        >
          <option value="" disabled>
            Seleccione un tipo de acceso
          </option>
          {TipoAcceso.map((val) => {
            return (
              <option
                value={val["ID_TIPO_ACCESO"]}
                key={val["ID_TIPO_ACCESO"] + val["ACCESO"]}
              >
                {val["ACCESO"]}
              </option>
            );
          })}
        </select>
        {errors.ID_TIPO_ACCESO && (
          <small className="errorMessage">{errors.ID_TIPO_ACCESO}</small>
        )}
      </label>
      <label htmlFor="INDICACIONES_ACCESO" className="LabelType1">
        <span className="NameField">Indicaciones para el acceso:</span>
        <input
          type="text"
          name="INDICACIONES_ACCESO"
          id="INDICACIONES_ACCESO"
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleBlur(e, "GENERALIDADES")}
          value={values.INDICACIONES_ACCESO}
          autoComplete="off"
        />
        {errors.INDICACIONES_ACCESO && (
          <small className="errorMessage">{errors.INDICACIONES_ACCESO}</small>
        )}
      </label>
    </>
  );
};

const AdminPropietario = ({
  values,
  errors,
  handleChange,
  handleBlur,
}) => {
  return (
    <div className="SectionDivType2">
      <h4>Datos propietario/tenedor</h4>
      <div className="SectionDivType1">
        <label htmlFor="NOMBRE_PROPIETARIO" className="LabelType1">
          <span className="NameField">Nombre</span>
          <input
            type="text"
            name="NOMBRE"
            id="NOMBRE_PROPIETARIO"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
            value={values.NOMBRE}
            autoComplete="off"
          />
          {errors.NOMBRE && (
            <small className="errorMessage">{errors.NOMBRE}</small>
          )}
        </label>
        <label htmlFor="DIRECCION_UBICACION" className="LabelType1">
          <span className="NameField">Direccion/Ubicacion</span>
          <input
            type="text"
            name="DIRECCION_UBICACION"
            id="DIRECCION_UBICACION"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
            value={values.DIRECCION_UBICACION}
            autoComplete="off"
          />
          {errors.DIRECCION_UBICACION && (
            <small className="errorMessage">{errors.DIRECCION_UBICACION}</small>
          )}
        </label>
        <label htmlFor="CORREO" className="LabelType1">
          <span className="NameField">Correo</span>
          <input
            type="email"
            name="CORREO"
            id="CORREO"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
            value={values.CORREO}
            autoComplete="off"
          />
          {errors.CORREO && (
            <small className="errorMessage">{errors.CORREO}</small>
          )}
        </label>
        <label htmlFor="TELEFONO1" className="LabelType1">
          <span className="NameField">Telefono 1</span>
          <input
            type="text"
            name="TELEFONO1"
            id="TELEFONO1"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
            value={values.TELEFONO1}
            autoComplete="off"
          />
          {errors.TELEFONO1 && (
            <small className="errorMessage">{errors.TELEFONO1}</small>
          )}
        </label>
        <label htmlFor="TELEFONO2" className="LabelType1">
          <span className="NameField">Telefono 2</span>
          <input
            type="text"
            name="TELEFONO2"
            id="TELEFONO2"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
            value={values.TELEFONO2}
            autoComplete="off"
          />
          {errors.TELEFONO2 && (
            <small className="errorMessage">{errors.TELEFONO2}</small>
          )}
        </label>
      </div>
    </div>
  );
};

const FormGeneralidades = ({
  values,
  valuesCodigo,
  errors,
  errorsCod,
  handleChange,
  handleChangeAdminPropietario,
  handleBlur,
}) => {
  return (
    <section>
      <h3>Generalidades</h3>
      <div className="SectionDivType1">
        <GeneralFieldsGeneralidades
          errors={{ ...errors, ...errorsCod }}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          valuesCodigo={valuesCodigo}
        />
        <label htmlFor="CORREGIMIENTO_VEREDA_LOCALIDAD" className="LabelType1">
          <span className="NameField">Corregimiento, Vereda o Localidad</span>
          <input
            type="text"
            name="CORREGIMIENTO_VEREDA_LOCALIDAD"
            id="CORREGIMIENTO_VEREDA_LOCALIDAD"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "GENERALIDADES")}
            value={values.CORREGIMIENTO_VEREDA_LOCALIDAD}
            autoComplete="off"
          />
          {errors.CORREGIMIENTO_VEREDA_LOCALIDAD && (
            <small className="errorMessage">
              {errors.CORREGIMIENTO_VEREDA_LOCALIDAD}
            </small>
          )}
        </label>
        <ExtraDataGeneralidades
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
        />
      </div>
      <AdminPropietario
        errors={errors["ADMIN/PROPIETARIOS"]}
        handleBlur={handleBlur}
        handleChange={handleChangeAdminPropietario}
        values={values["ADMIN/PROPIETARIOS"]}
      />
    </section>
  );
};

export default FormGeneralidades