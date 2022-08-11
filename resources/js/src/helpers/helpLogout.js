import Cookies from "universal-cookie";
import { helpDropCookies } from "./helpDropCookies";
import { helpHttp } from "./helpHttp";

const helpLogout = async () => {
  const cookies = new Cookies();
  const token = cookies.get("accecs_token");
  try {
    const data = await helpHttp().post("logout");
    if (!data.status) throw data;
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    if (token) helpDropCookies();
  }
}

export { helpLogout };