import React from 'react';
import GetSinClasificar from './ComponentsOfClasificacion/GetSinClasificar';
import GetRecordClasificacionAtractivosTuristicos from './ComponentsOfClasificacion/GetRecordClasificacionAtractivosTuristicos';
import { StyleMainClasificacionAtractivosTuristicos } from './StyleMainClasificacionAtractivosTuristicos';
import GetClasificado from './ComponentsOfClasificacion/GetClasificado';
import GetRecordClasificado from './ComponentsOfClasificacion/GetRecordClasificado';
import OptionsClasificacion from './ComponentsOfClasificacion/OptionsClasificacion';

const MainClasificacionAtractivosTuristicos = ({who}) => {
  return (
    <StyleMainClasificacionAtractivosTuristicos>
      {who === 1 && <GetSinClasificar />}
      {who === 2 && <GetClasificado />}
      {who === 3 && (
        <GetRecordClasificacionAtractivosTuristicos
          url="sinclas"
          back="sin-clasificar"
        />
      )}
      {who === 4 && <GetRecordClasificado />}
      {who === 5 && (
        <GetRecordClasificacionAtractivosTuristicos
          actualizando={true}
          url="clas"
          back="clasificado"
        />
      )}
      {who === 6 && <OptionsClasificacion />}
    </StyleMainClasificacionAtractivosTuristicos>
  );
}

export default MainClasificacionAtractivosTuristicos;