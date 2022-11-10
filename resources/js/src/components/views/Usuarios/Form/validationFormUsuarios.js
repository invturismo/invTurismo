import * as yup from "yup";
const messageRequire = "El campo es obligatorio",
  messageMax = max => `No puede superar ${max} caracteres`,
  messageUsuario = "El nombre de usuario no es valido",
  messageClave =
    "La contraseña debe tener entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula",
  messageConfirmar = "Las contraseñas no coinciden",
  messageCorreo = "No es un correo valido";
const messageNombre = "Solo puede contener letras";
const matchNombre = _ => [
  /^[A-ZÁÉÍÓÚÑ]+$/i,
  {message: messageNombre, excludeEmptyString: true},
];

let schema = yup.object({
  PRIMER_NOMBRE: yup
    .string()
    .required(messageRequire)
    .max(50, messageMax(50))
    .matches(...matchNombre()),
  SEGUNDO_NOMBRE: yup
    .string()
    .max(50, messageMax(50))
    .matches(...matchNombre()),
  PRIMER_APELLIDO: yup
    .string()
    .required(messageRequire)
    .max(50, messageMax(50))
    .matches(...matchNombre()),
  SEGUNDO_APELLIDO: yup
    .string()
    .max(50, messageMax(50))
    .matches(...matchNombre()),
  USUARIO: yup
    .string()
    .required(messageRequire)
    .matches(/^[a-z_]([a-z0-9_-]{5,31}|[a-z0-9_-]{5,30}\$)$/i, messageUsuario),
  CORREO: yup.string().required(messageRequire).email(messageCorreo),
  CLAVE: yup
    .string()
    .required(messageRequire)
    .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, messageClave),
  CONFIRMAR_CLAVE: yup
    .string()
    .required(messageRequire)
    .oneOf([yup.ref("CLAVE")], messageConfirmar)
    .matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, messageClave),
});

let schemaUpdate = schema.pick([
  "PRIMER_NOMBRE",
  "SEGUNDO_NOMBRE",
  "PRIMER_APELLIDO",
  "SEGUNDO_APELLIDO",
  "USUARIO",
  "CORREO",
]);

let schemaPassword = schema.pick(["CLAVE", "CONFIRMAR_CLAVE"]);

const whoSchema = {
  1: schema,
  2: schemaUpdate,
  3: schemaPassword,
};

export const validationsUsuarios = async (values, who) => {
  try {
    const schemaWho = whoSchema[who];
    await schemaWho.validate(values, {abortEarly: false});
    return {state: true};
  } catch (err) {
    let errors = {};
    err.inner.forEach(val => {
      errors[val.path] = val.message;
    });
    return {state: false, errors};
  }
};

export const unitValidationsUsuarios = async (e, objClave = {}) => {
  const {name, value} = e.target;
  const objectValue = {[name]: value, ...objClave};
  const arrayValidate = name === "CONFIRMAR_CLAVE" ? [name, "CLAVE"] : [name];
  const UnitValidation = schema.pick(arrayValidate);
  try {
    await UnitValidation.validate(objectValue, {abortEarly: false});
    return {state: true};
  } catch (err) {
    let errors = {};
    err.inner.forEach(val => {
      errors[val.path] = val.message;
    });
    return {state: false, errors};
  }
};
