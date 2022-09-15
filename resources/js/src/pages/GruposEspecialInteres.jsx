import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
          element={<Navigate to="./sin-completar" replace={true} />}
        />
        <Route
          path="/sin-completar"
          element={<MainGruposEspecialInteres who={1} />}
        />
        <Route
          path="/completado"
          element={<MainGruposEspecialInteres who={2} />}
        />
        <Route
          path="/sin-completar/:idGruposEspeciales"
          element={<MainGruposEspecialInteres who={3} />}
        />
        <Route
          path="/completado/:idGruposEspeciales"
          element={<MainGruposEspecialInteres who={4} />}
        />
        <Route
          path="/completado/actualizar/:idGruposEspeciales"
          element={<MainGruposEspecialInteres who={5} />}
        />
        <Route
          path="/opciones"
          element={<MainGruposEspecialInteres who={6} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default GruposEspecialInteres;