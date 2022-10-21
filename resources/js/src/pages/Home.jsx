import React from "react";
import {Route, Routes} from "react-router-dom";
import LeadingLayout from "../components/layout/MainLayout/LeadingLayout";
import {
  BUSCAR,
  CLASIFICACION,
  CUADRORESUMEN,
  FESTIVIDADES,
  GRUPOS,
  INMATERIAL,
  LISTADO,
  MATERIAL,
  SITIOS,
  USUARIOS,
} from "../components/router/paths";
import MainBuscar from "../components/views/Buscar/MainBuscar";
import MainHome from "../components/views/Home/MainHome";
import useTittle from "../hooks/useTittle";
import ClasificacionRecursosAtractivos from "./ClasificacionRecursosAtractivos";
import CuadroResumen from "./CuadroResumen";
import Error404 from "./Error404";
import FestividadesEventos from "./FestividadesEventos";
import GruposEspecialInteres from "./GruposEspecialInteres";
import ListadoPreliminar from "./ListadoPreliminar";
import PatrimonioInmaterial from "./PatrimonioInmaterial";
import PatrimonioMaterial from "./PatrimonioMaterial";
import SitiosNaturales from "./SitiosNaturales";
import Usuarios from "./Usuarios";

const Home = () => {
  useTittle("Inicio");

  return (
    <Routes>
      <Route path="/" element={<LeadingLayout />}>
        <Route index element={<MainHome />} />
        <Route path={`${LISTADO}/*`} element={<ListadoPreliminar />} />
        <Route
          path={`${CLASIFICACION}/*`}
          element={<ClasificacionRecursosAtractivos />}
        />
        <Route path={`${MATERIAL}/*`} element={<PatrimonioMaterial />} />
        <Route path={`${INMATERIAL}/*`} element={<PatrimonioInmaterial />} />
        <Route path={`${FESTIVIDADES}/*`} element={<FestividadesEventos />} />
        <Route path={`${GRUPOS}/*`} element={<GruposEspecialInteres />} />
        <Route path={`${SITIOS}/*`} element={<SitiosNaturales />} />
        <Route path={`${USUARIOS}/*`} element={<Usuarios />} />
        <Route path={`${BUSCAR}/:find`} element={<MainBuscar />} />
        <Route path={`${CUADRORESUMEN}/*`} element={<CuadroResumen />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default Home;
