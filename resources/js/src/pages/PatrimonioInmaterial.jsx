import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPatrimonioInmaterial from '../components/views/PatrimonioInmaterial/MainPatrimonioInmaterial';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const PatrimonioInmaterial = () => {
  useTittle("Patrimonio inmaterial");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to="./sin-completar" replace={true} />}
        />
        <Route
          path="/sin-completar"
          element={<MainPatrimonioInmaterial who={1} />}
        />
        <Route
          path="/completado"
          element={<MainPatrimonioInmaterial who={2} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default PatrimonioInmaterial