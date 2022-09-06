import * as Yup from "yup";

const schema = Yup.object().shape({
  ID_TIPO_BIEN: Yup.string().required("El campo es obligatorio"),
});

export const validationClasificacion = async (value) => {
  try {
    await schema.validate(value);
    return { state: true };
  } catch (err) {
    return { state: false, errors: { [err.path]: err.message } };
  }
};
