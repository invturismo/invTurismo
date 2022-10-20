import {helpHttp} from "../../../../helpers/helpHttp";
import {helpErrors} from "../../../../helpers/helpErrors";

const fetchFormClasificacion = async values => {
  const data = await helpHttp().put(
    "clasificacion-recursos-atractivos/create",
    {body: values}
  );
  if (!data.state) {
    if (data.errors) helpErrors(data);
    return data;
  }
  return data;
};

export {fetchFormClasificacion};
