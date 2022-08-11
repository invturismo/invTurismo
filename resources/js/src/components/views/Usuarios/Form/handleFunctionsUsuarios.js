import {
  closeLoaderForm,
  openLoaderForm,
} from "../../../../features/modalsSlice";
import { toastMs } from "../../../../helpers/helpToastMessage";
import {
  initialErrorsUsuarios,
  initialValuesUsuarios,
} from "./initialValuesUsuarios";
import { fetchFormUsuarios } from "./logicFormUsuarios";
import {
  unitValidationsUsuarios,
  validationsUsuarios,
} from "./validationFormUsuarios";

export const handleFunctionsUsuarios = ({
  values,
  setValues,
  setErrors,
  errors,
  navigate,
  dispatch,
  viewPassword,
  setViewPassword,
  focus,
  setFocus,
  who
}) => {
  const whoData = () => {
    let data = { method: "", url: "" };
    switch (who) {
      case 1:
        data.method = "post";
        data.url = "register";
        break;
      case 2:
        data.method = "put";
        data.url = "user-update";
        break;
      case 3:
        data.method = "put";
        data.url = "reset-password";
        break;
    }
    return data;
  };

  const actionWho = () => {
    switch (who) {
      case 1:
        setValues({ ...initialValuesUsuarios });
        navigate(`/usuarios`, { replace: true });
        toastMs().success("El usuraio se registro correctamente");
        break;
      case 2:
        navigate(`/usuarios/${values.ID_USUARIO}`, { replace: true });
        toastMs().success("El usuario se actualizo correctamente");
        break;
      case 3:
        navigate(`/usuarios/${values.ID_USUARIO}`, { replace: true });
        toastMs().success("La constraseña se actualizo correctamente");
        break;
    }
  }

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let response;
    setValues({ ...values, [name]: value });
    if (name === "CONFIRMAR_CLAVE")
      response = await unitValidationsUsuarios(e, { CLAVE: values.CLAVE });
    else response = await unitValidationsUsuarios(e);
    if (response.state) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validationsUsuarios(values,who);
    if (!response.state)
      return setErrors({ ...initialErrorsUsuarios, ...response.errors });
    dispatch(openLoaderForm());
    const {method,url} = whoData();
    const responseServe = await fetchFormUsuarios(values, method, url);
    if (!responseServe.state) {
      if (responseServe.errors)
        setErrors({ ...initialErrorsUsuarios, ...responseServe.errors });
      if (responseServe.message) toastMs().error(responseServe.message);
      return dispatch(closeLoaderForm());
    }
    dispatch(closeLoaderForm());
    actionWho();
  };

  const handleBlur = async (e) => {
    let response;
    const { name } = e.target;
    if (name === "CONFIRMAR_CLAVE" || name === "CLAVE") {
      setFocus({ ...focus, [name]: false });
    }
    if (name === "CONFIRMAR_CLAVE")
      response = await unitValidationsUsuarios(e, { CLAVE: values.CLAVE });
    else response = await unitValidationsUsuarios(e);
    if (!response.state) return setErrors({ ...errors, ...response.errors });
  };

  const handleFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  const handleClickView = (e) => {
    const { className } = e.target;
    setViewPassword({
      ...viewPassword,
      [className]: viewPassword[className] ? false : true,
    });
  };

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    handleFocus,
    handleClickView,
  };
};
