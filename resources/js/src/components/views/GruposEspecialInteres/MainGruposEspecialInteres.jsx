import React from 'react';
import GeneralGet from '../ComponentsOfViews/GeneralGet';
import GetCompletadoGrupos from './ComponentsOfGrupos/GetCompletadoGrupos';
import GetRecordConGrupos from './ComponentsOfGrupos/GetRecordConGrupos';
import GetRecordSinGrupos from './ComponentsOfGrupos/GetRecordSinGrupos';
import GetSinCompletarGrupos from './ComponentsOfGrupos/GetSinCompletarGrupos';
import OptionsGrupos from './ComponentsOfGrupos/OptionsGrupos';
import UpdateGrupos from './ComponentsOfGrupos/UpdateGrupos';

const MainGruposEspecialInteres = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarGrupos />}
      {who === 2 && <GetCompletadoGrupos />}
      {who === 3 && <GetRecordSinGrupos />}
      {who === 4 && <GetRecordConGrupos />}
      {who === 5 && <UpdateGrupos />}
      {who === 6 && <OptionsGrupos />}
    </div>
  );
}

export default MainGruposEspecialInteres