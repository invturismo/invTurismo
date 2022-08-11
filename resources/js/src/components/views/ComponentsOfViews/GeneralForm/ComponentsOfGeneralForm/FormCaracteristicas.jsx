import React from 'react';
import TiposPatrimonio from "../DataJson/DataTiposPatrimonio.json";
import Grupos from "../DataJson/DataGrupos.json";
import Componentes from "../DataJson/DataComponentes.json";
import Elementos from "../DataJson/DataElementos.json";

const Codigo = ({
  values,
  valuesDes,
  errors,
  errorDescripcion,
  handleChange,
  handleBlur,
  handleChangeDes,
}) => {
  return (
    <div className="SectionDivType2">
      <h4>Codigo</h4>
      <div>
        <p className="TextCodigo">
          <span>{values.ID_DEPARTAMENTOS || "--"} .</span>
          <span>{values.ID_MUNICIPIOS || "--"} .</span>
          <span>{values.ID_TIPO_PATRIMONIO || "--"} .</span>
          <span>{values.ID_GRUPO || "--"} .</span>
          <span>{values.ID_COMPONENTE || "--"} .</span>
          <span>{values.ID_ELEMENTO || "--"}</span>
        </p>
        <div className="SectionDivType1">
          <label htmlFor="ID_TIPO_PATRIMONIO" className="LabelType1">
            <span className="NameField">Tipo de patrimonio</span>
            <select
              name="ID_TIPO_PATRIMONIO"
              id="ID_TIPO_PATRIMONIO"
              value={values.ID_TIPO_PATRIMONIO}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
              disabled={values.ID_MUNICIPIOS ? false : true}
            >
              <option value="" disabled>
                {values.ID_MUNICIPIOS
                  ? "Seleccione un tipo de patrimonio"
                  : "Primero seleccione un municipio"}
              </option>
              {values.ID_MUNICIPIOS &&
                TiposPatrimonio.map((val) => {
                  return (
                    <option
                      value={val["ID_TIPO_PATRIMONIO"]}
                      key={val["ID_TIPO_PATRIMONIO"] + val["PATROMONIO"]}
                    >
                      {val["PATROMONIO"]}
                    </option>
                  );
                })}
            </select>
            {errors.ID_TIPO_PATRIMONIO && (
              <small className="errorMessage">
                {errors.ID_TIPO_PATRIMONIO}
              </small>
            )}
          </label>
          <label htmlFor="ID_GRUPO" className="LabelType1">
            <span className="NameField">Grupo</span>
            <select
              name="ID_GRUPO"
              id="ID_GRUPO"
              value={values.ID_GRUPO}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
              disabled={values.ID_TIPO_PATRIMONIO ? false : true}
            >
              <option value="" disabled>
                {values.ID_TIPO_PATRIMONIO
                  ? "Seleccione un grupo"
                  : "Primero seleccione tipo de patrimonio"}
              </option>
              {values.ID_TIPO_PATRIMONIO &&
                Grupos[values.ID_TIPO_PATRIMONIO].map((val) => {
                  return (
                    <option
                      value={val["ID_GRUPO"]}
                      key={val["ID_GRUPO"] + val["GRUPO"]}
                    >
                      {val["GRUPO"]}
                    </option>
                  );
                })}
            </select>
            {errors.ID_GRUPO && (
              <small className="errorMessage">{errors.ID_GRUPO}</small>
            )}
          </label>
          {values.ID_TIPO_PATRIMONIO &&
            values.ID_GRUPO &&
            Componentes[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO] && (
              <label htmlFor="ID_COMPONENTE" className="LabelType1">
                <span className="NameField">Componente</span>
                <select
                  name="ID_COMPONENTE"
                  id="ID_COMPONENTE"
                  value={values.ID_COMPONENTE}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
                >
                  <option value="" disabled>
                    Seleccione un componente
                  </option>
                  {Componentes[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO].map(
                    (val) => {
                      return (
                        <option
                          value={val["ID_COMPONENTE"]}
                          key={val["ID_COMPONENTE"] + val["COMPONENTE"]}
                        >
                          {val["COMPONENTE"]}
                        </option>
                      );
                    }
                  )}
                </select>
                {errors.ID_COMPONENTE && (
                  <small className="errorMessage">{errors.ID_COMPONENTE}</small>
                )}
              </label>
            )}
          {values.ID_TIPO_PATRIMONIO &&
            values.ID_GRUPO &&
            values.ID_COMPONENTE &&
            Elementos[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO] &&
            Elementos[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO][
              values.ID_COMPONENTE
            ] && (
              <label htmlFor="ID_ELEMENTO" className="LabelType1">
                <span className="NameField">Elemento</span>
                <select
                  name="ID_ELEMENTO"
                  id="ID_ELEMENTO"
                  value={values.ID_ELEMENTO}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
                >
                  <option value="" disabled>
                    Seleccione un elemento
                  </option>
                  {Elementos[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO][
                    values.ID_COMPONENTE
                  ].map((val) => {
                    return (
                      <option
                        value={val["ID_ELEMENTO"]}
                        key={val["ID_ELEMENTO"] + val["ELEMENTO"]}
                      >
                        {val["ELEMENTO"]}
                      </option>
                    );
                  })}
                </select>
                {errors.ID_ELEMENTO && (
                  <small className="errorMessage">{errors.ID_ELEMENTO}</small>
                )}
              </label>
            )}
        </div>
        <label
          htmlFor="DESCRIPCION_CARACTERISTICAS"
          className="LabelType1 ContainerTextArea"
        >
          <span className="NameField">Descripción</span>
          <textarea
            name="DESCRIPCION"
            id="DESCRIPCION_CARACTERISTICAS"
            onChange={(e) => handleChangeDes(e)}
            onBlur={(e) => handleBlur(e, "CARACTERISTICAS")}
            placeholder="Introduce una descripcion"
            value={valuesDes.DESCRIPCION}
            rows={3}
          />
          {errorDescripcion && (
            <small className="errorMessage">{errorDescripcion}</small>
          )}
        </label>
      </div>
    </div>
  );
};

