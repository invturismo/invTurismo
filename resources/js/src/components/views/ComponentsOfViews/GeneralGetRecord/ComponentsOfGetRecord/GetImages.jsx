import React from "react";
import {DOMAIN} from "../../../../router/paths";
import GetInformation1 from "./GetInformation1";

const GetImages = ({data}) => {
  return (
    <div className="GetContainerTittle">
      <h4>Imagenes</h4>
      <div className="ContainerGet1">
        <div className="GetInformationImages">
          <h5>Imagen 1</h5>
          <img
            src={DOMAIN + "storage/imagenes_inventario/" + data.IMAGEN1}
            alt="imagen1"
          />
        </div>
        <div className="GetInformationImages">
          <h5>Imagen 2</h5>
          <img
            src={DOMAIN + "storage/imagenes_inventario/" + data.IMAGEN2}
            alt="imagen2"
          />
        </div>
        <GetInformation1 content={data.FUENTE} name="Fuente" />
      </div>
    </div>
  );
};

export default GetImages;
