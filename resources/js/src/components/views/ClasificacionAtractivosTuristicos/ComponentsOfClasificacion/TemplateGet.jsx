import React from "react";
import {NavLink} from "react-router-dom";
import {
  CLASIFICACION,
  CLASIFICADO,
  EXPORTS,
  SINCLASIFICAR,
} from "../../../router/paths";
import CountData from "../../ComponentsOfViews/CountData";
import Filter from "../../ComponentsOfViews/Filter/Filter";
import LabelFilter from "../../ComponentsOfViews/Filter/LabelFilter";
import GeneralHeader from "../../ComponentsOfViews/GeneralHeader";
import PaginationSection from "../../ComponentsOfViews/Pagination/PaginationSection";
import TableClasificacionAtractivosTuristicos from "./TableClasificacionAtractivosTuristicos";

const TemplateGet = ({children, who, others}) => {
  return (
    <div className="TemplateGet">
      <h2>Clasificacion de recursos y atractivos</h2>
      <div className="ContainerMainTemplateGet">
        <div className="ContainerOptionsTemplateGet">
          <NavLink
            to={`${CLASIFICACION}${SINCLASIFICAR}`}
            className={({isActive}) =>
              isActive ? "activeOptionTemplateGet" : undefined
            }
          >
            Sin clasificar
          </NavLink>
          <NavLink
            to={`${CLASIFICACION}${CLASIFICADO}`}
            className={({isActive}) =>
              isActive ? "activeOptionTemplateGet" : undefined
            }
          >
            Clasificado
          </NavLink>
        </div>
        <GeneralHeader linkOptions={`${CLASIFICACION}${EXPORTS}`} />
        <Filter />
        <LabelFilter />
        <TableClasificacionAtractivosTuristicos who={who}>
          {children}
        </TableClasificacionAtractivosTuristicos>
        <CountData otherData={others} />
        <PaginationSection others={others} />
      </div>
    </div>
  );
};

export default TemplateGet;
