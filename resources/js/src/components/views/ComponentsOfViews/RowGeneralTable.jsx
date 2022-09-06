import React from 'react'
import { useNavigate } from 'react-router-dom';
import { helpCapitalize } from '../../../helpers/helpCapitalize';

const RowGeneralTable = ({
  ID,
  NOMBRE,
  CODIGO,
  CALIFICACION,
  UBICACION,
  GEORREFERENCIACION
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`./${ID}`);
  };

  return (
    <tr onClick={handleClick}>
      <td>
        <span>{ID}</span>
      </td>
      <td>
        <span title={NOMBRE}>{helpCapitalize(NOMBRE)}</span>
      </td>
      <td>
        <span title={CODIGO}>{CODIGO}</span>
      </td>
      <td>
        <span title={CALIFICACION}>{CALIFICACION}</span>
      </td>
      <td>
        <span title={UBICACION}>{helpCapitalize(UBICACION)}</span>
      </td>
      <td>
        <span title={GEORREFERENCIACION}>{GEORREFERENCIACION}</span>
      </td>
    </tr>
  );
}

export default RowGeneralTable