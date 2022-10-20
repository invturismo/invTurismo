import * as yup from "yup";
const messageRequire = "El campo es obligatorio";

let schema = yup.object({
  ID_DEPARTAMENTOS: yup.string().required(messageRequire),
  ID_MUNICIPIOS: yup.string().required(messageRequire),
  NOMBRE: yup
    .string()
    .required(messageRequire)
    .max(200, "No puede superar 200 caracteres"),
  UBICACION: yup.string().max(200, "No puede superar 200 caracteres"),
  ID_FUENTE: yup.string().required(messageRequire),
});

export const ValidationsFormListaPreliminar = async values => {
  try {
    await schema.validate(values, {abortEarly: false});
    return {state: true};
  } catch (err) {
    let errors = {};
    err.inner.forEach(val => {
      errors[val.path] = val.message;
    });
    return {state: false, errors};
  }
};

export const UnitValidationsListaPreliminar = async value => {
  const UnitValidation = schema.pick(Object.keys(value));
  try {
    await UnitValidation.validate(value);
    return {state: true};
  } catch (err) {
    return {state: false, errors: {[err.path]: err.message}};
  }
};
