import React from 'react'
import useTittle from '../../../hooks/useTittle'
import { StyleMainHome } from './StylesMainHome';
import { useSelector } from 'react-redux';

const MainHome = () => {
  useTittle('Inicio');
  const { PRIMER_NOMBRE } = useSelector(
    (state) => state.dataProfileSlice.dataProfile
  );
  return (
    <StyleMainHome>
      <div className="ContainerImageHome">
        <img src="/img/vectores/ImgInicio.png" alt="inicio" />
      </div>
      <p>
        <span className="Color1">Hola</span> {PRIMER_NOMBRE}{" "}
        <span className="Color2">!</span>
      </p>
    </StyleMainHome>
  );
}

export default MainHome