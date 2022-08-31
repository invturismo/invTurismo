import React from "react";
import ButtonPage from "../../../common/ButtonPage";
import ActionBack from "../ActionBack";
import GetActividadesServicios from "./ComponentsOfGetRecord/GetActividadesServicios";
import GetAdmin from "./ComponentsOfGetRecord/GetAdmin";
import GetCaracteristicas from "./ComponentsOfGetRecord/GetCaracteristicas";
import GetGeneralidades from "./ComponentsOfGetRecord/GetGeneralidades";
import GetImages from "./ComponentsOfGetRecord/GetImages";
import GetOtros from "./ComponentsOfGetRecord/GetOtros";
import GetPuntajes from "./ComponentsOfGetRecord/GetPuntajes";
import GetRelevantes from "./ComponentsOfGetRecord/GetRelevantes";
import TableInformation from "./ComponentsOfGetRecord/TableInformation";
import { StyleGeneralGetRecord } from "./StyleGeneralGetRecord";

const GeneralGetRecord = ({ data, originalData, back, handleUpdate }) => {
  return (
    <StyleGeneralGetRecord>
      <ActionBack to={back} />
      <div className="GeneralGetRecord">
        <h2>{data.GENERALIDADES.NOMBRE}</h2>
        <div className="GetContainerTittle">
          <h3>Generalidades</h3>
          <GetGeneralidades
            data={data.GENERALIDADES}
            originalData={originalData}
          />
          <GetAdmin data={data.GENERALIDADES["ADMIN/PROPIETARIOS"]} />
        </div>
        <div className="GetContainerTittle">
          <h3>Caracteristicas</h3>
          <GetCaracteristicas
            data={data.CARACTERISTICAS}
            dataCodigo={data.CARACTERISTICAS.CODIGOS}
            originalData={originalData}
          />
          <GetImages data={data.CARACTERISTICAS} />
        </div>
        <div className="GetContainerTittle">
          <h3>Puntajes de valoracion</h3>
          <GetPuntajes
            data={data.PUNTAJES_VALORACION}
            who="PATRIMONIO_MATERIAL"
          />
        </div>
        <div className="GetContainerTittle">
          <h3>Caracteristicas relevantes</h3>
          <GetRelevantes data={data.CARACTERISTICAS_RELEVANTES} />
        </div>
        <div className="GetContainerTittle">
          <h3>Actividades y servicios</h3>
          <GetActividadesServicios data={data.ACTIVIDADES_SERVICIOS} />
        </div>
        <div className="GetContainerTittle">
          <h3>Promocion del atractivo</h3>
          <TableInformation data={data.PROMOCION} parent="PROMOCION" />
        </div>
        <div className="GetContainerTittle">
          <h3>
            Servicios para personas en condición de discapacidad o condiciones
            especiales
          </h3>
          <TableInformation
            data={data.SERVICIOS_ESPECIALES}
            parent="SERVICIOS_ESPECIALES"
          />
        </div>
        <div className="GetContainerTittle">
          <h3>Otros</h3>
          <GetOtros data={data.OTROS} />
        </div>
        <div className="ContainerButtons">
          <span onClick={handleUpdate}>
            <ButtonPage colorButton="green">Actualizar</ButtonPage>
          </span>
          <span>
            <ButtonPage colorButton="red">Eliminar</ButtonPage>
          </span>
        </div>
      </div>
    </StyleGeneralGetRecord>
  );
};

export default GeneralGetRecord;