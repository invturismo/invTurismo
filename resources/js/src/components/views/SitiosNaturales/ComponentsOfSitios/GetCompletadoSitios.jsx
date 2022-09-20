import React from 'react'
import GeneralLoader from "../../../common/GeneralLoader";
import { COMPLETADO, EXPORTS, SINCOMPLETAR, SITIOS } from '../../../router/paths';
import GeneralGet from "../../ComponentsOfViews/GeneralGet";
import useDataGeneral from "../../ComponentsOfViews/hooks/useDataGeneral";
import RowGeneralTable from "../../ComponentsOfViews/RowGeneralTable";

const GetCompletadoSitios = () => {
  const { response, data } = useDataGeneral("sitios-naturales/getdatacom");

  if (!response) return <GeneralLoader />;

  return (
    <>
      <GeneralGet
        h2Text="Sitios naturales"
        toFirst={`${SITIOS}${SINCOMPLETAR}`}
        toLast={`${SITIOS}${COMPLETADO}`}
        linkOptions={`${SITIOS}${EXPORTS}`}
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

export default GetCompletadoSitios