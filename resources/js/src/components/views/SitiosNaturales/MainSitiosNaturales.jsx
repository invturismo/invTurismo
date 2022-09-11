import React from 'react';
import GeneralGet from '../ComponentsOfViews/GeneralGet';

const GetSinCompletarSitiosNaturales = () => {
  return (
    <>
      <GeneralGet
        h2Text="Sitios naturales"
        toFirst="/sitios-naturales/sin-completar"
        toLast="/sitios-naturales/completado"
        linkOptions="/sitios-naturales/opciones"
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para completar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const GetCompletadoSitiosNaturales = () => {
  return (
    <>
      <GeneralGet
        h2Text="Sitios naturales"
        toFirst="/sitios-naturales/sin-completar"
        toLast="/sitios-naturales/completado"
        linkOptions={"/sitios-naturales/opciones"}
        others={{}}
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para visualizar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const MainSitiosNaturales = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarSitiosNaturales />}
      {who === 2 && <GetCompletadoSitiosNaturales />}
    </div>
  );
}

export default MainSitiosNaturales