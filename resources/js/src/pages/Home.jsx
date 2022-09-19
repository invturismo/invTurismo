import React from 'react';
import { Route,Routes } from "react-router-dom";
import LeadingLayout from '../components/layout/MainLayout/LeadingLayout';
import MainBuscar from '../components/views/Buscar/MainBuscar';
import MainHome from '../components/views/Home/MainHome';
import useTittle from '../hooks/useTittle';
import ClasificacionRecursosAtractivos from './ClasificacionRecursosAtractivos';
import Error404 from './Error404';
import FestividadesEventos from './FestividadesEventos';
import GruposEspecialInteres from './GruposEspecialInteres';
import ListadoPreliminar from './ListadoPreliminar';
import PatrimonioInmaterial from './PatrimonioInmaterial';
import PatrimonioMaterial from './PatrimonioMaterial';
import SitiosNaturales from './SitiosNaturales';
import Usuarios from './Usuarios';

const Home = () => {
  useTittle('Inicio');

  return (
    <Routes>
      <Route path="/" element={<LeadingLayout />}>
        <Route index element={<MainHome />} />
        <Route path="listado-preliminar/*" element={<ListadoPreliminar />} />
        <Route
          path="clasificacion-recursos-atractivos/*"
          element={<ClasificacionRecursosAtractivos />}
        />
        <Route path="patrimonio-material/*" element={<PatrimonioMaterial />} />
        <Route
          path="patrimonio-inmaterial/*"
          element={<PatrimonioInmaterial />}
        />
        <Route
          path="festividades-eventos/*"
          element={<FestividadesEventos />}
        />
        <Route
          path="grupos-especial-interes/*"
          element={<GruposEspecialInteres />}
        />
        <Route path="sitios-naturales/*" element={<SitiosNaturales />} />
        <Route path="usuarios/*" element={<Usuarios />} />
        <Route path="buscar/:find" element={<MainBuscar />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}

export default Home;