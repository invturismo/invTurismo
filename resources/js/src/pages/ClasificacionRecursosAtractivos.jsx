import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {
  ACTUALIZAR,
  CLASIFICADO,
  EXPORTS,
  SINCLASIFICAR,
} from "../components/router/paths";
import MainClasificacionAtractivosTuristicos from "../components/views/ClasificacionAtractivosTuristicos/MainClasificacionAtractivosTuristicos";
import useTittle from "../hooks/useTittle";
import Error404 from "./Error404";

const ClasificacionRecursosAtractivos = () => {
  useTittle("Clasificacion de recursos y atractivos");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to={`.${SINCLASIFICAR}`} replace={true} />}
        />
        <Route
          path={`${SINCLASIFICAR}`}
          element={<MainClasificacionAtractivosTuristicos who={1} />}
        />
        <Route
          path={`${CLASIFICADO}`}
          element={<MainClasificacionAtractivosTuristicos who={2} />}
        />
        <Route
          path={`${SINCLASIFICAR}/:idRecursoAtractivo`}
          element={<MainClasificacionAtractivosTuristicos who={3} />}
        />
        <Route
          path={`${CLASIFICADO}/:idRecursoAtractivo`}
          element={<MainClasificacionAtractivosTuristicos who={4} />}
        />
        <Route
          path={`${CLASIFICADO}${ACTUALIZAR}/:idRecursoAtractivo`}
          element={<MainClasificacionAtractivosTuristicos who={5} />}
        />
        <Route
          path={`${EXPORTS}`}
          element={<MainClasificacionAtractivosTuristicos who={6} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default ClasificacionRecursosAtractivos;
