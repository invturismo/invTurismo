import React from "react";
import GetDataResumen from "./ComponentsOfResumen/GetDataResumen";
import OptionsResumen from "./ComponentsOfResumen/OptionsResumen";

const MainCuadroResumen = ({who}) => {
  return (
    <div className="ContainerMainGeneral">
      {who === 1 && <GetDataResumen />}
      {who === 2 && <OptionsResumen />}
    </div>
  );
};

export default MainCuadroResumen;
