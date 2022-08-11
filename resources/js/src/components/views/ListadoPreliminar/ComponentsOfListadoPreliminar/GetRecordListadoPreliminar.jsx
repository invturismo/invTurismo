import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { helpCapitalize } from '../../../../helpers/helpCapitalize';
import ButtonPage from '../../../common/ButtonPage';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import useRecordListadoPreliminar from '../hooks/useRecordListadoPreliminar';

const GetRecordListadoPreliminar = () => {
  const { idListado } = useParams();
  const response = useRecordListadoPreliminar(idListado);
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;
  
  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(`/listado-preliminar/actualizar/${response.data.ID_LISTADO}`, {
      replace: true,
    });
  }

  return (
    <div className="GetRecordListadoPreliminar">
      <ActionBack to="/listado-preliminar" />
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
        </div>
        <div className="ContainerButtons">
          <span onClick={handleClick}>
            <ButtonPage colorButton="green">Actualizar</ButtonPage>
          </span>
          <span>
            <ButtonPage colorButton="red">Eliminar</ButtonPage>
          </span>
        </div>
      </div>
    </div>
  );
}

export default GetRecordListadoPreliminar;