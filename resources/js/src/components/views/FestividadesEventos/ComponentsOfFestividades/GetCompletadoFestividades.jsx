import React from 'react'
import GeneralLoader from '../../../common/GeneralLoader';
import GeneralGet from '../../ComponentsOfViews/GeneralGet';
import useDataGeneral from '../../ComponentsOfViews/hooks/useDataGeneral';
import RowGeneralTable from '../../ComponentsOfViews/RowGeneralTable';

const GetCompletadoFestividades = () => {
  const { response, data } = useDataGeneral("festividades-eventos/getdatacom");

  if (!response) return <GeneralLoader />;

  return (
    <>
      <GeneralGet
        h2Text="Festividades y eventos"
        toFirst="/festividades-eventos/sin-completar"
        toLast="/festividades-eventos/completado"
        linkOptions="/festividades-eventos/opciones"
        others={data}
      >
        {data?.data?.length > 0 ? (
          data.data.map((val, key) => {
            return <RowGeneralTable key={"RowCompletado" + key} {...val} />;
          })
        ) : (
          <tr className="NoData">
            <td colSpan={6}>No hay datos para visualizar</td>
          </tr>
        )}
      </GeneralGet>
    </>
  );
}

export default GetCompletadoFestividades