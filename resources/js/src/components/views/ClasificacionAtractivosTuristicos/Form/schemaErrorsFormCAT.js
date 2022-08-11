import * as Yup from "yup";

export const schemaErrorsFormCAT = Yup.object().shape({
  ID_TIPO_BIEN: Yup.string().required("El campo es obligatorio"),
});
