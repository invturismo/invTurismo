import React from 'react';
import GeneralLoader from '../../../common/GeneralLoader';
import GeneralGet from '../../ComponentsOfViews/GeneralGet';
import RowGeneralTable from '../../ComponentsOfViews/RowGeneralTable';
import useDataMaterial from '../hooks/useDataMaterial';

const GetSinCompletarMaterial = () => {
  const { response, data } = useDataMaterial("getdatasincom");

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
            return (
              <RowGeneralTable
                key={"RowSinCompletar" + key}
                {...val}
              />
            );
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

export default GetSinCompletarMaterial