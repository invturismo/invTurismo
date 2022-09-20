import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { ACTUALIZAR, COMPLETADO, EXPORTS, SINCOMPLETAR } from '../components/router/paths';
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
          element={<Navigate to={`.${SINCOMPLETAR}`} replace={true} />}
        />
        <Route
          path={`${SINCOMPLETAR}`}
          element={<MainFestividadesEventos who={1} />}
        />
        <Route
          path={`${COMPLETADO}`}
          element={<MainFestividadesEventos who={2} />}
        />
        <Route
          path={`${SINCOMPLETAR}/:idFestividadesEventos`}
          element={<MainFestividadesEventos who={3} />}
        />
        <Route
          path={`${COMPLETADO}/:idFestividadesEventos`}
          element={<MainFestividadesEventos who={4} />}
        />
        <Route
          path={`${COMPLETADO}${ACTUALIZAR}/:idFestividadesEventos`}
          element={<MainFestividadesEventos who={5} />}
        />
        <Route path={`${EXPORTS}`} element={<MainFestividadesEventos who={6} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default FestividadesEventos