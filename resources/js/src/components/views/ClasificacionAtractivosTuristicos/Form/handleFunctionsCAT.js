import { closeLoaderForm, closeModalLayoutState, openLoaderForm, openModalLayoutState } from "../../../../features/modalsSlice";
import { toastMs } from "../../../../helpers/helpToastMessage";
import { fetchFormClasificacion } from "./logicFormClasificacion";
import { validationClasificacion } from "./schemaErrorsFormCAT";

export const handleFunctionsCAT = ({
  dispatch,
  ID_LISTADO,
  navigate,
  setValues,
  setErrors,
  values,
}) => {
  const handleChange = async (e) => {
    setValues({...values,[e.target.name] : e.target.value});
    const response = await validationClasificacion(values);
    if (response.state) setErrors({ [e.target.name] : "" });
  };

  const handleBlur = async () => {
    const response = await validationClasificacion(values);
    console.log(response);
    if(!response.state) setErrors({ ...response.errors });
  };

  const sendData = async (exec) => {
    const response = await validationClasificacion(values);
    if (!response.state) return setErrors({ ...response.errors });
    dispatch(openLoaderForm());
    const data = await fetchFormClasificacion(values);
    console.log(data);
    dispatch(closeLoaderForm());
    if (!data.state) {
      dispatch(closeModalLayoutState());
      if (data.message) toastMs().error(data.message);
      if(data.errors) setErrors(data.errors);
      return;
    }
    exec();
    dispatch(closeModalLayoutState());
  };

  const handleCreate = () => {
    const handleSend = () => {
      toastMs().success("Se clasifico correctamente");
      navigate(`/clasificacion-recursos-atractivos/sin-clasificar`);
    };
    sendData(handleSend);
  };

  const handleUpdate = () => {
    const handleSend = () => {
      toastMs().success("Se actualizo correctamente");
      navigate(`/clasificacion-recursos-atractivos/clasificado/${ID_LISTADO}`,{replace:true});
    };
    const handleFunction = () =>
      sendData(handleSend);
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