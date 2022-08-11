import React from 'react';
import { useNavigate } from 'react-router-dom';
import { helpCapitalize } from '../../../../helpers/helpCapitalize';

const RowTableListadoPreliminar = ({
  ID_LISTADO,
  FUENTE,
  DEPARTAMENTO,
  MUNICIPIO,
  NOMBRE,
  UBICACION,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`./${ID_LISTADO}`, { replace: true });
  }

  return (
    <tr onClick={handleClick}>
      <td>
        <span>{ID_LISTADO}</span>
      </td>
      <td>
        <span title={NOMBRE}>{helpCapitalize(NOMBRE)}</span>
      </td>
      <td>
        <span title={DEPARTAMENTO}>{helpCapitalize(DEPARTAMENTO)}</span>
      </td>
      <td>
        <span title={MUNICIPIO}>{helpCapitalize(MUNICIPIO)}</span>
      </td>
      <td>
        <span title={UBICACION}>{helpCapitalize(UBICACION)}</span>
      </td>
      <td>
        <span title={FUENTE}>{helpCapitalize(FUENTE)}</span>
      </td>
    </tr>
  );
};

export default RowTableListadoPreliminar