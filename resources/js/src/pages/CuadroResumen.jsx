import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { EXPORTS } from '../components/router/paths';
import MainCuadroResumen from '../components/views/CuadroResumen/MainCuadroResumen';
import useTittle from '../hooks/useTittle';
import Error404 from './Error404';

const CuadroResumen = () => {
  useTittle("Cuadro resumen");
  return (
    <Routes>
      <Route path="/">
        <Route index element={<MainCuadroResumen who={1}/>} />
        <Route path={`${EXPORTS}`} element={<MainCuadroResumen who={2} />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default CuadroResumen