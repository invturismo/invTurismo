import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ACTUALIZAR, COMPLETADO, EXPORTS, SINCOMPLETAR } from '../components/router/paths';
import MainGruposEspecialInteres from '../components/views/GruposEspecialInteres/MainGruposEspecialInteres';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const GruposEspecialInteres = () => {
  useTittle("Grupos de especial interés");
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={<Navigate to={`.${SINCOMPLETAR}`} replace={true} />}
        />
        <Route
          path={`${SINCOMPLETAR}`}
          element={<MainGruposEspecialInteres who={1} />}
        />
        <Route
          path={`${COMPLETADO}`}
          element={<MainGruposEspecialInteres who={2} />}
        />
        <Route
          path={`${SINCOMPLETAR}/:idGruposEspeciales`}
          element={<MainGruposEspecialInteres who={3} />}
        />
        <Route
          path={`${COMPLETADO}/:idGruposEspeciales`}
          element={<MainGruposEspecialInteres who={4} />}
        />
        <Route
          path={`${COMPLETADO}${ACTUALIZAR}/:idGruposEspeciales`}
          element={<MainGruposEspecialInteres who={5} />}
        />
        <Route
          path={`${EXPORTS}`}
          element={<MainGruposEspecialInteres who={6} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default GruposEspecialInteres;