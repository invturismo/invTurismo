import React from "react";
import LabelInput from "../../FieldsForm/LabelInput";

const Actividades = ({values, handleChange, handleBlur, errors}) => {
  return (
    <div className="SectionDivType2">
      <h4>Actividades</h4>
      <div className="SectionDivType1">
        <LabelInput
          nameField="Culturales"
          name="CULTURALES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")}
          value={values.CULTURALES}
          className="LabelType1"
          errors={errors.CULTURALES}
          autOff
        />
        <LabelInput
          nameField="Artísticas"
          name="ARTISTICAS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")}
          value={values.ARTISTICAS}
          className="LabelType1"
          errors={errors.ARTISTICAS}
          autOff
        />
        <LabelInput
          nameField="Fisicas"
          name="FISICAS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")}
          value={values.FISICAS}
          className="LabelType1"
          errors={errors.FISICAS}
          autOff
        />
        <LabelInput
          nameField="Recreativas"
          name="RECREATIVAS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")}
          value={values.RECREATIVAS}
          className="LabelType1"
          errors={errors.RECREATIVAS}
          autOff
        />
        <LabelInput
          nameField="Otros"
          name="OTROS"
          id="OTROS_ACTIVIDADES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")}
          value={values.OTROS}
          className="LabelType1"
          errors={errors.OTROS}
          autOff
        />
      </div>
    </div>
  );
};

const Servicios = ({values, handleChange, errors, handleBlur}) => {
  return (
    <div className="SectionDivType2">
      <h4>Servicios que se ofrecen en el lugar</h4>
      <div className="SectionDivType1">
        <LabelInput
          nameField="Tiendas"
          name="TIENDAS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
          value={values.TIENDAS}
          className="LabelType1"
          errors={errors.TIENDAS}
          autOff
        />
        <LabelInput
          nameField="Guías"
          name="GUIAS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
          value={values.GUIAS}
          className="LabelType1"
          errors={errors.GUIAS}
          autOff
        />
        <LabelInput
          nameField="Baños"
          name="BANOS"
          id="BANOS_SERVICIOS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
          value={values.BANOS}
          className="LabelType1"
          errors={errors.BANOS}
          autOff
        />
        <LabelInput
          nameField="Restaurantes"
          name="RESTAURANTES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
          value={values.RESTAURANTES}
          className="LabelType1"
          errors={errors.RESTAURANTES}
          autOff
        />
        <LabelInput
          nameField="Parqueadero"
          name="PARQUEADERO"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
          value={values.PARQUEADERO}
          className="LabelType1"
          errors={errors.PARQUEADERO}
          autOff
        />
        <LabelInput
          nameField="Alojamiento"
          name="ALOJAMIENTO"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
          value={values.ALOJAMIENTO}
          className="LabelType1"
          errors={errors.ALOJAMIENTO}
          autOff
        />
        <LabelInput
          nameField="Otros"
          name="OTROS"
          id="OTROS_SERVICIOS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
          value={values.OTROS}
          className="LabelType1"
          errors={errors.OTROS}
          autOff
        />
      </div>
    </div>
  );
};

const FormActividadesServicios = ({
  values,
  handleChangeActividades,
  handleChangeServicios,
  handleBlur,
  errors,
  who,
}) => {
  return (
    <section>
      <div className="infoForm">
        <h3>Actividades y servicios</h3>
        <small>
          (En este apartado solo se llenan los campos que crea necesarios)
        </small>
      </div>
      <Actividades
        values={values.ACTIVIDADES}
        handleChange={handleChangeActividades}
        errors={errors.ACTIVIDADES}
        handleBlur={handleBlur}
      />
      {who !== 2 && (
        <Servicios
          values={values.SERVICIOS}
          handleChange={handleChangeServicios}
          errors={errors.SERVICIOS}
          handleBlur={handleBlur}
        />
      )}
    </section>
  );
};

export default FormActividadesServicios;
