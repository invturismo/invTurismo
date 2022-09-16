import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainSitiosNaturales from '../components/views/SitiosNaturales/MainSitiosNaturales';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const SitiosNaturales = () => {
  useTittle("Sitios naturales");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to="./sin-completar" replace={true} />}
        />
        <Route
          path="/sin-completar"
          element={<MainSitiosNaturales who={1} />}
        />
        <Route path="/completado" element={<MainSitiosNaturales who={2} />} />
        <Route
          path="/sin-completar/:idSitiosNaturales"
          element={<MainSitiosNaturales who={3} />}
        />
        <Route
          path="/completado/:idSitiosNaturales"
          element={<MainSitiosNaturales who={4} />}
        />
        <Route
          path="/completado/actualizar/:idSitiosNaturales"
          element={<MainSitiosNaturales who={5} />}
        />
        <Route path="/opciones" element={<MainSitiosNaturales who={6} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default SitiosNaturales