import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../../../../features/modalsSlice";
import { toastMs } from "../../../../helpers/helpToastMessage";
import { errorsTransform } from "./errorsTransform";
import { formDataTransform } from "./formDataTransform";
import { sendDataForm } from "./sendDataForm";
import { validationsGeneralForm } from "./validationsGeneralForm";

const whoLink = {
  1: [
    "patrimonios-materiales/insertForm",
    "patrimonios-materiales/update",
    "/patrimonio-material/sin-completar",
    "/patrimonio-material/completado/",
  ],
  2: [
    "patrimonios-inmateriales/insertForm",
    "patrimonios-inmateriales/update",
    "/patrimonio-inmaterial/sin-completar",
    "/patrimonio-inmaterial/completado/",
  ],
  4: [
    "grupos-especiales/insertForm",
    "grupos-especiales/update",
    "/grupos-especial-interes/sin-completar",
    "/grupos-especial-interes/completado/",
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
  const validateSchema = async () => {
    const response = await validationsGeneralForm(
      values,
      valueWho[who],
      initialErrors
    );
    if (!response.state) {
      toastMs().error("Hay campos erroneos");
      setErrors({ ...response.errors });
      return false;
    }
    return true;
  };

  const templateSubmit = async (nameLink, exec, updateImage) => {
    dispatch(openLoaderForm());
    const formData = formDataTransform({ ...values, ...idRecord },who);
    if (updateImage) {
      let rulesImage = updateImage();
      if (rulesImage) formData.append("REGLAS", rulesImage);
    }
    const responseServe = await sendDataForm(nameLink, formData);
    dispatch(closeLoaderForm());
    dispatch(closeModalLayoutState());
    console.log(responseServe);
    if (!responseServe.state) {
      if (responseServe.errors) {
        let errTrans = errorsTransform(
          responseServe,
          valueWho[who],
          initialErrors
        );
        toastMs().error("Hay campos erroneos");
        return setErrors({ ...errTrans });
      }
      return toastMs().error(responseServe.message || "Error inesperado");
    }
    exec();
  };

  const handleSubmitCreate = async () => {
    const response = await validateSchema();
    if (!response) return;
    templateSubmit(whoLink[who][0], () => {
      toastMs().success("El resgistro se completo correctamente");
      navigate(whoLink[who][2]);
    });
  };

  const handleSubmitUpdate = async () => {
    let jsonInital = JSON.stringify(initialValues),
      jsonValues = JSON.stringify(values);
    if (jsonInital == jsonValues)
      return toastMs().error("No modifico ningun dato");
    const response = await validateSchema();
    if (!response) return;
    const finalSucces = () => {
      toastMs().success("El resgistro se actualizo correctamente");
      navigate(whoLink[who][3] + Object.values(idRecord)[0], {
        replace: true,
      });
    };
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
