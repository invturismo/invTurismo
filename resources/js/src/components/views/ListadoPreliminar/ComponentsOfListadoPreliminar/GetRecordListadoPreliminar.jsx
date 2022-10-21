import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {helpCapitalize} from "../../../../helpers/helpCapitalize";
import {toastMs} from "../../../../helpers/helpToastMessage";
import ButtonPage from "../../../common/ButtonPage";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {ACTUALIZAR, LISTADO} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import {helpDeleteRecurso} from "../../ComponentsOfViews/helpers/helpDeleteRecurso";
import useRecordListadoPreliminar from "../hooks/useRecordListadoPreliminar";

const GetRecordListadoPreliminar = () => {
  const {idListado} = useParams();
  const response = useRecordListadoPreliminar(idListado);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = condition => {
    if (condition)
      return toastMs().error(
        "No es posible actualizar, tienes que actualizarlo en su correspondiente clasificacion"
      );
    navigate(`${LISTADO}${ACTUALIZAR}/${response.data.ID_LISTADO}`, {
      replace: true,
    });
  };

  const handleDelete = idPatrimonio => {
    if (idPatrimonio)
      return toastMs().error(
        "No es posible eliminar, tienes que eliminarlo en su correspondiente clasificacion"
      );
    const body = {ID_LISTADO: idListado};
    helpDeleteRecurso({
      body,
      dispatch,
      navigate,
      linkNavigate: `${LISTADO}`,
      url: "listados-preliminares/delete",
    });
  };

  return (
    <div className="GetRecordListadoPreliminar">
      <ActionBack to={-1} />
      <h2>{response.data["NOMBRE"]}</h2>
      <div className="ContainerInformation">
        <div className="MainInformation">
          <p>
            <span className="titleInformation">Departamento: </span>{" "}
            <span className="information">
              {helpCapitalize(response.data["DEPARTAMENTO"])}
            </span>
          </p>
          <p>
            <span className="titleInformation">Municipio: </span>
            <span className="information">
              {helpCapitalize(response.data["MUNICIPIO"])}
            </span>
          </p>
          <p>
            <span className="titleInformation">Ubicación: </span>
            <span className="information">
              {helpCapitalize(response.data["UBICACION"])}
            </span>
          </p>
          <p>
            <span className="titleInformation">Fuente: </span>
            <span className="information">
              {helpCapitalize(response.data["FUENTE"])}
            </span>
          </p>
          <p>
            <span className="titleInformation">Fecha creacion: </span>
            <span className="information">
              {response.data["FECHA_MOVIMIENTO"]}
            </span>
          </p>
          <p>
            <span className="titleInformation">Creado por: </span>
            <span className="information">{response.data["USUARIO"]}</span>
          </p>
          {response.data["FECHA_MODIFICACION"] && (
            <p>
              <span className="titleInformation">Fecha actualizacion: </span>
              <span className="information">
                {response.data["FECHA_MODIFICACION"]}
              </span>
            </p>
          )}
          {response.data["USUARIO_AC"] && (
            <p>
              <span className="titleInformation">Actulizado por: </span>
              <span className="information">{response.data["USUARIO_AC"]}</span>
            </p>
          )}
        </div>
        <div className="ContainerButtons">
          <span
            onClick={() => handleClick(response.data["ID_TIPO_PATRIMONIO"])}
          >
            <ButtonPage
              colorButton={
                response.data["ID_TIPO_PATRIMONIO"] ? "gray" : "#5328fe"
              }
            >
              Actualizar
            </ButtonPage>
          </span>
          <span
            onClick={() => handleDelete(response.data["ID_TIPO_PATRIMONIO"])}
          >
            <ButtonPage
              colorButton={
                response.data["ID_TIPO_PATRIMONIO"] ? "gray" : "#220646"
              }
            >
              Eliminar
            </ButtonPage>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetRecordListadoPreliminar;
