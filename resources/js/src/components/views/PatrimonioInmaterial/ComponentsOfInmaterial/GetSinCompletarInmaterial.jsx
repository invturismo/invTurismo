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

const GetSinCompletarInmaterial = () => {
  const {response, data} = useDataGeneral(
    "patrimonios-inmateriales/getdatasincom"
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
};

export default GetSinCompletarInmaterial;
