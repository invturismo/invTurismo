import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { helpCapitalize } from "../../../../helpers/helpCapitalize";
import { toastMs } from "../../../../helpers/helpToastMessage";
import ButtonPage from "../../../common/ButtonPage";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import useRecordClasificacion from "../hooks/useRecordClasificacion";

const GetRecordClasificado = () => {
  const { idRecursoAtractivo } = useParams();
  const response = useRecordClasificacion(idRecursoAtractivo, "clas");
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = (condition) => {
    if (condition)
      return toastMs().error(
        "No es posible actualizar, tienes que borrar el registro en su correspondiente clasificacion"
      );
    navigate(
      `/clasificacion-recursos-atractivos/clasificado/actualizar/${response.data.ID_LISTADO}`,
      {replace:true}
    );
  };

  return (
    <div className="GetRecordClasificado">
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
            <span className="titleInformation">Tipo de bien: </span>
            <span className="information">
              {helpCapitalize(response.data["TIPO_BIEN"])}
            </span>
          </p>
          <p>
            <span className="titleInformation">Fecha: </span>
            <span className="information">
              {response.data["FECHA_MOVIMIENTO"]}
            </span>
          </p>
          <p>
            <span className="titleInformation">Diligenciado por: </span>
            <span className="information">{response.data["USUARIO"]}</span>
          </p>
        </div>
        <div className="ContainerButtons">
          <span
            onClick={() => handleClick(response.data["ID_TIPO_PATRIMONIO"])}
          >
            <ButtonPage
              colorButton={
                response.data["ID_TIPO_PATRIMONIO"] ? "gray" : "green"
              }
            >
              Actualizar
            </ButtonPage>
          </span>
        </div>
      </div>
    </div>
  );
};

export default GetRecordClasificado;
