import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {helpCapitalize} from "../../../../helpers/helpCapitalize";
import ButtonPage from "../../../common/ButtonPage";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {ACTUALIZAR, CAMBIARCLAVE, USUARIOS} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import {helpDeleteUsuario} from "../helpers/helpDeleteUsuario";
import useRecordUsuario from "../hooks/useRecordUsuario";

const Information = ({tittle, children}) => {
  return (
    <p>
      <span className="titleInformation">{tittle}</span>
      <span className="information">{children}</span>
    </p>
  );
};

const GetRecordUsuarios = () => {
  const {idUsuario} = useParams();
  const response = useRecordUsuario(idUsuario, "user");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClickUpdate = () =>
    navigate(`${USUARIOS}${ACTUALIZAR}/${response.data["ID_USUARIO"]}`, {
      replace: true,
    });
  const handleClickPassword = () =>
    navigate(`${USUARIOS}${CAMBIARCLAVE}/${response.data["ID_USUARIO"]}`, {
      replace: true,
    });

  return (
    <div className="GetRecordUsuarios">
      <ActionBack to={-1} />
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
          <ButtonPage colorButton="#5328fe" onClick={handleClickUpdate}>
            Actualizar
          </ButtonPage>
          <ButtonPage
            colorButton="#220646"
            onClick={() => helpDeleteUsuario({dispatch, idUsuario, navigate})}
          >
            Eliminar
          </ButtonPage>
          <ButtonPage colorButton="blue" onClick={handleClickPassword}>
            {"Cambiar \ncontraseña"}
          </ButtonPage>
        </div>
      </div>
    </div>
  );
};

export default GetRecordUsuarios;
