import React from "react";
import ErrorMessage from "../../FieldsForm/ErrorMessage";
import LabelInput from "../../FieldsForm/LabelInput";
import LabelSelect from "../../FieldsForm/LabelSelect";
import TextArea from "../../FieldsForm/TextArea";

const Redes = ({values, handleChange, errors, handleBlur}) => {
  return (
    <div className="SectionDivType2">
      <h4>Redes sociales</h4>
      <div className="SectionDivType1">
        <LabelInput
          nameField="Pagina web"
          name="PAGINA_WEB"
          id="PAGINA_WEB_OTROS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "OTROS", "REDES")}
          value={values.PAGINA_WEB}
          className="LabelType1"
          errors={errors.PAGINA_WEB}
          autOff
        />
        <LabelInput
          nameField="Facebook"
          name="FACEBOOK"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "OTROS", "REDES")}
          value={values.FACEBOOK}
          className="LabelType1"
          errors={errors.FACEBOOK}
          autOff
        />
        <LabelInput
          nameField="Twitter"
          name="TWITTER"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "OTROS", "REDES")}
          value={values.TWITTER}
          className="LabelType1"
          errors={errors.TWITTER}
          autOff
        />
        <LabelInput
          nameField="Instagram"
          name="INSTAGRAM"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "OTROS", "REDES")}
          value={values.INSTAGRAM}
          className="LabelType1"
          errors={errors.INSTAGRAM}
          autOff
        />
        <LabelInput
          nameField="Otra"
          name="OTRA"
          id="OTRA_OTROS"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "OTROS", "REDES")}
          value={values.OTRA}
          className="LabelType1"
          errors={errors.OTRA}
          autOff
        />
      </div>
    </div>
  );
};

const Internacional = ({values, handleChange, handleBlur, errors}) => {
  return (
    <div className="SectionDivType2">
      <h4>Internacional</h4>
      <div className="SectionDivType1">
        <LabelSelect
          nameField="Tipo de Acceso"
          name="APRO_INTERNACIONAL"
          id="APRO_INTERNACIONAL"
          value={values.APRO_INTERNACIONAL}
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "OTROS")}
          errors={errors.APRO_INTERNACIONAL}
          className="LabelType1"
        >
          <option value="false">No</option>
          <option value="true">Si</option>
        </LabelSelect>
      </div>
    </div>
  );
};

const FormOtros = ({
  values,
  handleChangeRedes,
  handleChange,
  errors,
  handleBlur,
  who,
}) => {
  return (
    <section>
      <div className="infoForm">
        <h3>Otros</h3>
        <small>
          (En este apartado solo se llenan los campos que crea necesarios)
        </small>
      </div>
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
            <TextArea
              name="REF_BIBLIOGRAFICA"
              onChange={e => handleChange(e)}
              value={values.REF_BIBLIOGRAFICA}
              onBlur={e => handleBlur(e, "OTROS")}
              rows={3}
            />
            <ErrorMessage errors={errors.REF_BIBLIOGRAFICA} />
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
            <TextArea
              name="OBSERVACIONES"
              onChange={e => handleChange(e)}
              value={values.OBSERVACIONES}
              onBlur={e => handleBlur(e, "OTROS")}
              rows={3}
            />
            <ErrorMessage errors={errors.OBSERVACIONES} />
          </label>
        </div>
      </div>
      {who === 4 && (
        <Internacional
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
        />
      )}
    </section>
  );
};

export default FormOtros;
