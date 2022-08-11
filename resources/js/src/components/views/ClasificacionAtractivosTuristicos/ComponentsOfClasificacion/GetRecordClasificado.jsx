import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { helpCapitalize } from '../../../../helpers/helpCapitalize';
import ButtonPage from '../../../common/ButtonPage';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import useRecordClasificacion from '../hooks/useRecordClasificacion';

const GetRecordClasificado = () => {
  const { idRecursoAtractivo } = useParams();
  const response = useRecordClasificacion(idRecursoAtractivo,"clas");
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `/clasificacion-recursos-atractivos/clasificado/actualizar/${response.data.ID_LISTADO}`,
      {
        replace: true,
      }
    );
  };

  return (
    <div className="GetRecordClasificado">
      <ActionBack to="/clasificacion-recursos-atractivos/clasificado" />
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
        </div>
        <div className="ContainerButtons">
          <span onClick={handleClick}>
            <ButtonPage colorButton="green">Actualizar</ButtonPage>
          </span>
        </div>
      </div>
    </div>
  );
}

export default GetRecordClasificado