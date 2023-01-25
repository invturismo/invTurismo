import Cookies from "universal-cookie";
import {helpDropCookies} from "./helpDropCookies";
import {helpHttp} from "./helpHttp";
import {toastMs} from "./helpToastMessage";

const helpLogout = async () => {
  const cookies = new Cookies();
  const token = cookies.get("accecs_token");
  try {
    const data = await helpHttp().post("logout");
    if (!data.state) throw data;
    return data;
  } catch (error) {
    toastMs().error(error.message);
    return error;
  } finally {
    if (token) helpDropCookies();
  }
};

export {helpLogout};
