import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../../../../features/modalsSlice";
import {helpDeleteRegister} from "../../../../helpers/helpDeleteRegister";
import {toastMs} from "../../../../helpers/helpToastMessage";

export const helpDeleteRecurso = async ({
  body,
  url,
  navigate,
  dispatch,
  linkNavigate,
}) => {
  const handleFunction = async () => {
    dispatch(openLoaderForm());
    const response = await helpDeleteRegister(url, body);
    dispatch(closeLoaderForm());
    dispatch(closeModalLayoutState());
    if (!response.state) return toastMs().error(response.message);
    navigate(linkNavigate);
    toastMs().success("El recurso se elimino con exito");
  };
  const dataPayload = {
    textMessage1: "¿Estas seguro que quieres",
    textMessage2: "Eliminar este recurso?",
    textButton: "Eliminar",
    srcImg: "svgDelete",
    handleFunction,
  };
  dispatch(openModalLayoutState(dataPayload));
};
