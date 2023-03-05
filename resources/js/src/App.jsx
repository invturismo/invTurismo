import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CONOCENOS, HOME, LOGIN} from "./components/router/paths";
import {
  PrivateRouteHome,
  PrivateRouteLogin,
} from "./components/router/PrivateRoute";
import Conocenos from "./components/views/Conocenos/Conocenos";
import useTittle from "./hooks/useTittle";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  useTittle("Cargando");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${HOME}*`}
          element={
            <PrivateRouteHome>
              <Home />
            </PrivateRouteHome>
          }
        />
        <Route
          path={LOGIN}
          element={
            <PrivateRouteLogin>
              <Login />
            </PrivateRouteLogin>
          }
        />
        <Route path={CONOCENOS} element={<Conocenos />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
