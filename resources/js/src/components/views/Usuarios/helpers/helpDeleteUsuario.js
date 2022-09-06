import { closeLoaderForm, closeModalLayoutState, openLoaderForm, openModalLayoutState } from "../../../../features/modalsSlice";
import { helpHttp } from "../../../../helpers/helpHttp";
import { toastMs } from "../../../../helpers/helpToastMessage";
import { validateTokens } from "../Form/validateTokens";

const sendData = async (idRegister) => {
  try {
    const body = { ID_USUARIO: idRegister };
    const response = await helpHttp().del("user-delete", {
      body,
    });
    if (!response.state) toastMs().error(response.message);
    return response;
  } catch (error) {
    toastMs().error(error.message);
    return error;
  }
};

export const helpDeleteUsuario = async ({ idUsuario, dispatch,navigate }) => {
  console.log(idUsuario);
  dispatch(openLoaderForm());
  const tokensValidate = await validateTokens(idUsuario);
  dispatch(closeLoaderForm());
  if (tokensValidate[0] === 0 || tokensValidate[0] === 2)
    return toastMs().error(tokensValidate[1]);
  let textMessage1 =
    tokensValidate[0] == 4
      ? `¿Estas seguro que quieres`
      : "El usario esta en sesion";
  let textMessage2 =
    tokensValidate[0] == 4
      ? "Eliminar este registro?"
      : "¿Esta seguro que deseas eliminarlo?";
  const handleFunction = async () => {
    dispatch(openLoaderForm());
    const response = await sendData(idUsuario);
    dispatch(closeLoaderForm());
    dispatch(closeModalLayoutState());
    if (!response.state) return toastMs().error(response.message);
    navigate("/usuarios");
    toastMs().success("El registro se elimino con exito");
  };
  const dataPayload = {
    textMessage1,
    textMessage2,
    textButton: "Eliminar",
    srcImg: "svgDelete",
    whoFunction: "handleClickDelete",
    handleFunction,
  };
  dispatch(openModalLayoutState(dataPayload));
};