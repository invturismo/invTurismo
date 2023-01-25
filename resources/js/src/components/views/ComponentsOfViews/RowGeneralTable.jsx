import React from "react";
import {useNavigate} from "react-router-dom";
import {helpCapitalize} from "../../../helpers/helpCapitalize";

const RowGeneralTable = ({
  ID,
  NOMBRE,
  CODIGO,
  CALIFICACION,
  UBICACION,
  GEORREFERENCIACION,
  linkNavigate,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(linkNavigate || `./${ID}`);
  };

  return (
    <tr onClick={handleClick}>
      <td>
        <span>{ID}</span>
      </td>
      <td>
        <span title={NOMBRE} style={{textTransform: "capitalize"}}>
          {NOMBRE}
        </span>
      </td>
      <td className={!CODIGO ? "noRowData" : null}>
        <span title={CODIGO}>{CODIGO || "-"}</span>
      </td>
      <td className={!CALIFICACION ? "noRowData" : null}>
        <span title={CALIFICACION}>{CALIFICACION || "-"}</span>
      </td>
      <td className={!UBICACION ? "noRowData" : null}>
        <span title={UBICACION}>{helpCapitalize(UBICACION) || "-"}</span>
      </td>
      <td className={!GEORREFERENCIACION ? "noRowData" : null}>
        <span title={GEORREFERENCIACION}>{GEORREFERENCIACION || "-"}</span>
      </td>
    </tr>
  );
};

export default RowGeneralTable;
