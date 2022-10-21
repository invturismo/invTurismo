import React from "react";
import GetCompletadoFestividades from "./ComponentsOfFestividades/GetCompletadoFestividades";
import GetRecordConFestividades from "./ComponentsOfFestividades/GetRecordConFestividades";
import GetRecordSinFestividades from "./ComponentsOfFestividades/GetRecordSinFestividades";
import GetSinCompletarFestividades from "./ComponentsOfFestividades/GetSinCompletarFestividades";
import OptionsFestividades from "./ComponentsOfFestividades/OptionsFestividades";
import UpdateFestividadesEventos from "./ComponentsOfFestividades/UpdateFestividadesEventos";

const MainFestividadesEventos = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarFestividades />}
      {who === 2 && <GetCompletadoFestividades />}
      {who === 3 && <GetRecordSinFestividades />}
      {who === 4 && <GetRecordConFestividades />}
      {who === 5 && <UpdateFestividadesEventos />}
      {who === 6 && <OptionsFestividades />}
    </div>
  );
};

export default MainFestividadesEventos;
