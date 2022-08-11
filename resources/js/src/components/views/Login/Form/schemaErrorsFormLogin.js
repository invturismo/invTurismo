import * as Yup from "yup";

export const schemaErrorsFormLogin = Yup.object().shape({
  correo: Yup.string()
    .email("El campo debe ser una dirección de correo válida")
    .required("El campo es obligatorio"),
  clave: Yup.string().required("El campo es obligatorio"),
});