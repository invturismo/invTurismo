import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../../../../features/modalsSlice";
import {helpDeleteRegister} from "../../../../helpers/helpDeleteRegister";
import {toastMs} from "../../../../helpers/helpToastMessage";
import {USUARIOS} from "../../../router/paths";
import {validateTokens} from "../Form/validateTokens";

//Funcion para eliminar un usuario
export const helpDeleteUsuario = async ({idUsuario, dispatch, navigate}) => {
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
    const body = {ID_USUARIO: idUsuario},
      url = "user-delete";
    const response = await helpDeleteRegister(url, body);
    dispatch(closeLoaderForm());
    dispatch(closeModalLayoutState());
    if (!response.state) return toastMs().error(response.message);
    navigate(`${USUARIOS}`);
    toastMs().success("El usuario se elimino con exito");
  };
  const dataPayload = {
    textMessage1,
    textMessage2,
    textButton: "Eliminar",
    srcImg: "svgDelete",
    handleFunction,
  };
  dispatch(openModalLayoutState(dataPayload));
};
