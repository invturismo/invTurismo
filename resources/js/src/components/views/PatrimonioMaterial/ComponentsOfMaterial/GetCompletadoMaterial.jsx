import React from "react";
import GeneralLoader from "../../../common/GeneralLoader";
import {
  COMPLETADO,
  EXPORTS,
  MATERIAL,
  SINCOMPLETAR,
} from "../../../router/paths";
import GeneralGet from "../../ComponentsOfViews/GeneralGet";
import useDataGeneral from "../../ComponentsOfViews/hooks/useDataGeneral";
import RowGeneralTable from "../../ComponentsOfViews/RowGeneralTable";

const GetCompletadoMaterial = () => {
  const {response, data} = useDataGeneral("patrimonios-materiales/getdatacom");

  if (!response) return <GeneralLoader />;

  return (
    <>
      <GeneralGet
        h2Text="Patrimonio material"
        toFirst={`${MATERIAL}${SINCOMPLETAR}`}
        toLast={`${MATERIAL}${COMPLETADO}`}
        linkOptions={`${MATERIAL}${EXPORTS}`}
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

export default GetCompletadoMaterial;
