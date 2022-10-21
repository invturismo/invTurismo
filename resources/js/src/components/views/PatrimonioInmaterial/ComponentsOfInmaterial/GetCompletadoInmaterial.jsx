import React from "react";
import GeneralLoader from "../../../common/GeneralLoader";
import {
  COMPLETADO,
  EXPORTS,
  INMATERIAL,
  SINCOMPLETAR,
} from "../../../router/paths";
import GeneralGet from "../../ComponentsOfViews/GeneralGet";
import useDataGeneral from "../../ComponentsOfViews/hooks/useDataGeneral";
import RowGeneralTable from "../../ComponentsOfViews/RowGeneralTable";

const GetCompletadoInmaterial = () => {
  const {response, data} = useDataGeneral(
    "patrimonios-inmateriales/getdatacom"
  );

  if (!response) return <GeneralLoader />;

  return (
    <>
      <GeneralGet
        h2Text="Patrimonio inmaterial"
        toFirst={`${INMATERIAL}${SINCOMPLETAR}`}
        toLast={`${INMATERIAL}${COMPLETADO}`}
        linkOptions={`${INMATERIAL}${EXPORTS}`}
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
};

export default GetCompletadoInmaterial;
