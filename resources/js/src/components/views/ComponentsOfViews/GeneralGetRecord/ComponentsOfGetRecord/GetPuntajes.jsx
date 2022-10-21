import React from "react";
import GetInformation1 from "./GetInformation1";
import Significado from "../../GeneralForm/DataJson/DataSignificado.json";
import {helpWhoData} from "../../../../../helpers/helpWhoData";

const whoFields = {
  PATRIMONIO_MATERIAL: [
    ["ESTADO_CONSERVACION", "Estado de conservacion"],
    ["CONSTITUCION", "Constitucion del bien"],
    ["REPRESENTATIVIDAD", "Representatividad general"],
  ],
  PATRIMONIOS_INMATERIALES: [
    ["COLECTIVA", "Colectiva"],
    ["TRADICIONAL", "Tradicional"],
    ["ANONIMA", "Anónima"],
    ["ESPONTANEA", "Espontánea"],
    ["POPULAR", "Popular"],
  ],
  FESTIVIDADES_EVENTOS: [
    ["ORGANIZACION", "Organización del evento"],
    ["B_SOCIOCULTURALES", "Beneficios socioculturales para la comunidad"],
    ["B_ECONOMICOS", "Beneficios económicos locales"],
  ],
  GRUPOS_ESPECIALES: [["R_COSTUMBRES", "Respeto por las costumbres"]],
  SITIOS_NATURALES: [
    ["S_C_AIRE", "Sin contaminación del aire"],
    ["S_C_AGUA", "Sin contaminación del agua"],
    ["S_C_VISUAL", "Sin contaminación visual"],
    ["CONSERVACION", "Estado de conservación"],
    ["S_C_SONORA", "Sin contaminación sonora"],
    ["DIVERSIDAD", "Diversidad"],
    ["SINGULARIDAD", "Singularidad"],
  ],
};

const GetPuntajes = ({data, who}) => {
  return (
    <>
      <div className="GetContainerTittle">
        <h4>Calidad</h4>
        <div className="ContainerGet1">
          {whoFields[who].map(val => (
            <GetInformation1
              key={"CALIDAD_" + val[0]}
              content={data.CALIDAD[val[0]] || "0"}
              name={val[1]}
            />
          ))}
          <div className="TotalStyle">
            <p>
              <b>Subtotal: </b>
              {data.CALIDAD.SUBTOTAL}
            </p>
          </div>
        </div>
      </div>
      <div className="GetContainerTittle">
        <h4>Significado</h4>
        <div className="ContainerGet1">
          <GetInformation1
            content={
              helpWhoData(Significado, data, "ID_SIGNIFICADO")["PUNTAJE"]
            }
            name={
              helpWhoData(Significado, data, "ID_SIGNIFICADO")["SIGNIFICADO"]
            }
          />
          <div className="TotalStyle">
            <p>
              <b>Total: </b>
              {data.TOTAL}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetPuntajes;
