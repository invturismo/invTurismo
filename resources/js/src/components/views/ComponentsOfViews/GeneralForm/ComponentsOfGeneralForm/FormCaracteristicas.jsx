import React, {useEffect} from "react";
import TiposPatrimonio from "../DataJson/DataTiposPatrimonio.json";
import Grupos from "../DataJson/DataGrupos.json";
import Componentes from "../DataJson/DataComponentes.json";
import Elementos from "../DataJson/DataElementos.json";
import {useDispatch, useSelector} from "react-redux";
import LoaderImage from "./LoaderImage";
import {deleteUrlImage} from "../../../../../features/imagesSlice";
import LabelSelect from "../../FieldsForm/LabelSelect";
import LabelTextarea from "../../FieldsForm/LabelTextarea";
import ErrorMessage from "../../FieldsForm/ErrorMessage";
import NameField from "../../FieldsForm/NameField";
import LabelInput from "../../FieldsForm/LabelInput";

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
          <LabelSelect
            nameField="Tipo de patrimonio"
            name="ID_TIPO_PATRIMONIO"
            value={values.ID_TIPO_PATRIMONIO}
            onChange={e => handleChange(e)}
            onBlur={e => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
            disabled={values.ID_MUNICIPIOS ? false : true}
            errors={errors.ID_TIPO_PATRIMONIO}
            className="LabelType1"
            req
          >
            <option value="" disabled>
              {values.ID_MUNICIPIOS
                ? "Seleccione un tipo de patrimonio"
                : "Primero seleccione un municipio"}
            </option>
            {values.ID_MUNICIPIOS &&
              TiposPatrimonio.map(val => {
                return (
                  <option
                    value={val["ID_TIPO_PATRIMONIO"]}
                    key={val["ID_TIPO_PATRIMONIO"] + val["PATROMONIO"]}
                  >
                    {val["PATROMONIO"]}
                  </option>
                );
              })}
          </LabelSelect>
          <LabelSelect
            nameField="Grupo"
            name="ID_GRUPO"
            value={values.ID_GRUPO}
            onChange={e => handleChange(e)}
            onBlur={e => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
            disabled={values.ID_TIPO_PATRIMONIO ? false : true}
            errors={errors.ID_GRUPO}
            className="LabelType1"
            req
          >
            <option value="" disabled>
              {values.ID_TIPO_PATRIMONIO
                ? "Seleccione un grupo"
                : "Primero seleccione tipo de patrimonio"}
            </option>
            {values.ID_TIPO_PATRIMONIO &&
              Grupos[values.ID_TIPO_PATRIMONIO].map(val => {
                return (
                  <option
                    value={val["ID_GRUPO"]}
                    key={val["ID_GRUPO"] + val["GRUPO"]}
                  >
                    {val["GRUPO"]}
                  </option>
                );
              })}
          </LabelSelect>
          {values.ID_TIPO_PATRIMONIO &&
            values.ID_GRUPO &&
            Componentes[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO] && (
              <LabelSelect
                nameField="Componente"
                name="ID_COMPONENTE"
                value={values.ID_COMPONENTE}
                onChange={e => handleChange(e)}
                onBlur={e => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
                errors={errors.ID_COMPONENTE}
                className="LabelType1"
                req
              >
                <option value="" disabled>
                  Seleccione un componente
                </option>
                {Componentes[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO].map(
                  val => {
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
              </LabelSelect>
            )}
          {values.ID_TIPO_PATRIMONIO &&
            values.ID_GRUPO &&
            values.ID_COMPONENTE &&
            Elementos[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO] &&
            Elementos[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO][
              values.ID_COMPONENTE
            ] && (
              <LabelSelect
                nameField="Elemento"
                name="ID_ELEMENTO"
                value={values.ID_ELEMENTO}
                onChange={e => handleChange(e)}
                onBlur={e => handleBlur(e, "CARACTERISTICAS", "CODIGOS")}
                errors={errors.ID_ELEMENTO}
                className="LabelType1"
                req
              >
                <option value="" disabled>
                  Seleccione un elemento
                </option>
                {Elementos[values.ID_TIPO_PATRIMONIO][values.ID_GRUPO][
                  values.ID_COMPONENTE
                ].map(val => {
                  return (
                    <option
                      value={val["ID_ELEMENTO"]}
                      key={val["ID_ELEMENTO"] + val["ELEMENTO"]}
                    >
                      {val["ELEMENTO"]}
                    </option>
                  );
                })}
              </LabelSelect>
            )}
        </div>
        <LabelTextarea
          className="LabelType1 ContainerTextArea"
          errors={errorDescripcion}
          name="DESCRIPCION"
          id="DESCRIPCION_CARACTERISTICAS"
          onChange={e => handleChangeDes(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS")}
          placeholder="Introduce una descripción"
          value={valuesDes.DESCRIPCION}
          rows={3}
          nameField="Descripción"
        />
      </div>
    </div>
  );
};

const FieldImage = ({
  nameField,
  name,
  handleChangeFile,
  handleBlur,
  loadImage,
  imagen,
  handleDeleteImage,
  errors,
}) => {
  return (
    <div className="LabelType1 ContainerInputFile">
      <NameField name={nameField} req />
      {!imagen && !loadImage[name] && (
        <label htmlFor={name} className="LabelFile">
          <input
            type="file"
            name={name}
            id={name}
            onChange={e => handleChangeFile(e)}
            onBlur={e => handleBlur(e, "CARACTERISTICAS")}
          />
        </label>
      )}
      {loadImage[name] && <LoaderImage />}
      {imagen && (
        <div className="containerImage">
          <span>
            <i onClick={handleDeleteImage} className={name}>
              <img
                src="/img/iconsGeneral/svgCloseImage.svg"
                alt="close"
                className={name}
              />
            </i>
          </span>
          <img src={imagen} alt="imagen1" />
        </div>
      )}
      <ErrorMessage errors={errors[name]} />
    </div>
  );
};

const Images = ({
  values,
  errors,
  handleChange,
  handleChangeFile,
  handleBlur,
  handleDeleteImage,
}) => {
  const {urlImage, loadImage} = useSelector(state => state.imagesSlice),
    {IMAGEN1, IMAGEN2} = urlImage;
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(deleteUrlImage("IMAGEN1"));
      dispatch(deleteUrlImage("IMAGEN2"));
    };
  }, []);

  return (
    <div className="SectionDivType2">
      <h4>Imagenes</h4>
      <div className="SectionDivType1">
        <FieldImage
          nameField="Imágen 1"
          handleBlur={handleBlur}
          handleChangeFile={handleChangeFile}
          handleDeleteImage={handleDeleteImage}
          imagen={IMAGEN1}
          loadImage={loadImage}
          name="IMAGEN1"
          errors={errors}
        />
        <FieldImage
          nameField="Imágen 2"
          handleBlur={handleBlur}
          handleChangeFile={handleChangeFile}
          handleDeleteImage={handleDeleteImage}
          imagen={IMAGEN2}
          loadImage={loadImage}
          name="IMAGEN2"
          errors={errors}
        />
        <LabelInput
          nameField="Fuente de las imagenes"
          className="LabelType1"
          name="FUENTE"
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e, "CARACTERISTICAS")}
          value={values.FUENTE}
          errors={errors.FUENTE}
          req
          autOff
        />
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
  handleDeleteImage,
}) => {
  return (
    <section>
      <h3>Características</h3>
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
        handleDeleteImage={handleDeleteImage}
      />
    </section>
  );
};

export default FormCaracteristicas;
