import {helpHttp} from "./helpHttp";
import {toastMs} from "./helpToastMessage";

export const helpAddTimeSession = async () => {
  try {
    const data = await helpHttp().post("add-time-session");
    if (!data.state) throw data;
    return data;
  } catch (error) {
    toastMs().error(error.message);
    return error;
  }
};
