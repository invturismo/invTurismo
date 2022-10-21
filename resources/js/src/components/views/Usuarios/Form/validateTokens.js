import {helpHttp} from "../../../../helpers/helpHttp";

//Funcion para consultar al servidor si el usuario esta en sesion
export const validateTokens = async (ID_USUARIO, ACTUALIZANDO) => {
  const body = {ID_USUARIO};
  if (ACTUALIZANDO) body.ACTUALIZANDO = ACTUALIZANDO;
  const response = await helpHttp().post("validate-tokens", {
    body,
  });
  if (response.state) return [4];
  if (response.deleteMessage) return [2, response.deleteMessage];
  if (response.message) return [0, response.message];
  if (response.hasOwnProperty("equal")) return [1, response.equal];
  return [5];
};
