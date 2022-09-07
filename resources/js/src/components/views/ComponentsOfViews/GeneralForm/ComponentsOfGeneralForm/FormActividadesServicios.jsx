import React from 'react';

const Actividades = ({ values, handleChange,handleBlur,errors }) => {
  return (
    <div className="SectionDivType2">
      <h4>Actividades</h4>
      <div className="SectionDivType1">
        <label htmlFor="CULTURALES" className="LabelType1">
          <span className="NameField">Culturales</span>
          <input
            type="text"
            name="CULTURALES"
            id="CULTURALES"
            onChange={(e) => handleChange(e)}
            onBlur={(e) =>
              handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")
            }
            value={values.CULTURALES}
            autoComplete="off"
          />
          {errors.CULTURALES && (
            <small className="errorMessage">{errors.CULTURALES}</small>
          )}
        </label>
        <label htmlFor="ARTISTICAS" className="LabelType1">
          <span className="NameField">Artisticas</span>
          <input
            type="text"
            name="ARTISTICAS"
            id="ARTISTICAS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) =>
              handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")
            }
            value={values.ARTISTICAS}
            autoComplete="off"
          />
          {errors.ARTISTICAS && (
            <small className="errorMessage">{errors.ARTISTICAS}</small>
          )}
        </label>
        <label htmlFor="FISICAS" className="LabelType1">
          <span className="NameField">Fisicas</span>
          <input
            type="text"
            name="FISICAS"
            id="FISICAS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) =>
              handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")
            }
            value={values.FISICAS}
            autoComplete="off"
          />
          {errors.FISICAS && (
            <small className="errorMessage">{errors.FISICAS}</small>
          )}
        </label>
        <label htmlFor="RECREATIVAS" className="LabelType1">
          <span className="NameField">Recreativas</span>
          <input
            type="text"
            name="RECREATIVAS"
            id="RECREATIVAS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) =>
              handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")
            }
            value={values.RECREATIVAS}
            autoComplete="off"
          />
          {errors.RECREATIVAS && (
            <small className="errorMessage">{errors.RECREATIVAS}</small>
          )}
        </label>
        <label htmlFor="OTROS_ACTIVIDADES" className="LabelType1">
          <span className="NameField">Otros</span>
          <input
            type="text"
            name="OTROS"
            id="OTROS_ACTIVIDADES"
            onChange={(e) => handleChange(e)}
            onBlur={(e) =>
              handleBlur(e, "ACTIVIDADES_SERVICIOS", "ACTIVIDADES")
            }
            value={values.OTROS}
            autoComplete="off"
          />
          {errors.OTROS && (
            <small className="errorMessage">{errors.OTROS}</small>
          )}
        </label>
      </div>
    </div>
  );
};

const Servicios = ({ values, handleChange,errors,handleBlur }) => {
  return (
    <div className="SectionDivType2">
      <h4>Servicios que se ofrecen en el lugar</h4>
      <div className="SectionDivType1">
        <label htmlFor="TIENDAS" className="LabelType1">
          <span className="NameField">Tiendas</span>
          <input
            type="text"
            name="TIENDAS"
            id="TIENDAS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
            value={values.TIENDAS}
            autoComplete="off"
          />
          {errors.TIENDAS && (
            <small className="errorMessage">{errors.TIENDAS}</small>
          )}
        </label>
        <label htmlFor="GUIAS" className="LabelType1">
          <span className="NameField">Guias</span>
          <input
            type="text"
            name="GUIAS"
            id="GUIAS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
            value={values.GUIAS}
            autoComplete="off"
          />
          {errors.GUIAS && (
            <small className="errorMessage">{errors.GUIAS}</small>
          )}
        </label>
        <label htmlFor="BANOS_SERVICIOS" className="LabelType1">
          <span className="NameField">Baños</span>
          <input
            type="text"
            name="BANOS"
            id="BANOS_SERVICIOS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
            value={values.BANOS}
            autoComplete="off"
          />
          {errors.BANOS && (
            <small className="errorMessage">{errors.BANOS}</small>
          )}
        </label>
        <label htmlFor="RESTAURANTES" className="LabelType1">
          <span className="NameField">Restaurantes</span>
          <input
            type="text"
            name="RESTAURANTES"
            id="RESTAURANTES"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
            value={values.RESTAURANTES}
            autoComplete="off"
          />
          {errors.RESTAURANTES && (
            <small className="errorMessage">{errors.RESTAURANTES}</small>
          )}
        </label>
        <label htmlFor="PARQUEADERO" className="LabelType1">
          <span className="NameField">Parqueadero</span>
          <input
            type="text"
            name="PARQUEADERO"
            id="PARQUEADERO"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
            value={values.PARQUEADERO}
            autoComplete="off"
          />
          {errors.PARQUEADERO && (
            <small className="errorMessage">{errors.PARQUEADERO}</small>
          )}
        </label>
        <label htmlFor="ALOJAMIENTO" className="LabelType1">
          <span className="NameField">Alojamiento</span>
          <input
            type="text"
            name="ALOJAMIENTO"
            id="ALOJAMIENTO"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
            value={values.ALOJAMIENTO}
            autoComplete="off"
          />
          {errors.ALOJAMIENTO && (
            <small className="errorMessage">{errors.ALOJAMIENTO}</small>
          )}
        </label>
        <label htmlFor="OTROS_SERVICIOS" className="LabelType1">
          <span className="NameField">Otros</span>
          <input
            type="text"
            name="OTROS"
            id="OTROS_SERVICIOS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "ACTIVIDADES_SERVICIOS", "SERVICIOS")}
            value={values.OTROS}
            autoComplete="off"
          />
          {errors.OTROS && (
            <small className="errorMessage">{errors.OTROS}</small>
          )}
        </label>
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
  who
}) => {
  return (
    <section>
      <h3>Actividades y servicios</h3>
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