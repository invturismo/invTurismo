import React from 'react'
import GeneralLoader from '../../../common/GeneralLoader';
import GeneralGet from '../../ComponentsOfViews/GeneralGet';
import useDataGeneral from '../../ComponentsOfViews/hooks/useDataGeneral';
import RowGeneralTable from '../../ComponentsOfViews/RowGeneralTable';

const GetSinCompletarSitios = () => {
  const { response, data } = useDataGeneral("sitios-naturales/getdatasincom");

  if (!response) return <GeneralLoader />;

  return (
    <>
      <GeneralGet
        h2Text="Sitios naturales"
        toFirst="/sitios-naturales/sin-completar"
        toLast="/sitios-naturales/completado"
        linkOptions="/sitios-naturales/opciones"
        others={data}
      >
        {data?.data?.length > 0 ? (
          data.data.map((val, key) => {
            return <RowGeneralTable key={"RowSinCompletar" + key} {...val} />;
          })
        ) : (
          <tr className="NoData">
            <td colSpan={6}>No hay datos para completar</td>
          </tr>
        )}
      </GeneralGet>
    </>
  );
}

export default GetSinCompletarSitios