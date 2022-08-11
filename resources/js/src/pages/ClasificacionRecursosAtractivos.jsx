import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainClasificacionAtractivosTuristicos from '../components/views/ClasificacionAtractivosTuristicos/MainClasificacionAtractivosTuristicos';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const ClasificacionRecursosAtractivos = () => {
  useTittle("Clasificacion de recursos y atractivos");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to="./sin-clasificar" replace={true} />}
        />
        <Route
          path="/sin-clasificar"
          element={<MainClasificacionAtractivosTuristicos who={1} />}
        />
        <Route
          path="/clasificado"
          element={<MainClasificacionAtractivosTuristicos who={2} />}
        />
        <Route
          path="/sin-clasificar/:idRecursoAtractivo"
          element={<MainClasificacionAtractivosTuristicos who={3} />}
        />
        <Route
          path="/clasificado/:idRecursoAtractivo"
          element={<MainClasificacionAtractivosTuristicos who={4} />}
        />
        <Route
          path="/clasificado/actualizar/:idRecursoAtractivo"
          element={<MainClasificacionAtractivosTuristicos who={5} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default ClasificacionRecursosAtractivos