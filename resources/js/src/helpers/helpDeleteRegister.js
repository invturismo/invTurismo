import {helpHttp} from "./helpHttp";
import {toastMs} from "./helpToastMessage";

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
