import React from 'react';

const Redes = ({ values, handleChange,errors,handleBlur }) => {
  return (
    <div className="SectionDivType2">
      <h4>Redes sociales</h4>
      <div className="SectionDivType1">
        <label htmlFor="PAGINA_WEB_OTROS" className="LabelType1">
          <span className="NameField">Pagina web</span>
          <input
            type="text"
            name="PAGINA_WEB"
            id="PAGINA_WEB_OTROS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "OTROS", "REDES")}
            value={values.PAGINA_WEB}
            autoComplete="off"
          />
          {errors.PAGINA_WEB && (
            <small className="errorMessage">{errors.PAGINA_WEB}</small>
          )}
        </label>
        <label htmlFor="FACEBOOK" className="LabelType1">
          <span className="NameField">Facebook</span>
          <input
            type="text"
            name="FACEBOOK"
            id="FACEBOOK"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "OTROS", "REDES")}
            value={values.FACEBOOK}
            autoComplete="off"
          />
          {errors.FACEBOOK && (
            <small className="errorMessage">{errors.FACEBOOK}</small>
          )}
        </label>
        <label htmlFor="TWITTER" className="LabelType1">
          <span className="NameField">Twitter</span>
          <input
            type="text"
            name="TWITTER"
            id="TWITTER"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "OTROS", "REDES")}
            value={values.TWITTER}
            autoComplete="off"
          />
          {errors.TWITTER && (
            <small className="errorMessage">{errors.TWITTER}</small>
          )}
        </label>
        <label htmlFor="INSTAGRAM" className="LabelType1">
          <span className="NameField">Instagram</span>
          <input
            type="text"
            name="INSTAGRAM"
            id="INSTAGRAM"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "OTROS", "REDES")}
            value={values.INSTAGRAM}
            autoComplete="off"
          />
          {errors.INSTAGRAM && (
            <small className="errorMessage">{errors.INSTAGRAM}</small>
          )}
        </label>
        <label htmlFor="OTRA_OTROS" className="LabelType1">
          <span className="NameField">Otra</span>
          <input
            type="text"
            name="OTRA"
            id="OTRA_OTROS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "OTROS", "REDES")}
            value={values.OTRA}
            autoComplete="off"
          />
          {errors.OTRA && <small className="errorMessage">{errors.OTRA}</small>}
        </label>
      </div>
    </div>
  );
};

const FormOtros = ({
  values,
  handleChangeRedes,
  handleChange,
  errors,
  handleBlur
}) => {
  return (
    <section>
      <h3>Otros</h3>
      <Redes
        handleChange={handleChangeRedes}
        values={values.REDES}
        errors={errors.REDES}
        handleBlur={handleBlur}
      />
      <div className="SectionDivType2">
        <h4>Referencias bibliograficas</h4>
        <div>
          <label htmlFor="REF_BIBLIOGRAFICA" className="LabelType1">
            <textarea
              name="REF_BIBLIOGRAFICA"
              id="REF_BIBLIOGRAFICA"
              onChange={(e) => handleChange(e)}
              value={values.REF_BIBLIOGRAFICA}
              onBlur={(e) => handleBlur(e, "OTROS")}
              rows={3}
            />
            {errors.REF_BIBLIOGRAFICA && (
              <small className="errorMessage">{errors.REF_BIBLIOGRAFICA}</small>
            )}
          </label>
        </div>
      </div>
      <div className="SectionDivType2">
        <h4>Observaciones</h4>
        <div>
          <label htmlFor="OBSERVACIONES" className="LabelType1">
            <textarea
              name="OBSERVACIONES"
              id="OBSERVACIONES"
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e, "OTROS")}
              value={values.OBSERVACIONES}
              rows={3}
            />
            {errors.OBSERVACIONES && (
              <small className="errorMessage">{errors.OBSERVACIONES}</small>
            )}
          </label>
        </div>
      </div>
    </section>
  );
};

export default FormOtros