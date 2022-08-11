import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoaderMain from "../common/LoaderMain";
import { HOME, LOGIN } from "./paths";

const PrivateRouteHome = ({ children }) => {
  const { state, message } = useAuth();

  if (state === 0) return <LoaderMain />;
  if (state === 1) {
    console.log(message);
    return <Navigate to={LOGIN} replace={true} />;
  }

  return children;
};

const PrivateRouteLogin = ({ children }) => {
  const { state } = useAuth();

  if (state === 0) return <LoaderMain />;
  if (state === 2) return <Navigate to={HOME} replace={true} />;

  return children;
};

export { PrivateRouteHome, PrivateRouteLogin };
