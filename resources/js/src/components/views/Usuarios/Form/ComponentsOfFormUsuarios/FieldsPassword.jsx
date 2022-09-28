import React from "react";
import ErrorMessage from "../../../ComponentsOfViews/FieldsForm/ErrorMessage";
import FieldInput from "../../../ComponentsOfViews/FieldsForm/FieldInput";
import NameField from "../../../ComponentsOfViews/FieldsForm/NameField";

const FieldsPassword = ({
  viewPassword,
  handleClickView,
  focus,
  values,
  handleChange,
  handleBlur,
  handleFocus,
  errors,
}) => {
  return (
    <>
      <label htmlFor="CLAVE">
        <NameField name="Contraseña" req />
        <div className={`ContainerInput ${focus.CLAVE ? "FocusPassword" : ""}`}>
          <FieldInput
            type={viewPassword.CLAVE ? "text" : "password"}
            name="CLAVE"
            onChange={e => handleChange(e)}
            onBlur={e => handleBlur(e)}
            onFocus={handleFocus}
            value={values.CLAVE}
            placeholder="Minimo 8 caracteres"
            className="notInput"
          />
          {values.CLAVE && (
            <span className="CLAVE" onClick={handleClickView}>
              <img
                src="/img/iconsGeneral/svgViewPassword.svg"
                alt="view password"
                className="CLAVE"
              />
            </span>
          )}
        </div>
        <ErrorMessage errors={errors.CLAVE} />
      </label>
      <label htmlFor="CONFIRMAR_CLAVE">
        <NameField name="Confimar contraseña" req />
        <div
          className={`ContainerInput ${
            focus.CONFIRMAR_CLAVE ? "FocusPassword" : ""
          }`}
        >
          <FieldInput
            type={viewPassword.CONFIRMAR_CLAVE ? "text" : "password"}
            name="CONFIRMAR_CLAVE"
            onChange={e => handleChange(e)}
            onBlur={e => handleBlur(e)}
            onFocus={handleFocus}
            value={values.CONFIRMAR_CLAVE}
            placeholder="Minimo 8 caracteres"
            className="notInput"
          />
          {values.CONFIRMAR_CLAVE && (
            <span className="CONFIRMAR_CLAVE" onClick={handleClickView}>
              <img
                src="/img/iconsGeneral/svgViewPassword.svg"
                alt="view password"
                className="CONFIRMAR_CLAVE"
              />
            </span>
          )}
        </div>
        <ErrorMessage errors={errors.CONFIRMAR_CLAVE} />
      </label>
    </>
  );
};

export default FieldsPassword;
