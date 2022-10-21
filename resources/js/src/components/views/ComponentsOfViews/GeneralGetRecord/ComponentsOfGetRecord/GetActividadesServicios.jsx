import React from "react";
import TableInformation from "./TableInformation";

const Actividades = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Actividades</h4>
      <TableInformation data={data} parent="ACTIVIDADES" />
    </div>
  );
};

const Servicios = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Servicios que se ofrecen en el lugar</h4>
      <TableInformation data={data} parent="SERVICIOS" />
    </div>
  );
};

const GetActividadesServicios = ({data, who}) => {
  return (
    <>
      <Actividades data={data.ACTIVIDADES} />
      {who !== "PATRIMONIOS_INMATERIALES" && (
        <Servicios data={data.SERVICIOS} />
      )}
    </>
  );
};

export default GetActividadesServicios;
