import React from 'react';
import GetCompletadoInmaterial from './ComponentsOfInmaterial/GetCompletadoInmaterial';
import GetRecordConInmaterial from './ComponentsOfInmaterial/GetRecordConInmaterial';
import GetRecordSinInmaterial from './ComponentsOfInmaterial/GetRecordSinInmaterial';
import GetSinCompletarInmaterial from './ComponentsOfInmaterial/GetSinCompletarInmaterial';

const MainPatrimonioInmaterial = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarInmaterial />}
      {who === 2 && <GetCompletadoInmaterial />}
      {who === 3 && <GetRecordSinInmaterial />}
      {who === 4 && <GetRecordConInmaterial />}
    </div>
  );
}

export default MainPatrimonioInmaterial