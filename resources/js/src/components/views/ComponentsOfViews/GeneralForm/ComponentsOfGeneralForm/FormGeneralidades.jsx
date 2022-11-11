import React from "react";
import LabelInput from "../../FieldsForm/LabelInput";
import LabelSelect from "../../FieldsForm/LabelSelect";
import GeneralFieldsGeneralidades from "../../GeneralFieldsGeneralidades";
import TipoAcceso from "../DataJson/DataTipoAcceso.json";

const ExtraDataGeneralidades = ({
  values,
  errors,
  handleChange,
  handleBlur,
  who,
}) => {
  return (
    <>
      <LabelInput
        nameField="Georrefereniciación"
        name="GEORREFERENCIACION"
        onChange={e => handleChange(e)}
        onBlur={e => handleBlur(e, "GENERALIDADES")}
        value={values.GEORREFERENCIACION}
        className="LabelType1"
        errors={errors.GEORREFERENCIACION}
        autOff
        req
      />
      <LabelSelect
        nameField="Tipo de Acceso"
        name="ID_TIPO_ACCESO"
        value={values.ID_TIPO_ACCESO}
        onChange={e => handleChange(e)}
        onBlur={e => handleBlur(e, "GENERALIDADES")}
        errors={errors.ID_TIPO_ACCESO}
        className="LabelType1"
        req
      >
        <option value="" disabled>
          Seleccione un tipo de acceso
        </option>
        {TipoAcceso.map(val => {
          return (
            <option
              value={val["ID_TIPO_ACCESO"]}
              key={val["ID_TIPO_ACCESO"] + val["ACCESO"]}
            >
              {val["ACCESO"]}
            </option>
          );
        })}
      </LabelSelect>
      {who !== 2 && (
        <LabelInput
          nameField="Indicaciones para el acceso:"
          name="INDICACIONES_ACCESO"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES")}
          value={values.INDICACIONES_ACCESO}
          className="LabelType1"
          errors={errors.INDICACIONES_ACCESO}
          autOff
        />
      )}
    </>
  );
};

const AdminPropietario = ({values, errors, handleChange, handleBlur}) => {
  return (
    <div className="SectionDivType2">
      <h4>Datos propietario/tenedor</h4>
      <div className="SectionDivType1">
        <LabelInput
          nameField="Nombre"
          name="NOMBRE"
          id="NOMBRE_PROPIETARIO"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
          value={values.NOMBRE}
          className="LabelType1"
          errors={errors.NOMBRE}
          autOff
          req
        />
        <LabelInput
          nameField="Direccion/Ubicacion"
          name="DIRECCION_UBICACION"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
          value={values.DIRECCION_UBICACION}
          className="LabelType1"
          errors={errors.DIRECCION_UBICACION}
          autOff
          req
        />
        <LabelInput
          nameField="Correo"
          type="email"
          name="CORREO"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
          value={values.CORREO}
          className="LabelType1"
          errors={errors.CORREO}
          autOff
        />
        <LabelInput
          nameField="Telefono 1"
          name="TELEFONO1"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
          value={values.TELEFONO1}
          className="LabelType1"
          errors={errors.TELEFONO1}
          autOff
        />
        <LabelInput
          nameField="Telefono 2"
          name="TELEFONO2"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES", "ADMIN/PROPIETARIOS")}
          value={values.TELEFONO2}
          className="LabelType1"
          errors={errors.TELEFONO2}
          autOff
        />
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
  who,
}) => {
  return (
    <section>
      <h3>Generalidades</h3>
      <div className="SectionDivType1">
        <GeneralFieldsGeneralidades
          errors={{...errors, ...errorsCod}}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          valuesCodigo={valuesCodigo}
          stateWho={who === 2}
        />
        <LabelInput
          nameField="Corregimiento, Vereda o Localidad"
          name="CORREGIMIENTO_VEREDA_LOCALIDAD"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "GENERALIDADES")}
          value={values.CORREGIMIENTO_VEREDA_LOCALIDAD}
          className="LabelType1"
          errors={errors.CORREGIMIENTO_VEREDA_LOCALIDAD}
          autOff
        />
        <ExtraDataGeneralidades
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          who={who}
        />
      </div>
      {who !== 2 && (
        <AdminPropietario
          errors={errors["ADMIN/PROPIETARIOS"]}
          handleBlur={handleBlur}
          handleChange={handleChangeAdminPropietario}
          values={values["ADMIN/PROPIETARIOS"]}
        />
      )}
    </section>
  );
};

export default FormGeneralidades;
