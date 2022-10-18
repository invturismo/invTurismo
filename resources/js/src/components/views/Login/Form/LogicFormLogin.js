import Cookies from "universal-cookie";
import {helpHttp} from "../../../../helpers/helpHttp";
import {helpErrors} from "../../../../helpers/helpErrors";

const fetchLogin = async values => {
  const data = await helpHttp({login: true}).post("login", {body: values});
  if (!data.state) {
    helpErrors(data);
    return data;
  }
  return data;
};

const saveCookies = values => {
  const {accecs_token, user_role} = values;
  console.log(accecs_token);
  console.log(user_role);
  const cookies = new Cookies();
  cookies.set("accecs_token", `${accecs_token}`, {path: "/"});
  cookies.set("user_role", user_role, {path: "/"});
};

export {fetchLogin, saveCookies};
