import React from "react";
import {helpWhoData} from "../../../../../helpers/helpWhoData";
import TipoPatrimonio from "../../GeneralForm/DataJson/DataTiposPatrimonio.json";
import Grupo from "../../GeneralForm/DataJson/DataGrupos.json";
import Componente from "../../GeneralForm/DataJson/DataComponentes.json";
import Elemento from "../../GeneralForm/DataJson/DataElementos.json";
import GetInformation1 from "./GetInformation1";

const GetCaracteristicas = ({data, dataCodigo, originalData}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Codigo</h4>
      <div className="ContainerCodigoInformation">
        <p>{originalData.CARACTERISTICAS.CODIGOS.CODIGO}</p>
      </div>
      <div className="ContainerGet1">
        <GetInformation1
          content={
            helpWhoData(TipoPatrimonio, dataCodigo, "ID_TIPO_PATRIMONIO")[
              "PATROMONIO"
            ]
          }
          name="Tipo de patrimonio"
          help
        />
        <GetInformation1
          content={
            helpWhoData(
              Grupo[dataCodigo.ID_TIPO_PATRIMONIO],
              dataCodigo,
              "ID_GRUPO"
            )["GRUPO"]
          }
          name="Grupo"
          help
        />
        {Componente[dataCodigo.ID_TIPO_PATRIMONIO][dataCodigo.ID_GRUPO] && (
          <GetInformation1
            content={
              helpWhoData(
                Componente[dataCodigo.ID_TIPO_PATRIMONIO][dataCodigo.ID_GRUPO],
                dataCodigo,
                "ID_COMPONENTE"
              )["COMPONENTE"]
            }
            name="Componente"
            help
          />
        )}
        {Elemento[dataCodigo.ID_TIPO_PATRIMONIO][dataCodigo.ID_GRUPO] &&
          Elemento[dataCodigo.ID_TIPO_PATRIMONIO][dataCodigo.ID_GRUPO][
            dataCodigo.ID_COMPONENTE
          ] && (
            <GetInformation1
              content={
                helpWhoData(
                  Elemento[dataCodigo.ID_TIPO_PATRIMONIO][dataCodigo.ID_GRUPO][
                    dataCodigo.ID_COMPONENTE
                  ],
                  dataCodigo,
                  "ID_ELEMENTO"
                )["ELEMENTO"]
              }
              name="Elemento"
              help
            />
          )}
        <GetInformation1 content={data.DESCRIPCION} name="Descripcion" />
      </div>
    </div>
  );
};

export default GetCaracteristicas;
