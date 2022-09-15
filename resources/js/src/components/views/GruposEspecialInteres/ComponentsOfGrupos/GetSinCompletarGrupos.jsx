import React from 'react'
import GeneralLoader from '../../../common/GeneralLoader';
import GeneralGet from '../../ComponentsOfViews/GeneralGet';
import useDataGeneral from '../../ComponentsOfViews/hooks/useDataGeneral';
import RowGeneralTable from '../../ComponentsOfViews/RowGeneralTable';

const GetSinCompletarGrupos = () => {
  const { response, data } = useDataGeneral("grupos-especiales/getdatasincom");

  if (!response) return <GeneralLoader />;

  return (
    <>
      <GeneralGet
        h2Text="Grupos de especial interés"
        toFirst="/grupos-especial-interes/sin-completar"
        toLast="/grupos-especial-interes/completado"
        linkOptions="/grupos-especial-interes/opciones"
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

export default GetSinCompletarGrupos