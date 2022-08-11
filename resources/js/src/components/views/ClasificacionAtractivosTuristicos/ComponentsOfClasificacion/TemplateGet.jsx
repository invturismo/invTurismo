import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Filter from "../../ComponentsOfViews/Filter/Filter";
import LabelFilter from "../../ComponentsOfViews/Filter/LabelFilter";
import GeneralHeader from "../../ComponentsOfViews/GeneralHeader";
import PaginationSection from "../../ComponentsOfViews/Pagination/PaginationSection";
import TableClasificacionAtractivosTuristicos from "./TableClasificacionAtractivosTuristicos";

const TemplateGet = ({ children, who, others }) => {
  const stateFilter = useSelector((state) => state.filterSlice.stateFilter);

  return (
    <div className="TemplateGet">
      <h2>Clasificacion de recursos y atractivos</h2>
      <div className="ContainerMainTemplateGet">
        <div className="ContainerOptionsTemplateGet">
          <NavLink
            to="/clasificacion-recursos-atractivos/sin-clasificar"
            className={({ isActive }) =>
              isActive ? "activeOptionTemplateGet" : undefined
            }
          >
            Sin clasificar
          </NavLink>
          <NavLink
            to="/clasificacion-recursos-atractivos/clasificado"
            className={({ isActive }) =>
              isActive ? "activeOptionTemplateGet" : undefined
            }
          >
            Clasificado
          </NavLink>
        </div>
        <GeneralHeader linkOptions="/clasificacion-recursos-atractivos/opciones" />
        {stateFilter && <Filter />}
        <LabelFilter />
        <TableClasificacionAtractivosTuristicos who={who}>
          {children}
        </TableClasificacionAtractivosTuristicos>
        <PaginationSection others={others} />
      </div>
    </div>
  );
};

export default TemplateGet;
