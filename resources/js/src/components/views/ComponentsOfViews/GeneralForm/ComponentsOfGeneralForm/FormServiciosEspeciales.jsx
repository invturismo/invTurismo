import React from "react";
import LabelInput from "../../FieldsForm/LabelInput";

const FormServiciosEspeciales = ({
  values,
  handleChange,
  handleBlur,
  errors,
}) => {
  return (
    <section>
      <div className="infoForm">
        <h3>
          Servicios para personas en condición de discapacidad o condiciones
          especiales
        </h3>
        <small>
          (En este apartado solo se llenan los campos que crea necesarios)
        </small>
      </div>
      <div className="SectionDivType1">
        <LabelInput
          nameField="Ascensores"
          name="ASCENSORES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "SERVICIOS_ESPECIALES")}
          value={values.ASCENSORES}
          className="LabelType1"
          errors={errors.ASCENSORES}
          autOff
        />
        <LabelInput
          nameField="Rampas"
          name="RAMPAS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "SERVICIOS_ESPECIALES")}
          value={values.RAMPAS}
          className="LabelType1"
          errors={errors.RAMPAS}
          autOff
        />
        <LabelInput
          nameField="Discapacidad auditiva"
          name="DISCAP_AUDITIVA"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "SERVICIOS_ESPECIALES")}
          value={values.DISCAP_AUDITIVA}
          className="LabelType1"
          errors={errors.DISCAP_AUDITIVA}
          autOff
        />
        <LabelInput
          nameField="Baños"
          name="BANOS"
          id="BANOS_ESPECIALES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "SERVICIOS_ESPECIALES")}
          value={values.BANOS}
          className="LabelType1"
          errors={errors.BANOS}
          autOff
        />
        <LabelInput
          nameField="Movilidad"
          name="MOVILIDAD"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "SERVICIOS_ESPECIALES")}
          value={values.MOVILIDAD}
          className="LabelType1"
          errors={errors.MOVILIDAD}
          autOff
        />
        <LabelInput
          nameField="Otros"
          name="OTROS"
          id="OTROS_ESPECIALES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "SERVICIOS_ESPECIALES")}
          value={values.OTROS}
          className="LabelType1"
          errors={errors.OTROS}
          autOff
        />
      </div>
    </section>
  );
};

export default FormServiciosEspeciales;
