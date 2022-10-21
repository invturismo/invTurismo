import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../../../../features/modalsSlice";
import {toastMs} from "../../../../helpers/helpToastMessage";
import {
  CLASIFICACION,
  CLASIFICADO,
  FESTIVIDADES,
  GRUPOS,
  INMATERIAL,
  MATERIAL,
  SINCLASIFICAR,
  SINCOMPLETAR,
  SITIOS,
} from "../../../router/paths";
import {fetchFormClasificacion} from "./logicFormClasificacion";
import {validationClasificacion} from "./schemaErrorsFormCAT";

const linksPatrimonios = {
  1: MATERIAL,
  2: INMATERIAL,
  3: FESTIVIDADES,
  4: GRUPOS,
  5: SITIOS,
};

//Funciones necesarias para el formulario

export const handleFunctionsCAT = ({
  dispatch,
  ID_LISTADO,
  navigate,
  setValues,
  setErrors,
  values,
}) => {
  const handleChange = async e => {
    setValues({...values, [e.target.name]: e.target.value});
    const response = await validationClasificacion(values);
    if (response.state) setErrors({[e.target.name]: ""});
  };

  const handleBlur = async () => {
    const response = await validationClasificacion(values);
    console.log(response);
    if (!response.state) setErrors({...response.errors});
  };

  //Funcion para enviar datos al servidor
  const sendData = async exec => {
    const response = await validationClasificacion(values);
    if (!response.state) return setErrors({...response.errors});
    dispatch(openLoaderForm());
    const data = await fetchFormClasificacion(values);
    console.log(data);
    dispatch(closeLoaderForm());
    if (!data.state) {
      dispatch(closeModalLayoutState());
      if (data.message) toastMs().error(data.message);
      if (data.errors) setErrors(data.errors);
      return;
    }
    exec(data.id);
    dispatch(closeModalLayoutState());
  };

  const handleCreate = e => {
    const validateNext = e.nativeEvent.submitter.id === "buttonNext"; //Valida con cual boton interactuo
    const handleSend = id => {
      let urlNavigate = `${CLASIFICACION}${SINCLASIFICAR}`;
      toastMs().success("Se clasifico correctamente");
      if (validateNext)
        urlNavigate = `${
          linksPatrimonios[values.ID_TIPO_BIEN]
        }${SINCOMPLETAR}/${id}`;
      navigate(urlNavigate);
    };
    sendData(handleSend);
  };

  const handleUpdate = () => {
    const handleSend = () => {
      toastMs().success("Se actualizo correctamente");
      navigate(`${CLASIFICACION}${CLASIFICADO}/${ID_LISTADO}`, {
        replace: true,
      });
    };
    const handleFunction = () => sendData(handleSend);
    const dataPayload = {
      textMessage1: "¿Estas seguro que quieres",
      textMessage2: "Actualizar?",
      textButton: "Continuar",
      srcImg: "svgWarning",
      handleFunction,
    };
    dispatch(openModalLayoutState(dataPayload));
  };

  return {
    handleCreate,
    handleUpdate,
    handleChange,
    handleBlur,
  };
};
