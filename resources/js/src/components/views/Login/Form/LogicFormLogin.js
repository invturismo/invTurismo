import Cookies from "universal-cookie";
import {helpHttp} from "../../../../helpers/helpHttp";
import {helpErrors} from "../../../../helpers/helpErrors";

//Funcion que ejecuta peticion fetch para enviar datos al servidor
const fetchLogin = async values => {
  const data = await helpHttp({login: true}).post("login", {body: values});
  if (!data.state) {
    helpErrors(data);
    return data;
  }
  return data;
};

//Funcion para guardar los datos de sesion en las cookies
const saveCookies = values => {
  const {accecs_token, user_role} = values;
  const cookies = new Cookies();
  cookies.set("accecs_token", `${accecs_token}`, {path: "/"});
  cookies.set("user_role", user_role, {path: "/"});
};

export {fetchLogin, saveCookies};
