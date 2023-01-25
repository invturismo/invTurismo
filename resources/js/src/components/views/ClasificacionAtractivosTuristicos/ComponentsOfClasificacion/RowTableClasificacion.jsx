import React from "react";
import {useNavigate} from "react-router-dom";
import {helpCapitalize} from "../../../../helpers/helpCapitalize";

const RowTableClasificacion = ({
  ID_LISTADO,
  NOMBRE,
  DEPARTAMENTO,
  MUNICIPIO,
  TIPO_BIEN,
  who,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`./${ID_LISTADO}`);
  };

  return (
    <tr onClick={handleClick}>
      <td>
        <span>{ID_LISTADO}</span>
      </td>
      <td>
        <span title={NOMBRE} style={{textTransform: "capitalize"}}>
          {NOMBRE}
        </span>
      </td>
      <td>
        <span title={DEPARTAMENTO}>{helpCapitalize(DEPARTAMENTO)}</span>
      </td>
      <td>
        <span title={MUNICIPIO}>{helpCapitalize(MUNICIPIO)}</span>
      </td>
      {who === 2 && (
        <td>
          <span title={TIPO_BIEN}>{helpCapitalize(TIPO_BIEN)}</span>
        </td>
      )}
    </tr>
  );
};

export default RowTableClasificacion;
