import React from "react";
import {helpCapitalize} from "../../../../../helpers/helpCapitalize";
import GetInformation1 from "./GetInformation1";
import TableInformation from "./TableInformation";
import TipoClima from "../../GeneralForm/DataJson/DataTipoClima.json";
import TipoEstado from "../../GeneralForm/DataJson/DataTipoEstadoAtractivo.json";
import {helpWhoData} from "../../../../../helpers/helpWhoData";

const validateDataBoolean = values => {
  let finalArray = [];
  for (const key in values) {
    if (typeof values[key] != "boolean") continue;
    if (values[key]) finalArray.push(key);
  }
  return finalArray;
};

const validateTarifa = values => {
  let newObject = {...values};
  for (const key in newObject) {
    if (!newObject[key]) continue;
    newObject[key] += " $";
  }
  return newObject;
};

const Clima = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Clima</h4>
      <div className="ContainerGet1">
        <GetInformation1
          content={helpWhoData(TipoClima, data, "ID_TIPO_CLIMA")?.TIPO_CLIMA}
          name="Tipo de clima"
        />
        <GetInformation1
          content={data.TEMPERATURA + " °C"}
          name="Temperatura"
        />
      </div>
    </div>
  );
};

const Horarios = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Horario</h4>
      <div className="ContainerGet1">
        <div className="GetInformation2">
          <h5>Acceso</h5>
          {validateDataBoolean(data.ACCESO_HORARIOS).length > 0 ? (
            <ul>
              {validateDataBoolean(data.ACCESO_HORARIOS).map(val => (
                <li key={"Acceso" + val}>{helpCapitalize(val)}</li>
              ))}
            </ul>
          ) : (
            <p>Sin informacion</p>
          )}
        </div>
        <div className="GetInformation2">
          <h5>Dias de visita</h5>
          {validateDataBoolean(data.DIAS_HORARIOS).length > 0 ? (
            <ul>
              {validateDataBoolean(data.DIAS_HORARIOS).map(val => (
                <li key={"Dias" + val}>{helpCapitalize(val)}</li>
              ))}
            </ul>
          ) : (
            <p>Sin informacion</p>
          )}
        </div>
        <GetInformation1
          content={data.DIAS_HORARIOS.HORAS}
          name="Descripcion del horario"
          help
        />
      </div>
    </div>
  );
};

const Tarifas = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Tarifas</h4>
      <TableInformation data={validateTarifa(data)} parent="TARIFAS" />
    </div>
  );
};

const EstadoAtractivo = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Estado del atractivo</h4>
      <div className="ContainerGet1">
        <GetInformation1
          content={helpWhoData(TipoEstado, data, "ID_ESTADO")?.ESTADO}
          name="Tipo de estado"
        />
        <GetInformation1
          content={helpWhoData(TipoEstado, data, "ID_ESTADO")?.DESCRIPCION}
          name="Descripcion"
        />
      </div>
    </div>
  );
};

const GetRelevantes = ({data}) => {
  return (
    <>
      <Clima data={data} />
      <Horarios data={data} />
      <Tarifas data={data.TARIFAS} />
      <EstadoAtractivo data={data} />
    </>
  );
};

export default GetRelevantes;
