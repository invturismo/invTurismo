import React, { useState } from "react";
import ButtonPage from "../../../common/ButtonPage";
import FormActividadesServicios from "./ComponentsOfGeneralForm/FormActividadesServicios";
import FormCaracteristicas from "./ComponentsOfGeneralForm/FormCaracteristicas";
import FormCaracteristicasRelevantes from "./ComponentsOfGeneralForm/FormCaracteristicasRelevantes";
import FormGeneralidades from "./ComponentsOfGeneralForm/FormGeneralidades";
import FormOtros from "./ComponentsOfGeneralForm/FormOtros";
import FormPromocionAtractivo from "./ComponentsOfGeneralForm/FormPromocionAtractivo";
import FormPuntajesValoracion from "./ComponentsOfGeneralForm/FormPuntajesValoracion";
import FormServiciosEspeciales from "./ComponentsOfGeneralForm/FormServiciosEspeciales";
import { changeFunctionsGeneralForm } from "./changeFunctionsGeneralForm";
import { StyleMainGeneralForm } from "./StyleMainGeneralForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainGeneralForm = ({ initialValues, initialErrors, who, idRecord }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleBlur,
    handleChangeCheckbox,
    handleSubmit,
    handleChangeGeneralidades,
    handleChangeAdminPropietario,
    handleChangeCaracteristicas,
    handleChangeCodigo,
    handleChangeFile,
    handleChangePuntajes,
    handleChangeCalidadMaterial,
    handleChangeCaracteristicasRelevantes,
    handleChangeTarifas,
    handleChangeActividades,
    handleChangeServicios,
    handleChangePromocion,
    handleChangeServiciosEspeciales,
    handleChangeRedes,
    handleChangeOtros,
    handleDeleteImage,
  } = changeFunctionsGeneralForm({
    values,
    errors,
    setValues,
    setErrors,
    initialErrors,
    who,
    dispatch,
    idRecord,
    navigate,
  });

  return (
    <StyleMainGeneralForm onSubmit={(e) => handleSubmit(e)}>
      <FormGeneralidades
        values={values.GENERALIDADES}
        valuesCodigo={values.CARACTERISTICAS.CODIGOS}
        handleChange={handleChangeGeneralidades}
        handleChangeAdminPropietario={handleChangeAdminPropietario}
        handleBlur={handleBlur}
        errors={errors.GENERALIDADES}
        errorsCod={errors.CARACTERISTICAS.CODIGOS}
      />
      <FormCaracteristicas
        values={values.CARACTERISTICAS}
        handleChange={handleChangeCaracteristicas}
        handleChangeFile={handleChangeFile}
        handleBlur={handleBlur}
        errors={errors.CARACTERISTICAS}
        handleChangeCodigo={handleChangeCodigo}
        valuesCodigo={values.CARACTERISTICAS.CODIGOS}
        handleDeleteImage={handleDeleteImage}
      />
      <FormPuntajesValoracion
        errors={errors.PUNTAJES_VALORACION}
        handleBlur={handleBlur}
        handleChange={handleChangePuntajes}
        handleChangeCalidadMaterial={handleChangeCalidadMaterial}
        values={values.PUNTAJES_VALORACION}
        who={who}
      />
      <FormCaracteristicasRelevantes
        values={values.CARACTERISTICAS_RELEVANTES}
        handleChange={handleChangeCaracteristicasRelevantes}
        handleChangeCheckbox={handleChangeCheckbox}
        handleChangeTarifas={handleChangeTarifas}
        handleBlur={handleBlur}
        errors={errors.CARACTERISTICAS_RELEVANTES}
      />
      <FormActividadesServicios
        values={values.ACTIVIDADES_SERVICIOS}
        handleChangeActividades={handleChangeActividades}
        handleChangeServicios={handleChangeServicios}
        handleBlur={handleBlur}
        errors={errors.ACTIVIDADES_SERVICIOS}
      />
      <FormPromocionAtractivo
        values={values.PROMOCION}
        handleChange={handleChangePromocion}
        handleBlur={handleBlur}
        errors={errors.PROMOCION}
      />
      <FormServiciosEspeciales
        values={values.SERVICIOS_ESPECIALES}
        handleChange={handleChangeServiciosEspeciales}
        handleBlur={handleBlur}
        errors={errors.SERVICIOS_ESPECIALES}
      />
      <FormOtros
        values={values.OTROS}
        handleChange={handleChangeOtros}
        handleChangeRedes={handleChangeRedes}
        handleBlur={handleBlur}
        errors={errors.OTROS}
      />
      <ButtonPage type="submit" colorButton="green">
        Aceptar
      </ButtonPage>
    </StyleMainGeneralForm>
  );
};

export default MainGeneralForm;
