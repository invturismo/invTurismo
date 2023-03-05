import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../../../../../features/modalsSlice";
import {toastMs} from "../../../../../helpers/helpToastMessage";
import {
  COMPLETADO,
  FESTIVIDADES,
  GRUPOS,
  INMATERIAL,
  MATERIAL,
  SINCOMPLETAR,
  SITIOS,
} from "../../../../router/paths";
import {errorsTransform} from "../errorsTransform";
import {formDataTransform} from "../formDataTransform";
import {sendDataForm} from "../sendDataForm";
import {validationsGeneralForm} from "../validationsGeneralForm";

//Links de los recursos turisticos dependiendo de su clasificacion
const whoLink = {
  1: [
    "patrimonios-materiales/insertForm",
    "patrimonios-materiales/update",
    `${MATERIAL}${SINCOMPLETAR}`,
    `${MATERIAL}${COMPLETADO}`,
  ],
  2: [
    "patrimonios-inmateriales/insertForm",
    "patrimonios-inmateriales/update",
    `${INMATERIAL}${SINCOMPLETAR}`,
    `${INMATERIAL}${COMPLETADO}`,
  ],
  3: [
    "festividades-eventos/insertForm",
    "festividades-eventos/update",
    `${FESTIVIDADES}${SINCOMPLETAR}`,
    `${FESTIVIDADES}${COMPLETADO}`,
  ],
  4: [
    "grupos-especiales/insertForm",
    "grupos-especiales/update",
    `${GRUPOS}${SINCOMPLETAR}`,
    `${GRUPOS}${COMPLETADO}`,
  ],
  5: [
    "sitios-naturales/insertForm",
    "sitios-naturales/update",
    `${SITIOS}${SINCOMPLETAR}`,
    `${SITIOS}${COMPLETADO}`,
  ],
};

export const submitFunctionsGeneralForm = ({
  dispatch,
  values,
  valueWho,
  initialErrors,
  setErrors,
  idRecord,
  who,
  initialValues,
  navigate,
}) => {
  //Funcion que comprueba el esquema de validacion
  const validateSchema = async () => {
    const response = await validationsGeneralForm(
      values,
      valueWho[who],
      initialErrors
    );
    if (!response.state) {
      toastMs().error("Hay campos erroneos");
      setErrors({...response.errors});
      document
        .querySelector(".errorMessage")
        ?.scrollIntoView({block: "center", behavior: "smooth"});
      return false;
    }
    return true;
  };

  //Funcion base para enviar datos al servidor y mostrar mensajes al usuario
  const templateSubmit = async (nameLink, exec, updateImage) => {
    dispatch(openLoaderForm());
    const formData = formDataTransform({...values, ...idRecord}, who);
    if (updateImage) {
      let rulesImage = updateImage();
      if (rulesImage) formData.append("REGLAS", rulesImage);
    }
    const responseServe = await sendDataForm(nameLink, formData);
    dispatch(closeLoaderForm());
    dispatch(closeModalLayoutState());
    if (!responseServe.state) {
      if (responseServe.errors) {
        let errTrans = errorsTransform(
          responseServe,
          valueWho[who],
          initialErrors
        );
        toastMs().error("Hay campos erroneos");
        return setErrors({...errTrans});
      }
      return toastMs().error(responseServe.message || "Error inesperado");
    }
    exec();
  };

  //Funcion para enviar formulario de recurso turistico ya clasificado
  const handleSubmitCreate = async () => {
    const response = await validateSchema();
    if (!response) return;
    templateSubmit(whoLink[who][0], () => {
      toastMs().success("El registro se completó correctamente");
      navigate(whoLink[who][2]);
    });
  };

  //Funcion para enviar formulario de recurso turistico ya completado
  const handleSubmitUpdate = async () => {
    let jsonInital = JSON.stringify(initialValues),
      jsonValues = JSON.stringify(values);
    if (jsonInital == jsonValues)
      return toastMs().error("No modifico ningun dato");
    const response = await validateSchema();
    if (!response) return;
    const finalSucces = () => {
      toastMs().success("El registro se actualizo correctamente");
      navigate(whoLink[who][3] + "/" + Object.values(idRecord)[0], {
        replace: true,
      });
    };
    //Funcion para validar si se actualizo alguna imagen o la fuente de las imagenes
    const validateImages = () => {
      let ifImage1 =
          values.CARACTERISTICAS.IMAGEN1 !=
          initialValues.CARACTERISTICAS.IMAGEN1,
        ifImage2 =
          values.CARACTERISTICAS.IMAGEN2 !=
          initialValues.CARACTERISTICAS.IMAGEN2,
        ifFuente =
          values.CARACTERISTICAS.FUENTE != initialValues.CARACTERISTICAS.FUENTE,
        whoChange = [];
      if (ifImage1) whoChange.push("IMAGEN1");
      if (ifImage2) whoChange.push("IMAGEN2");
      if (ifFuente) whoChange.push("FUENTE");
      return whoChange.join("|");
    };
    const handleFunction = () =>
      templateSubmit(whoLink[who][1], finalSucces, validateImages);
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
    handleSubmitCreate,
    handleSubmitUpdate,
  };
};
