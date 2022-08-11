import React from "react";
import Cookies from "universal-cookie";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import RegistrationForm from "../Form/RegistrationForm";
const cookies = new Cookies();

const CreateUsuarios = () => {
  const userRole = cookies.get("user_role");

  if (userRole != 1)
    return <ErrorComponent message="No es posible el acceso" />;

  return (
    <div className="CreateUsuarios">
      <ActionBack to="/usuarios" />
      <h2>Registrar un usuario</h2>
      <RegistrationForm who={1} />
    </div>
  );
};

export default CreateUsuarios;
