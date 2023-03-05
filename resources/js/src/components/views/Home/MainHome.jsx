import React from "react";
import useTittle from "../../../hooks/useTittle";
import {StyleMainHome} from "./StylesMainHome";
import {useSelector} from "react-redux";
import CardButton from "./ComponentsOfHome/CardButton";
import {CONOCENOS, CREAR, CUADRORESUMEN, LISTADO} from "../../router/paths";

const MainHome = () => {
  useTittle("Inicio");
  const {PRIMER_NOMBRE} = useSelector(
    state => state.dataProfileSlice.dataProfile
  );
  return (
    <StyleMainHome>
      <div className="ContainerWelcome">
        <p className="WelcomeMessage">
          <span>Bienvenido/a </span>
          <span>{PRIMER_NOMBRE}!</span>
        </p>
      </div>
      <div className="CardsContainer">
        <CardButton
          colorBackground="#c7c7ff"
          name1="Nuevo"
          name2="Recurso"
          srcImg="SvgMoreRecurso.svg"
          colorText="rgba(149,149,255,1)"
          linkClick={`${LISTADO}${CREAR}`}
        />
        <CardButton
          colorBackground="#ffd8be"
          name1="Metodologia"
          name2="Inventarios"
          srcImg="SvgDoc.svg"
          colorText="rgba(252,161,71,1)"
          linkClick="/documents/Guía_elaboración_inventario.pdf"
          target="_blank"
        />
        <CardButton
          colorBackground="#a9ecbf"
          name1="Cuadro"
          name2="Resumen"
          srcImg="SvgResumen.svg"
          colorText="rgba(66,193,110,1)"
          linkClick={CUADRORESUMEN}
        />
        <CardButton
          colorBackground="#3739fe"
          name1="Conocenos"
          srcImg="SvgConocenos.svg"
          colorText="#1f0e48"
          linkClick={CONOCENOS}
        />
      </div>
    </StyleMainHome>
  );
};

export default MainHome;
