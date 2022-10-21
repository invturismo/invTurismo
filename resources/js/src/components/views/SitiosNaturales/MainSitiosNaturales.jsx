import React from "react";
import GetCompletadoSitios from "./ComponentsOfSitios/GetCompletadoSitios";
import GetRecordConSitios from "./ComponentsOfSitios/GetRecordConSitios";
import GetRecordSinSitios from "./ComponentsOfSitios/GetRecordSinSitios";
import GetSinCompletarSitios from "./ComponentsOfSitios/GetSinCompletarSitios";
import OptionsSitios from "./ComponentsOfSitios/OptionsSitios";
import UpdateSitiosNaturales from "./ComponentsOfSitios/UpdateSitiosNaturales";

const MainSitiosNaturales = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetSinCompletarSitios />}
      {who === 2 && <GetCompletadoSitios />}
      {who === 3 && <GetRecordSinSitios />}
      {who === 4 && <GetRecordConSitios />}
      {who === 5 && <UpdateSitiosNaturales />}
      {who === 6 && <OptionsSitios />}
    </div>
  );
};

export default MainSitiosNaturales;
