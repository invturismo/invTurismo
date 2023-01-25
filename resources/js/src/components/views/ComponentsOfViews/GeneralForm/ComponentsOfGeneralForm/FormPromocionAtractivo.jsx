import React from "react";
import LabelInput from "../../FieldsForm/LabelInput";

const FormPromocionAtractivo = ({values, handleChange, handleBlur, errors}) => {
  return (
    <section>
      <div className="infoForm">
        <h3>Promoción del atractivo</h3>
        <small>
          (En este apartado solo se llenan los campos que crea necesarios)
        </small>
      </div>
      <div className="SectionDivType1">
        <LabelInput
          nameField="Folletos y guias"
          name="FOLLETOS_GUIAS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.FOLLETOS_GUIAS}
          className="LabelType1"
          errors={errors.FOLLETOS_GUIAS}
          autOff
        />
        <LabelInput
          nameField="Publicaciones"
          name="PUBLICACIONES"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.PUBLICACIONES}
          className="LabelType1"
          errors={errors.PUBLICACIONES}
          autOff
        />
        <LabelInput
          nameField="TripAdvisor"
          name="TRIPADVISOR"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.TRIPADVISOR}
          className="LabelType1"
          errors={errors.TRIPADVISOR}
          autOff
        />
        <LabelInput
          nameField="Colombia travel"
          name="CTRAVEL"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.CTRAVEL}
          className="LabelType1"
          errors={errors.CTRAVEL}
          autOff
        />
        <LabelInput
          nameField="Google Maps"
          name="GOOGLEM"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.GOOGLEM}
          className="LabelType1"
          errors={errors.GOOGLEM}
          autOff
        />
        <LabelInput
          nameField="Página web"
          name="PAGINA_WEB"
          id="PAGINA_WEB_PROMOCION"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.PAGINA_WEB}
          className="LabelType1"
          errors={errors.PAGINA_WEB}
          autOff
        />
        <LabelInput
          nameField="Youtube"
          name="YOUTUBE"
          id="YOUTUBE_PROMOCION"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.YOUTUBE}
          className="LabelType1"
          errors={errors.YOUTUBE}
          autOff
        />
        <LabelInput
          nameField="Otros"
          name="OTROS"
          id="OTROS_PROMOCION"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "PROMOCION")}
          value={values.OTROS}
          className="LabelType1"
          errors={errors.OTROS}
          autOff
        />
      </div>
    </section>
  );
};

export default FormPromocionAtractivo;
