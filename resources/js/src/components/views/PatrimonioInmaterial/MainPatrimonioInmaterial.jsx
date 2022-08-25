import React from 'react';
import GeneralGet from '../ComponentsOfViews/GeneralGet';

const GetSinCompletarPatrimonioInmaterial = () => {
  return (
    <>
      <GeneralGet
        h2Text="Patrimonio inmaterial"
        toFirst="/patrimonio-inmaterial/sin-completar"
        toLast="/patrimonio-inmaterial/completado"
        linkOptions="/patrimonio-inmaterial/opciones"
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para completar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const GetCompletadoPatrimonioInmaterial = () => {
  return (
    <>
      <GeneralGet
        h2Text="Patrimonio inmaterial"
        toFirst="/patrimonio-inmaterial/sin-completar"
        toLast="/patrimonio-inmaterial/completado"
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para visualizar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const MainPatrimonioInmaterial = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarPatrimonioInmaterial />}
      {who === 2 && <GetCompletadoPatrimonioInmaterial />}
    </div>
  );
}

export default MainPatrimonioInmaterial