const Images = ({
  values,
  errors,
  handleChange,
  handleChangeFile,
  handleBlur,
}) => {
  return (
    <div className="SectionDivType2">
      <h4>Imagenes</h4>
      <div className="SectionDivType1">
        <div className="LabelType1 ContainerInputFile">
          <span className="NameField">Imágen 1 </span>
          <label htmlFor="IMAGEN1" className="LabelFile1">
            <input
              type="file"
              name="IMAGEN1"
              id="IMAGEN1"
              onChange={(e) => handleChangeFile(e)}
              onBlur={(e) => handleBlur(e, "CARACTERISTICAS")}
            />
          </label>
          {errors.IMAGEN1 && (
            <small className="errorMessage">{errors.IMAGEN1}</small>
          )}
        </div>
        <div className="LabelType1 ContainerInputFile">
          <span className="NameField">Imágen 2 </span>
          <label htmlFor="IMAGEN2" className="LabelFile2">
            <input
              type="file"
              name="IMAGEN2"
              id="IMAGEN2"
              onChange={(e) => handleChangeFile(e)}
              onBlur={(e) => handleBlur(e, "CARACTERISTICAS")}
            />
          </label>
          {errors.IMAGEN2 && (
            <small className="errorMessage">{errors.IMAGEN2}</small>
          )}
        </div>
        <label htmlFor="FUENTE" className="LabelType1">
          <span className="NameField">Fuente de las imagenes</span>
          <input
            type="text"
            name="FUENTE"
            id="FUENTE"
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e, "CARACTERISTICAS")}
            value={values.FUENTE}
            autoComplete="off"
          />
          {errors.FUENTE && (
            <small className="errorMessage">{errors.FUENTE}</small>
          )}
        </label>
      </div>
    </div>
  );
};

const FormCaracteristicas = ({
  values,
  valuesCodigo,
  errors,
  handleChange,
  handleChangeCodigo,
  handleChangeFile,
  handleBlur,
}) => {
  return (
    <section>
      <h3>Caracteristicas</h3>
      <Codigo
        values={valuesCodigo}
        valuesDes={values}
        errors={errors.CODIGOS}
        handleBlur={handleBlur}
        handleChange={handleChangeCodigo}
        handleChangeDes={handleChange}
        errorDescripcion={errors.DESCRIPCION}
      />
      <Images
        values={values}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleChangeFile={handleChangeFile}
      />
    </section>
  );
};

export default FormCaracteristicas;