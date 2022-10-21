import Cookies from "universal-cookie";

//Funcion para eliminar todas las cookies de la app
export const helpDropCookies = () => {
  const cookies = new Cookies();
  cookies.remove("accecs_token");
  cookies.remove("user_role");
  cookies.remove("id_departamentos");
  cookies.remove("id_municipios");
};
