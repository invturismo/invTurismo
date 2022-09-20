import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../../../../features/modalsSlice";
import { toastMs } from "../../../../helpers/helpToastMessage";
import { LOGIN, USUARIOS } from "../../../router/paths";
import {
  initialErrorsUsuarios,
  initialValuesUsuarios,
} from "./initialValuesUsuarios";
import { fetchFormUsuarios } from "./logicFormUsuarios";
import { validateTokens } from "./validateTokens";
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
  who,
}) => {
  const whoData = {
    1: ["post", "register"],
    2: ["put", "user-update"],
    3: ["put", "reset-password"],
  };

  const actionWho = (equal) => {
    let linkNavigate = equal
      ? `${LOGIN}`
      : `${USUARIOS}/${values.ID_USUARIO}`;
    switch (who) {
      case 1:
        setValues({ ...initialValuesUsuarios });
        toastMs().success("El usuario se registro correctamente");
        navigate(`${USUARIOS}`,{replace:true});
        break;
      case 2:
        toastMs().success("El usuario se actualizo correctamente");
        navigate(linkNavigate, { replace: true });
        break;
      case 3:
        toastMs().success("La constraseña se actualizo correctamente");
        navigate(linkNavigate, { replace: true });
        break;
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let response;
    setValues({ ...values, [name]: value });
    if (name === "CONFIRMAR_CLAVE")
      response = await unitValidationsUsuarios(e, { CLAVE: values.CLAVE });
    else response = await unitValidationsUsuarios(e);
    if (response.state) setErrors({ ...errors, [name]: "" });
  };

  const validateSchema = async (e) => {
    const response = await validationsUsuarios(values, who);
    if (!response.state) {
      setErrors({ ...initialErrorsUsuarios, ...response.errors });
      return false;
    }
    return true;
  };

  const sendData = async (equal) => {
    dispatch(openLoaderForm());
    const [method, url] = whoData[who];
    const responseServe = await fetchFormUsuarios(values, method, url);
    console.log(responseServe);
    dispatch(closeLoaderForm());
    dispatch(closeModalLayoutState());
    if (!responseServe.state) {
      if (responseServe.errors)
        setErrors({ ...initialErrorsUsuarios, ...responseServe.errors });
      if (responseServe.message) toastMs().error(responseServe.message);
      return;
    }
    actionWho(equal);
  };

  const sendValidateTokens = async () => {
    dispatch(openLoaderForm());
    const response = await validateTokens(values.ID_USUARIO, true);
    dispatch(closeLoaderForm());
    if (response[0] === 0) toastMs().error(response[1]);
    return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (who === 1) return handleCreate();
    if (who === 2) return handleUpdate();
    if (who === 3) return handlePassword();
  };

  const handleCreate = async () => {
    const response = await validateSchema();
    if (!response) return;
    sendData();
  };

  const modalFunction = (responseTokens) => {
    let textMessage1 =
      responseTokens[0] == 4
        ? `¿Estas seguro que quieres`
        : "El usario esta en sesion";
    let textMessage2 =
      responseTokens[0] == 4
        ? "Actualizar?"
        : "¿Esta seguro que deseas actualizarlo?";
    const handleFunction = () => sendData(responseTokens[1]);
    const dataPayload = {
      textMessage1,
      textMessage2,
      textButton: "Continuar",
      srcImg: "svgWarning",
      handleFunction,
    };
    dispatch(openModalLayoutState(dataPayload));
  };

  const handleUpdate = async () => {
    const response = await validateSchema();
    if (!response) return;
    const responseTokens = await sendValidateTokens();
    if (!responseTokens[0]) return;
    modalFunction(responseTokens);
  };

  const handlePassword = async () => {
    const response = await validateSchema();
    if (!response) return;
    const responseTokens = await sendValidateTokens();
    if (!responseTokens[0]) return;
    modalFunction(responseTokens);
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
