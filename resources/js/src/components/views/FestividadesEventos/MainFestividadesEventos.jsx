import React from 'react';
import GeneralGet from '../ComponentsOfViews/GeneralGet';

const GetSinCompletarFestividadesEventos = () => {
  return (
    <>
      <GeneralGet
        h2Text="Festividades y eventos"
        toFirst="/festividades-eventos/sin-completar"
        toLast="/festividades-eventos/completado"
        linkOptions="/festividades-eventos/opciones"
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para completar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const GetCompletadoFestividadesEventos = () => {
  return (
    <>
      <GeneralGet
        h2Text="Festividades y eventos"
        toFirst="/festividades-eventos/sin-completar"
        toLast="/festividades-eventos/completado"
        linkOptions={"/festividades-eventos/opciones"}
        others={{}}
      >
        <tr className="NoData">
          <td colSpan={6}>No hay datos para visualizar</td>
        </tr>
      </GeneralGet>
    </>
  );
};

const MainFestividadesEventos = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarFestividadesEventos />}
      {who === 2 && <GetCompletadoFestividadesEventos />}
    </div>
  );
}

export default MainFestividadesEventos;