import React from 'react';

const FormPromocionAtractivo = ({
  values,
  handleChange,
  handleBlur,
  errors,
}) => {
  return (
    <section>
      <h3>Promocion del atractivo</h3>
      <div className="SectionDivType1">
        <label htmlFor="FOLLETOS_GUIAS" className="LabelType1">
          <span className="NameField">Folletos y guias</span>
          <input
            type="text"
            name="FOLLETOS_GUIAS"
            id="FOLLETOS_GUIAS"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
            value={values.FOLLETOS_GUIAS}
            autoComplete="off"
          />
          {errors.FOLLETOS_GUIAS && (
            <small className="errorMessage">{errors.FOLLETOS_GUIAS}</small>
          )}
        </label>
        <label htmlFor="PUBLICACIONES" className="LabelType1">
          <span className="NameField">Publicaciones</span>
          <input
            type="text"
            name="PUBLICACIONES"
            id="PUBLICACIONES"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
            value={values.PUBLICACIONES}
            autoComplete="off"
          />
          {errors.PUBLICACIONES && (
            <small className="errorMessage">{errors.PUBLICACIONES}</small>
          )}
        </label>
        <label htmlFor="TRIPADVISOR" className="LabelType1">
          <span className="NameField">TripAdvisor</span>
          <input
            type="text"
            name="TRIPADVISOR"
            id="TRIPADVISOR"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
            value={values.TRIPADVISOR}
            autoComplete="off"
          />
          {errors.TRIPADVISOR && (
            <small className="errorMessage">{errors.TRIPADVISOR}</small>
          )}
        </label>
        <label htmlFor="CTRAVEL" className="LabelType1">
          <span className="NameField">Colombia travel</span>
          <input
            type="text"
            name="CTRAVEL"
            id="CTRAVEL"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
            value={values.CTRAVEL}
            autoComplete="off"
          />
          {errors.CTRAVEL && (
            <small className="errorMessage">{errors.CTRAVEL}</small>
          )}
        </label>
        <label htmlFor="GOOGLEM" className="LabelType1">
          <span className="NameField">Google Maps</span>
          <input
            type="text"
            name="GOOGLEM"
            id="GOOGLEM"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
            value={values.GOOGLEM}
            autoComplete="off"
          />
          {errors.GOOGLEM && (
            <small className="errorMessage">{errors.GOOGLEM}</small>
          )}
        </label>
        <label htmlFor="PAGINA_WEB_PROMOCION" className="LabelType1">
          <span className="NameField">Pagina web</span>
          <input
            type="text"
            name="PAGINA_WEB"
            id="PAGINA_WEB_PROMOCION"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
            value={values.PAGINA_WEB}
            autoComplete="off"
          />
          {errors.PAGINA_WEB && (
            <small className="errorMessage">{errors.PAGINA_WEB}</small>
          )}
        </label>
        <label htmlFor="YOUTUBE_PROMOCION" className="LabelType1">
          <span className="NameField">Youtube</span>
          <input
            type="text"
            name="YOUTUBE"
            id="YOUTUBE_PROMOCION"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
            value={values.YOUTUBE}
            autoComplete="off"
          />
          {errors.YOUTUBE && (
            <small className="errorMessage">{errors.YOUTUBE}</small>
          )}
        </label>
        <label htmlFor="OTROS_PROMOCION" className="LabelType1">
          <span className="NameField">Otros</span>
          <input
            type="text"
            name="OTROS"
            id="OTROS_PROMOCION"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "PROMOCION")}
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

export default FormPromocionAtractivo;