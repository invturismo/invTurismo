import * as Yup from "yup";

const schema = Yup.object().shape({
  user: Yup.string().required("El campo es obligatorio"),
  clave: Yup.string().required("El campo es obligatorio"),
});

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
