import { closeLoaderForm, openLoaderForm } from "../../../../features/modalsSlice";
import { toastMs } from "../../../../helpers/helpToastMessage";
import { initialErrors, initialValues } from "./initialValuesFormListaPreliminar";
import { fetchFormListaPreliminar } from "./logicFormListaPreliminar";
import { UnitValidationsListaPreliminar, ValidationsFormListaPreliminar } from "./ValidationsFormListaPreliminar";

export const handleFunctionsLP = (
  values,
  setValues,
  setErrors,
  errors,
  navigate,
  dispatch
) => {
  const ValidateField = async (name, value) => {
    let FieldValue = { [name]: value };
    const response = await UnitValidationsListaPreliminar(FieldValue);
    return response;
  };

  const handleChange = async (e) => {
    let response;
    if (e.target.name === "ID_DEPARTAMENTOS") {
      const valueMunicipio = { ID_MUNICIPIOS: "" };
      if (e.target.value === "11") valueMunicipio.ID_MUNICIPIOS = "001";
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        ...valueMunicipio,
      });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    response = await ValidateField(e.target.name, e.target.value);
    if (response.state) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e,who) => {
    dispatch(openLoaderForm());
    const response = await ValidationsFormListaPreliminar(values);
    if (!response.state) {
      dispatch(closeLoaderForm());
      return setErrors({ ...initialErrors, ...response.errors });
    }
    const method = who === 3 ? "post" : "put";
    const url =
      who === 3
        ? "listados-preliminares/create"
        : "listados-preliminares/update";
    const responseServe = await fetchFormListaPreliminar(values, method, url);
    if (!responseServe.state) {
      console.log(responseServe);
      if (responseServe.errors)
        setErrors({ ...initialErrors, ...responseServe.errors });
      if (responseServe.message) toastMs().error(responseServe.message);
      return dispatch(closeLoaderForm());
    }
    dispatch(closeLoaderForm());
    if (who === 3) {
      setValues({ ...initialValues });
      if (e.nativeEvent.submitter.id === "buttonNext")
        navigate(
          `/clasificacion-recursos-atractivos/sin-clasificar/${responseServe.id_listado}`
        );
      toastMs().success("El resgistro se almaceno correctamente");
    } else {
      toastMs().success("El resgistro se actualizo correctamente");
      navigate(`/listado-preliminar/${values.ID_LISTADO}`, { replace: true });
    }
  };

  const handleBlur = async (e) => {
    const response = await ValidateField(e.target.name, e.target.value);
    if (!response.state) return setErrors({ ...errors, ...response.errors });
  };

  return { handleSubmit, handleBlur, handleChange };
};