import React from "react";
import Cookies from "universal-cookie";
import {USUARIOS} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import TitleForm from "../../ComponentsOfViews/TitleForm";
import RegistrationForm from "../Form/RegistrationForm";
const cookies = new Cookies();

const CreateUsuarios = () => {
  const userRole = cookies.get("user_role");

  if (userRole != 1)
    return <ErrorComponent message="No es posible el acceso" />;

  return (
    <div className="CreateUsuarios">
      <ActionBack to={`${USUARIOS}`} />
      <TitleForm title="Registrar un usuario" />
      <RegistrationForm who={1} />
    </div>
  );
};

export default CreateUsuarios;
