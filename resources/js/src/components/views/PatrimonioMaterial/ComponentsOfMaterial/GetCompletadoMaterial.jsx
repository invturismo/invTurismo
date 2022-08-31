import React from 'react'
import GeneralLoader from '../../../common/GeneralLoader';
import GeneralGet from '../../ComponentsOfViews/GeneralGet';
import RowGeneralTable from '../../ComponentsOfViews/RowGeneralTable';
import useDataMaterial from '../hooks/useDataMaterial';

const GetCompletadoMaterial = () => {
  const { response, data } = useDataMaterial("getdatacom");

  if (!response) return <GeneralLoader />;

  return (
    <>
      <GeneralGet
        h2Text="Patrimonio material"
        toFirst="/patrimonio-material/sin-completar"
        toLast="/patrimonio-material/completado"
        linkOptions="/patrimonio-material/opciones"
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

export default GetCompletadoMaterial