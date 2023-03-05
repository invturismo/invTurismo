import {helpHttp} from "./helpHttp";
import {toastMs} from "./helpToastMessage";

//Funcion base para enviar peticion de eliminar registro de la base de datos
export const helpDeleteRegister = async (url, body) => {
  try {
    const response = await helpHttp().del(url, {
      body,
    });
    if (!response.state) toastMs().error(response.message);
    return response;
  } catch (error) {
    toastMs().error(error.message);
    return error;
  }
};
