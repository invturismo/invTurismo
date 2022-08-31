import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPatrimonioMaterial from '../components/views/PatrimonioMaterial/MainPatrimonioMaterial';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const PatrimonioMaterial = () => {
  useTittle("Patrimonio material");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to="./sin-completar" replace={true} />}
        />
        <Route
          path="/sin-completar"
          element={<MainPatrimonioMaterial who={1} />}
        />
        <Route
          path="/completado"
          element={<MainPatrimonioMaterial who={2} />}
        />
        <Route
          path="/sin-completar/:idPatrimonioMaterial"
          element={<MainPatrimonioMaterial who={3} />}
        />
        <Route
          path="/completado/:idPatrimonioMaterial"
          element={<MainPatrimonioMaterial who={4} />}
        />
        <Route
          path="/completado/actualizar/:idPatrimonioMaterial"
          element={<MainPatrimonioMaterial who={5} />}
        />
        <Route path="/opciones" element={<MainPatrimonioMaterial who={6} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default PatrimonioMaterial