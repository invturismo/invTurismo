import React from 'react';
import GeneralGet from '../ComponentsOfViews/GeneralGet';

const GetSinCompletarGruposEspecialInteres = () => {
  return (
    <>
      <GeneralGet
        h2Text="Grupos de especial interés"
        toFirst="/grupos-especial-interes/sin-completar"
        toLast="/grupos-especial-interes/completado"
        linkOptions="/grupos-especial-interes/opciones"
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para completar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const GetCompletadoGruposEspecialInteres = () => {
  return (
    <>
      <GeneralGet
        h2Text="Grupos de especial interés"
        toFirst="/grupos-especial-interes/sin-completar"
        toLast="/grupos-especial-interes/completado"
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para visualizar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const MainGruposEspecialInteres = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarGruposEspecialInteres />}
      {who === 2 && <GetCompletadoGruposEspecialInteres />}
    </div>
  );
}

export default MainGruposEspecialInteres