import React from "react";
import GeneralLoader from "../../../common/GeneralLoader";
import {
  COMPLETADO,
  CUADRORESUMEN,
  EXPORTS,
  FESTIVIDADES,
  GRUPOS,
  INMATERIAL,
  MATERIAL,
  SITIOS,
} from "../../../router/paths";
import Filter from "../../ComponentsOfViews/Filter/Filter";
import LabelFilter from "../../ComponentsOfViews/Filter/LabelFilter";
import GeneralHeader from "../../ComponentsOfViews/GeneralHeader";
import GeneralTable from "../../ComponentsOfViews/GeneralTable";
import useDataGeneral from "../../ComponentsOfViews/hooks/useDataGeneral";
import PaginationSection from "../../ComponentsOfViews/Pagination/PaginationSection";
import RowGeneralTable from "../../ComponentsOfViews/RowGeneralTable";

const whoLink = {
  patrimonios_materiales: MATERIAL + COMPLETADO,
  patrimonios_inmateriales: INMATERIAL + COMPLETADO,
  festividades_eventos: FESTIVIDADES + COMPLETADO,
  grupos_especiales: GRUPOS + COMPLETADO,
  sitios_naturales: SITIOS + COMPLETADO,
};

const GetDataResumen = () => {
  const { response, data } = useDataGeneral("cuadro-resumen");

  if (!response) return <GeneralLoader />;

  return (
    <div className="GeneralGet">
      <h2>Cuadro Resumen</h2>
      <div className="ContainerMainGeneralGet">
        <GeneralHeader linkOptions={`${CUADRORESUMEN}${EXPORTS}`} />
        <Filter />
        <LabelFilter />
        <GeneralTable>
          {data?.data?.length > 0 ? (
            data.data.map((val, key) => {
              return (
                <RowGeneralTable
                  key={"RowCompletado" + key}
                  linkNavigate={`${whoLink[val.TABLA]}/${val.ID}`}
                  {...val}
                />
              );
            })
          ) : (
            <tr className="NoData">
              <td colSpan={6}>No hay datos para visualizar</td>
            </tr>
          )}
        </GeneralTable>
        <PaginationSection others={data} />
      </div>
    </div>
  );
};

export default GetDataResumen;
