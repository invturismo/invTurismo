import {helpHttp} from "./helpHttp";
import {toastMs} from "./helpToastMessage";

//Funcion que envia al servidor una peticion para añadir tiempo a la sesion
export const helpAddTimeSession = async () => {
  try {
    const data = await helpHttp().post("add-time-session");
    console.log(data);
    if (!data.state) throw data;
    return data;
  } catch (error) {
    toastMs().error(error.message);
    return error;
  }
};
