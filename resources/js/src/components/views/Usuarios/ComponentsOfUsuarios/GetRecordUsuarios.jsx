import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { helpCapitalize } from "../../../../helpers/helpCapitalize";
import ButtonPage from "../../../common/ButtonPage";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import useRecordUsuario from "../hooks/useRecordUsuario";

const Information = ({ tittle, children }) => {
  return (
    <p>
      <span className="titleInformation">{tittle}</span>
      <span className="information">{children}</span>
    </p>
  );
};

const GetRecordUsuarios = () => {
  const { idUsuario } = useParams();
  const response = useRecordUsuario(idUsuario, "user");
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClickUpdate = () =>
    navigate(`/usuarios/actualizar/${response.data["ID_USUARIO"]}`);
  const handleClickPassword = () =>
    navigate(`/usuarios/cambiar-clave/${response.data["ID_USUARIO"]}`);

  return (
    <div className="GetRecordUsuarios">
      <ActionBack to="/usuarios" />
      <h2>{response.data["USUARIO"]}</h2>
      <div className="ContainerInformation">
        <div className="MainInformation">
          <Information tittle="Primer nombre:">
            {helpCapitalize(response.data["PRIMER_NOMBRE"])}
          </Information>
          <Information tittle="Segundo nombre:">
            {helpCapitalize(response.data["SEGUNDO_NOMBRE"])}
          </Information>
          <Information tittle="Primer apellido:">
            {helpCapitalize(response.data["PRIMER_APELLIDO"])}
          </Information>
          <Information tittle="Segundo apellido:">
            {helpCapitalize(response.data["SEGUNDO_APELLIDO"])}
          </Information>
          <Information tittle="Correo:">{response.data["CORREO"]}</Information>
          <Information tittle="Tipo de usuario:">
            {response.data["ID_TIPO_USUARIO"] === 1
              ? "Administrativo"
              : "Funcionario"}
          </Information>
        </div>
        <div className="ContainerButtons">
          <ButtonPage colorButton="green" onClick={handleClickUpdate}>
            Actualizar
          </ButtonPage>
          <ButtonPage colorButton="red">Eliminar</ButtonPage>
          <ButtonPage colorButton="blue" onClick={handleClickPassword}>
            Cambiar contraseña
          </ButtonPage>
        </div>
      </div>
    </div>
  );
};

export default GetRecordUsuarios;
