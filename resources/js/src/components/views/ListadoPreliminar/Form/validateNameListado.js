import {helpHttp} from "../../../../helpers/helpHttp";

//Funcion para comprobar si el nombre ya se encuentra en la base de datos
export const validateNameListado = async ({
  ID_LISTADO,
  NOMBRE,
  ID_DEPARTAMENTOS,
  ID_MUNICIPIOS,
}) => {
  const body = {NOMBRE, ID_DEPARTAMENTOS, ID_MUNICIPIOS};
  if (ID_LISTADO) body.ID_LISTADO = ID_LISTADO;
  const response = await helpHttp().post(
    "listados-preliminares/validate-name",
    {
      body,
    }
  );
  if (response.state) return [2];
  if (response.message) return [0, response.message];
  return [1];
};
