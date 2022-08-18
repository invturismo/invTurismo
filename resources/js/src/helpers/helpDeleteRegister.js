import { helpHttp } from "./helpHttp";
import { toastMs } from "./helpToastMessage";

export const helpDeleteRegister = async (idRegister) => {
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