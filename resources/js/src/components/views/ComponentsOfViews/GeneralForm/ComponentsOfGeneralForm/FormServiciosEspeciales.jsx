import React from 'react';

const FormServiciosEspeciales = ({
  values,
  handleChange,
  handleBlur,
  errors,
}) => {
  return (
    <section>
      <h3>
        Servicios para personas en condición de discapacidad o condiciones
        especiales
      </h3>
      <div className="SectionDivType1">
        <label htmlFor="ASCENSORES" className="LabelType1">
          <span className="NameField">Ascensores</span>
          <input
            type="text"
            name="ASCENSORES"
            id="ASCENSORES"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "SERVICIOS_ESPECIALES")}
            value={values.ASCENSORES}
            autoComplete="off"
          />
          {errors.ASCENSORES && (
            <small className="errorMessage">{errors.ASCENSORES}</small>
          )}
        </label>
        <label htmlFor="RAMPAS" className="LabelType1">
          <span className="NameField">Rampas</span>
          <input
            type="text"
            name="RAMPAS"
            id="RAMPAS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "SERVICIOS_ESPECIALES")}
            value={values.RAMPAS}
            autoComplete="off"
          />
          {errors.RAMPAS && (
            <small className="errorMessage">{errors.RAMPAS}</small>
          )}
        </label>
        <label htmlFor="DISCAP_AUDITIVA" className="LabelType1">
          <span className="NameField">Discapacidad auditiva</span>
          <input
            type="text"
            name="DISCAP_AUDITIVA"
            id="DISCAP_AUDITIVA"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "SERVICIOS_ESPECIALES")}
            value={values.DISCAP_AUDITIVA}
            autoComplete="off"
          />
          {errors.DISCAP_AUDITIVA && (
            <small className="errorMessage">{errors.DISCAP_AUDITIVA}</small>
          )}
        </label>
        <label htmlFor="BANOS_ESPECIALES" className="LabelType1">
          <span className="NameField">Baños</span>
          <input
            type="text"
            name="BANOS"
            id="BANOS_ESPECIALES"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "SERVICIOS_ESPECIALES")}
            value={values.BANOS}
            autoComplete="off"
          />
          {errors.BANOS && (
            <small className="errorMessage">{errors.BANOS}</small>
          )}
        </label>
        <label htmlFor="MOVILIDAD" className="LabelType1">
          <span className="NameField">Movilidad</span>
          <input
            type="text"
            name="MOVILIDAD"
            id="MOVILIDAD"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "SERVICIOS_ESPECIALES")}
            value={values.MOVILIDAD}
            autoComplete="off"
          />
          {errors.MOVILIDAD && (
            <small className="errorMessage">{errors.MOVILIDAD}</small>
          )}
        </label>
        <label htmlFor="OTROS_ESPECIALES" className="LabelType1">
          <span className="NameField">Otros</span>
          <input
            type="text"
            name="OTROS"
            id="OTROS_ESPECIALES"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "SERVICIOS_ESPECIALES")}
            value={values.OTROS}
            autoComplete="off"
          />
          {errors.OTROS && (
            <small className="errorMessage">{errors.OTROS}</small>
          )}
        </label>
      </div>
    </section>
  );
};

export default FormServiciosEspeciales