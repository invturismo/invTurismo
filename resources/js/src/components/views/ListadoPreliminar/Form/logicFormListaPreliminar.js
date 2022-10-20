import {helpErrors} from "../../../../helpers/helpErrors";
import {helpHttp} from "../../../../helpers/helpHttp";

const fetchFormListaPreliminar = async (values, method, url) => {
  values.ID_FUENTE = parseInt(values.ID_FUENTE);
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

export {fetchFormListaPreliminar};
