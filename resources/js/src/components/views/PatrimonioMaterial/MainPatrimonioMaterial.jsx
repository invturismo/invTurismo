import React from 'react';
import GeneralGet from '../ComponentsOfViews/GeneralGet';
import GetRecordSinMaterial from './ComponentsOfMaterial/GetRecordSinMaterial';
import GetSinCompletarMaterial from './ComponentsOfMaterial/GetSinCompletarMaterial';

const calidadValues = {
  ESTADO_CONSERVACION: "",
  CONSTITUCION: "",
  REPRESENTATIVIDAD: "",
};

const GetCompletadoPatrimonioMaterial = () => {
  return (
    <>
      <GeneralGet
        h2Text="Patrimonio material"
        toFirst="/patrimonio-material/sin-completar"
        toLast="/patrimonio-material/completado"
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para visualizar</td>
        </tr>
      </GeneralGet>
    </>
  );
}

const MainPatrimonioMaterial = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarMaterial />}
      {who === 2 && <GetCompletadoPatrimonioMaterial />}
      {who === 3 && <GetRecordSinMaterial/>}
    </div>
  );
}

export default MainPatrimonioMaterial;