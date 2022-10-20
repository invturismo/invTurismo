import Cookies from "universal-cookie";
import {API} from "../../../router/paths";

export const sendDataForm = (endpoint, formData) => {
  const defaultHeader = {
      Accept: "application/json",
    },
    options = {};
  const cookies = new Cookies();
  const token = cookies.get("accecs_token");
  defaultHeader.Authorization = `Bearer ${token}`;
  options.method = "POST";
  options.headers = defaultHeader;
  options.body = formData;
  return fetch(API + endpoint, options)
    .then(res =>
      res.ok
        ? res.json()
        : Promise.reject({
            state: false,
            status: res.status || "00",
            message: res.statusText || "Ocurrió un error",
          })
    )
    .catch(err => err);
};
