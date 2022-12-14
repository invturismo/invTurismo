import {helpErrors} from "../../../../helpers/helpErrors";
import {helpHttp} from "../../../../helpers/helpHttp";

//Funcion que ejecuta peticion fetch para enviar datos al servidor
const fetchFormUsuarios = async (values, method, url) => {
  const response = await helpHttp()[method](url, {
    body: values,
  });
  if (!response.state) {
    if (response.errors) {
      helpErrors(response);
      return response;
    }
    return response;
  }
  return response;
};

export {fetchFormUsuarios};
