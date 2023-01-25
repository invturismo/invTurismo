import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../../../../features/modalsSlice";
import {toastMs} from "../../../../helpers/helpToastMessage";
import {CLASIFICACION, LISTADO, SINCLASIFICAR} from "../../../router/paths";
import {initialErrors, initialValues} from "./initialValuesFormListaPreliminar";
import {fetchFormListaPreliminar} from "./logicFormListaPreliminar";
import {validateNameListado} from "./validateNameListado";
import {
  UnitValidationsListaPreliminar,
  ValidationsFormListaPreliminar,
} from "./ValidationsFormListaPreliminar";

export const handleFunctionsLP = (
  values,
  setValues,
  setErrors,
  errors,
  navigate,
  dispatch
) => {
  const ValidateField = async (name, value) => {
    let FieldValue = {[name]: value};
    const response = await UnitValidationsListaPreliminar(FieldValue);
    return response;
  };

  const handleChange = async e => {
    let response;
    if (e.target.name === "ID_DEPARTAMENTOS") {
      const valueMunicipio = {ID_MUNICIPIOS: ""};
      if (e.target.value === "11") valueMunicipio.ID_MUNICIPIOS = "001";
      setValues({
        ...values,
        [e.target.name]: e.target.value,
        ...valueMunicipio,
      });
    } else {
      setValues({...values, [e.target.name]: e.target.value});
    }
    response = await ValidateField(e.target.name, e.target.value);
    if (response.state) setErrors({...errors, [e.target.name]: ""});
  };

  const validateSchema = async () => {
    const response = await ValidationsFormListaPreliminar(values);
    if (!response.state) {
      setErrors({...initialErrors, ...response.errors});
      return false;
    }
    return true;
  };

  const sendData = async (exec, method, url) => {
    dispatch(openLoaderForm());
    const responseServe = await fetchFormListaPreliminar(values, method, url);
    dispatch(closeLoaderForm());
    if (!responseServe.state) {
      dispatch(closeModalLayoutState());
      if (responseServe.errors)
        setErrors({...initialErrors, ...responseServe.errors});
      if (responseServe.message) toastMs().error(responseServe.message);
      return;
    }
    exec(responseServe);
    dispatch(closeModalLayoutState());
  };

  const text1 =
    "El nombre ya es registrado en la base de datos en este municipio";

  const handleCreate = async e => {
    const schemaValidate = await validateSchema();
    if (!schemaValidate) return;
    dispatch(openLoaderForm());
    const nameValidate = await validateNameListado(values);
    dispatch(closeLoaderForm());
    if (nameValidate[0] == 0) return toastMs().error(nameValidate[1]);
    const handleSend = responseServe => {
      setValues({...initialValues});
      if (e.nativeEvent.submitter.id === "buttonNext")
        navigate(
          `${CLASIFICACION}${SINCLASIFICAR}/${responseServe.id_listado}`
        );
      toastMs().success("El resgistro se almaceno correctamente");
    };
    const handleFunction = () =>
      sendData(handleSend, "post", "listados-preliminares/create");
    if (nameValidate[0] == 2) return handleFunction();
    const dataPayload = {
      textMessage1: text1,
      textMessage2: "¿Esta seguro que deseas crearlo?",
      textButton: "Continuar",
      srcImg: "svgWarning",
      handleFunction,
    };
    dispatch(openModalLayoutState(dataPayload));
  };

  const handleUpdate = async () => {
    const schemaValidate = await validateSchema();
    if (!schemaValidate) return;
    dispatch(openLoaderForm());
    const nameValidate = await validateNameListado(values);
    dispatch(closeLoaderForm());
    if (nameValidate[0] == 0) return toastMs().error(nameValidate[1]);
    const handleSend = () => {
      toastMs().success("El resgistro se actualizo correctamente");
      navigate(`${LISTADO}/${values.ID_LISTADO}`, {replace: true});
    };
    const handleFunction = () =>
      sendData(handleSend, "put", "listados-preliminares/update");
    let textMessage1 =
        nameValidate[0] == 2 ? `¿Estas seguro que quieres` : text1,
      textMessage2 =
        nameValidate[0] == 2
          ? "Actualizar?"
          : "¿Esta seguro que deseas actualizarlo?";
    const dataPayload = {
      textMessage1,
      textMessage2,
      textButton: "Continuar",
      srcImg: "svgWarning",
      handleFunction,
    };
    dispatch(openModalLayoutState(dataPayload));
  };

  const handleBlur = async e => {
    const response = await ValidateField(e.target.name, e.target.value);
    if (!response.state) return setErrors({...errors, ...response.errors});
  };

  return {handleBlur, handleChange, handleCreate, handleUpdate};
};
