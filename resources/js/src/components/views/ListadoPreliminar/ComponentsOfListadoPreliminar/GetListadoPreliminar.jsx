import React from "react";
import GeneralLoader from "../../../common/GeneralLoader";
import useDataListadoPreliminar from "../hooks/useDataListadoPreliminar";
import TableListadoPreliminar from "./TableListadoPreliminar";
import PaginationSection from "../../ComponentsOfViews/Pagination/PaginationSection";
import RowTableListadoPreliminar from "./RowTableListadoPreliminar";
import Filter from "../../ComponentsOfViews/Filter/Filter";
import LabelFilter from "../../ComponentsOfViews/Filter/LabelFilter";
import { useSelector } from "react-redux";
import GeneralHeader from "../../ComponentsOfViews/GeneralHeader";

const GetListadoPreliminar = () => {
  const { response, data } = useDataListadoPreliminar();
  const stateFilter = useSelector((state) => state.filterSlice.stateFilter);

  if (!response) return <GeneralLoader />;

  return (
    <div className="GetListadoPreliminar">
      <h2>Listado Preliminar</h2>
      <div className="ContainerMainGetListadoPreliminar">
        <GeneralHeader linkOptions="./opciones" who={1}/>
        {stateFilter && <Filter />}
        <LabelFilter />
        <TableListadoPreliminar>
          {data?.data?.length ? (
            data.data.map((val, key) => {
              return (
                <RowTableListadoPreliminar
                  key={"RowListadoPreliminar" + key}
                  {...val}
                />
              );
            })
          ) : (
            <tr className="NoData">
              <td colSpan={6}>No hay datos para visualizar</td>
            </tr>
          )}
        </TableListadoPreliminar>
        <PaginationSection others={data} />
      </div>
    </div>
  );
};

export default GetListadoPreliminar;
