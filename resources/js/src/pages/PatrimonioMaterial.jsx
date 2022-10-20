import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {
  ACTUALIZAR,
  COMPLETADO,
  EXPORTS,
  SINCOMPLETAR,
} from "../components/router/paths";
import MainPatrimonioMaterial from "../components/views/PatrimonioMaterial/MainPatrimonioMaterial";
import useTittle from "../hooks/useTittle";
import Error404 from "./Error404";

const PatrimonioMaterial = () => {
  useTittle("Patrimonio material");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to={`.${SINCOMPLETAR}`} replace={true} />}
        />
        <Route
          path={`${SINCOMPLETAR}`}
          element={<MainPatrimonioMaterial who={1} />}
        />
        <Route
          path={`${COMPLETADO}`}
          element={<MainPatrimonioMaterial who={2} />}
        />
        <Route
          path={`${SINCOMPLETAR}/:idPatrimonioMaterial`}
          element={<MainPatrimonioMaterial who={3} />}
        />
        <Route
          path={`${COMPLETADO}/:idPatrimonioMaterial`}
          element={<MainPatrimonioMaterial who={4} />}
        />
        <Route
          path={`${COMPLETADO}${ACTUALIZAR}/:idPatrimonioMaterial`}
          element={<MainPatrimonioMaterial who={5} />}
        />
        <Route
          path={`${EXPORTS}`}
          element={<MainPatrimonioMaterial who={6} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default PatrimonioMaterial;
