import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {
  ACTUALIZAR,
  COMPLETADO,
  EXPORTS,
  SINCOMPLETAR,
} from "../components/router/paths";
import MainSitiosNaturales from "../components/views/SitiosNaturales/MainSitiosNaturales";
import useTittle from "../hooks/useTittle";
import Error404 from "./Error404";

const SitiosNaturales = () => {
  useTittle("Sitios naturales");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to={`.${SINCOMPLETAR}`} replace={true} />}
        />
        <Route
          path={`${SINCOMPLETAR}`}
          element={<MainSitiosNaturales who={1} />}
        />
        <Route
          path={`${COMPLETADO}`}
          element={<MainSitiosNaturales who={2} />}
        />
        <Route
          path={`${SINCOMPLETAR}/:idSitiosNaturales`}
          element={<MainSitiosNaturales who={3} />}
        />
        <Route
          path={`${COMPLETADO}/:idSitiosNaturales`}
          element={<MainSitiosNaturales who={4} />}
        />
        <Route
          path={`${COMPLETADO}${ACTUALIZAR}/:idSitiosNaturales`}
          element={<MainSitiosNaturales who={5} />}
        />
        <Route path={`${EXPORTS}`} element={<MainSitiosNaturales who={6} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default SitiosNaturales;
