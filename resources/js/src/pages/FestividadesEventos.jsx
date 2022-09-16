import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import MainFestividadesEventos from '../components/views/FestividadesEventos/MainFestividadesEventos';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const FestividadesEventos = () => {
  useTittle("Festividades y eventos");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to="./sin-completar" replace={true} />}
        />
        <Route
          path="/sin-completar"
          element={<MainFestividadesEventos who={1} />}
        />
        <Route
          path="/completado"
          element={<MainFestividadesEventos who={2} />}
        />
        <Route
          path="/sin-completar/:idFestividadesEventos"
          element={<MainFestividadesEventos who={3} />}
        />
        <Route
          path="/completado/:idFestividadesEventos"
          element={<MainFestividadesEventos who={4} />}
        />
        <Route
          path="/completado/actualizar/:idFestividadesEventos"
          element={<MainFestividadesEventos who={5} />}
        />
        <Route path="/opciones" element={<MainFestividadesEventos who={6} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default FestividadesEventos