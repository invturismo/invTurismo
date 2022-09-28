import React from "react";
import GetInformation1 from "./GetInformation1";

const GetAdmin = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Datos propietario/tenedor</h4>
      <div className="ContainerGet1">
        <GetInformation1 content={data.NOMBRE} name="Nombre" help />
        <GetInformation1
          content={data.DIRECCION_UBICACION}
          name="Direccion/Ubicacion"
        />
        <GetInformation1 content={data.CORREO} name="Correo" />
        <GetInformation1 content={data.TELEFONO1} name="Telefono 1" />
        <GetInformation1 content={data.TELEFONO2} name="Telefono 2" />
      </div>
    </div>
  );
};

export default GetAdmin;
