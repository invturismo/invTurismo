import React from 'react';
import GetCompletadoMaterial from './ComponentsOfMaterial/GetCompletadoMaterial';
import GetRecordConMaterial from './ComponentsOfMaterial/GetRecordConMaterial';
import GetRecordSinMaterial from './ComponentsOfMaterial/GetRecordSinMaterial';
import GetSinCompletarMaterial from './ComponentsOfMaterial/GetSinCompletarMaterial';
import OptionsMaterial from './ComponentsOfMaterial/OptionsMaterial';
import UpdatePatrimonioMaterial from './ComponentsOfMaterial/UpdatePatrimonioMaterial';

const MainPatrimonioMaterial = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarMaterial />}
      {who === 2 && <GetCompletadoMaterial />}
      {who === 3 && <GetRecordSinMaterial />}
      {who === 4 && <GetRecordConMaterial />}
      {who === 5 && <UpdatePatrimonioMaterial />}
      {who === 6 && <OptionsMaterial />}
    </div>
  );
}

export default MainPatrimonioMaterial;