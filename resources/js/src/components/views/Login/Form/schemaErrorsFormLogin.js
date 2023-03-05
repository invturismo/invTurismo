import * as Yup from "yup";

//Esquema de validacion del formulario
const schema = Yup.object().shape({
  user: Yup.string().required("El campo es obligatorio"),
  clave: Yup.string().required("El campo es obligatorio"),
});

//Funcion que comprueba todos los valores del formulario de iniciar sesion
export const validationsLogin = async values => {
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

//Funcion para validar un valor en especifico del formulario de iniciar sesion
export const unitValidationLogin = async e => {
  const {name, value} = e.target;
  const values = {[name]: value};
  const UnitValidation = schema.pick([name]);
  try {
    await UnitValidation.validate(values);
    return {state: true};
  } catch (err) {
    return {state: false, errors: {[err.path]: err.message}};
  }
};
