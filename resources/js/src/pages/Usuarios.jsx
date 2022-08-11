import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainUsuarios from '../components/views/Usuarios/MainUsuarios';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const Usuarios = () => {
  useTittle("Usuarios");
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainUsuarios who={1} />} />
        <Route path="registrar" element={<MainUsuarios who={2} />} />
        <Route path=":idUsuario" element={<MainUsuarios who={3} />} />
        <Route
          path="actualizar/:idUsuario"
          element={<MainUsuarios who={4} />}
        />
        <Route
          path="cambiar-clave/:idUsuario"
          element={<MainUsuarios who={5} />}
        />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default Usuarios;