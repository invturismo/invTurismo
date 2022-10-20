import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {
  ACTUALIZAR,
  COMPLETADO,
  EXPORTS,
  SINCOMPLETAR,
} from "../components/router/paths";
import MainPatrimonioInmaterial from "../components/views/PatrimonioInmaterial/MainPatrimonioInmaterial";
import useTittle from "../hooks/useTittle";
import Error404 from "./Error404";

const PatrimonioInmaterial = () => {
  useTittle("Patrimonio inmaterial");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to={`.${SINCOMPLETAR}`} replace={true} />}
        />
        <Route
          path={`${SINCOMPLETAR}`}
          element={<MainPatrimonioInmaterial who={1} />}
        />
        <Route
          path={`${COMPLETADO}`}
          element={<MainPatrimonioInmaterial who={2} />}
        />
        <Route
          path={`${SINCOMPLETAR}/:idPatrimonioInmaterial`}
          element={<MainPatrimonioInmaterial who={3} />}
        />
        <Route
          path={`${COMPLETADO}/:idPatrimonioInmaterial`}
          element={<MainPatrimonioInmaterial who={4} />}
        />
        <Route
          path={`${COMPLETADO}${ACTUALIZAR}/:idPatrimonioInmaterial`}
          element={<MainPatrimonioInmaterial who={5} />}
        />
        <Route
          path={`${EXPORTS}`}
          element={<MainPatrimonioInmaterial who={6} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default PatrimonioInmaterial;
