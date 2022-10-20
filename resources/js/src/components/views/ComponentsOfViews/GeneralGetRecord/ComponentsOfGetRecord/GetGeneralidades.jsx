import React from "react";
import {helpWhoData} from "../../../../../helpers/helpWhoData";
import TipoAcceso from "../../GeneralForm/DataJson/DataTipoAcceso.json";
import GetInformation1 from "./GetInformation1";

const GetGeneralidades = ({data, originalData, who}) => {
  return (
    <div className="ContainerGet1">
      <GetInformation1
        content={originalData.GENERALIDADES.DEPARTAMENTO}
        name="Departamento"
        help
      />
      <GetInformation1
        content={originalData.GENERALIDADES.MUNICIPIO}
        name="Municipio"
        help
      />
      <GetInformation1
        content={data.CORREGIMIENTO_VEREDA_LOCALIDAD}
        name="Corregimiento, Vereda o Localidad"
        help
      />
      {who !== "PATRIMONIOS_INMATERIALES" && (
        <GetInformation1 content={data.UBICACION} name="Dirección/Ubicación" />
      )}
      <GetInformation1
        content={data.GEORREFERENCIACION}
        name="Georrefereniciación"
      />
      <GetInformation1
        content={helpWhoData(TipoAcceso, data, "ID_TIPO_ACCESO")["ACCESO"]}
        name="Tipo de Acceso"
      />
      {who !== "PATRIMONIOS_INMATERIALES" && (
        <GetInformation1
          content={data.INDICACIONES_ACCESO}
          name="Indicaciones para el acceso"
        />
      )}
    </div>
  );
};

export default GetGeneralidades;
