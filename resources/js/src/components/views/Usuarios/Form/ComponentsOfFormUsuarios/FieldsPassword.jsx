import React from 'react'

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
        <span className="NameField">Contraseña</span>
        <div className={`ContainerInput ${focus.CLAVE ? "FocusPassword" : ""}`}>
          <input
            type={viewPassword.CLAVE ? "text" : "password"}
            name="CLAVE"
            id="CLAVE"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            onFocus={handleFocus}
            value={values.CLAVE}
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
        {errors.CLAVE && <small className="errorMessage">{errors.CLAVE}</small>}
      </label>
      <label htmlFor="CONFIRMAR_CLAVE">
        <span className="NameField">Confimar contraseña</span>
        <div
          className={`ContainerInput ${
            focus.CONFIRMAR_CLAVE ? "FocusPassword" : ""
          }`}
        >
          <input
            type={viewPassword.CONFIRMAR_CLAVE ? "text" : "password"}
            name="CONFIRMAR_CLAVE"
            id="CONFIRMAR_CLAVE"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
            onFocus={handleFocus}
            value={values.CONFIRMAR_CLAVE}
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
        {errors.CONFIRMAR_CLAVE && (
          <small className="errorMessage">{errors.CONFIRMAR_CLAVE}</small>
        )}
      </label>
    </>
  );
};

export default FieldsPassword