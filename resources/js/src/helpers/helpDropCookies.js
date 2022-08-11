import Cookies from "universal-cookie";

export const helpDropCookies = () => {
  const cookies = new Cookies();
  cookies.remove("accecs_token");
  cookies.remove("user_role");
  cookies.remove("id_departamentos");
  cookies.remove("id_municipios");
};
