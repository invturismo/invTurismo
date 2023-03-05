import React, {useRef} from "react";
import {ParallaxLayer} from "@react-spring/parallax";
import styled from "styled-components";
import CardDesarrolladores from "./CardDesarrolladores";
import {StyleMainConocenos} from "./StyleMainConocenos";
import CardProfesores from "./CardProfesores";
import useResponsive from "../../../hooks/useResponsive";
import useTittle from "../../../hooks/useTittle";

const StyledHeader = styled(ParallaxLayer)`
  background-image: url("/img/nosotros/FondoHeader.jpg");
  background-size: cover !important;
  background-position: center;
  position: relative;
  display: grid;
  place-items: center center;
  &::before {
    content: "";
    position: absolute;
    background-color: #171722dc;
    z-index: 1;
    inset: 0;
  }
  & > * {
    position: relative;
    z-index: 2;
  }
  h1 {
    font-family: ${props => props.theme.fonts.tittle};
    font-size: 3.5rem;
    color: rgb(43, 230, 171);
    text-shadow: rgb(83 40 254) 6px 0px 1px;
    transition: color 1.5s, text-shadow 1.5s;
    text-align: center;
    &:hover {
      color: rgb(83, 40, 254);
      text-shadow: rgb(43 230 171) 6px 0px 1px;
    }
  }
  p {
    color: white;
    text-align: center;
    font-weight: 700;
    padding-top: 10px;
  }
  @media (min-width: 814px) {
    h1 {
      font-size: 5rem;
    }
  }
`;

const Template = ({values}) => {
  return (
    <StyleMainConocenos pages={values[0]} style={{backgroundColor: "#171722"}}>
      <StyledHeader offset={0} factor={0.8} speed={1.5}>
        <div>
          <h1>INVTURISMO</h1>
          <p>Software de inventarios de atractivos turísticos</p>
        </div>
        <img src="/img/nosotros/UccLogo.png" alt="..." className="imgUcc" />
      </StyledHeader>
      <ParallaxLayer offset={0.8} style={{pointerEvents: "none"}}>
        <h2 className="titleSection">
          <span>¿Quienes somos?</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer
        offset={1.2}
        sticky={{start: "1.2", end: "1.8"}}
        style={{pointerEvents: "none"}}
      >
        <h2 className="titleSection">
          <span>Descripcion</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={1.4}>
        <div className="descripcionSistema">
          <div>
            La principal meta que se planteó en este proyecto, fue la creación
            de un software que permitiera medir la incidencia de la actividad
            turística en la cadena de valor agrícola, por medio del llenado de
            formularios de inventario de atractivos turísticos del país, los
            cuales, al hacer una evaluación objetiva de los mismos, se
            convierten en elementos importantes para la toma de decisiones en el
            sector.
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        offset={2}
        sticky={{start: "2", end: "3.6"}}
        style={{pointerEvents: "none"}}
      >
        <h2 className="titleSection">
          <span>Desarrolladores</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={values[1]}>
        <div className="conPad">
          <CardDesarrolladores
            order="last"
            imgSrc="/img/nosotros/David.jpg"
            bg="rgb(43,230,171)"
            name="David Alejandro Paez Gonzalez"
            text="Soy desarrollador web con conocimientos en js, PHP, java, html, css y c#. Siempre estoy dispuesto a aprender lo que haga falta para poder desempeñarme mejor, tambien soy una persona responsable y muy disciplinada."
          />
          <CardDesarrolladores
            order="first"
            imgSrc="/img/nosotros/Nayifer.jpg"
            bg="rgb(83 40 254)"
            name="Nayifer Natalia Caballero Parra"
            text="Estudiante de Ingeniería de Sistemas de la Universidad Cooperativa de Colombia, con conocimientos básicos de programación y bases de datos relacionales."
          />
        </div>
      </ParallaxLayer>
      <ParallaxLayer offset={0.9} factor={5} className="containerFondoImg">
        <div>
          <img src="/img/nosotros/prueba1.svg" alt="..." className="imgRight" />
          <img src="/img/nosotros/prueba2.svg" alt="..." className="imgLeft" />
          <img src="/img/nosotros/prueba3.svg" alt="..." className="imgRight" />
          <img src="/img/nosotros/prueba4.svg" alt="..." className="imgLeft" />
          <img src="/img/nosotros/prueba5.svg" alt="..." className="imgRight" />
          <img src="/img/nosotros/prueba7.svg" alt="..." className="imgLeft" />
          <img src="/img/nosotros/prueba6.svg" alt="..." className="imgRight" />
          <img src="/img/nosotros/prueba8.svg" alt="..." className="imgLeft" />
          <img src="/img/nosotros/prueba9.svg" alt="..." className="imgRight" />
          <img src="/img/nosotros/prueba10.svg" alt="..." className="imgLeft" />
          <img
            src="/img/nosotros/prueba11.svg"
            alt="..."
            className="imgRight"
          />
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        offset={values[2]}
        style={{pointerEvents: "none"}}
        sticky={{start: values[2], end: values[3]}}
      >
        <h2 className="titleSection">
          <span>Investigadores</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={values[4]}>
        <div className="sectionProfe">
          <CardProfesores
            name="Jaime Alberto Paez"
            srcImg="https://www.zonahistorica.jptecnologia.com/img/bit-jaime.png"
            text="PROFESOR TC AUXILIAR MAGISTER"
            bg="rgb(83 40 254)"
          />
          <CardProfesores
            name="Fredys Alberto Simanca"
            srcImg="https://www.zonahistorica.jptecnologia.com/img/bit-fredys.png"
            bg="rgb(43,230,171)"
            text="PROFESOR TC ASOCIADO DOCTOR"
          />
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        offset={values[5]}
        style={{pointerEvents: "none"}}
        sticky={{start: values[5], end: values[6]}}
      >
        <h2 className="titleSection">
          <span>En colaboración con</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={values[7]}>
        <div className="sectionColaboracion">
          <div>
            <img src="/img/nosotros/UccLogo2.png" alt="..." />
          </div>
          <div>
            <img src="/img/nosotros/UnicolLogo.png" alt="..." />
          </div>
        </div>
      </ParallaxLayer>
    </StyleMainConocenos>
  );
};

const Conocenos = () => {
  useTittle("Conocenos");
  const desktop = useResponsive(814);
  if (desktop)
    return <Template values={[5.8, 2.4, 3.8, 4.6, 4.1, 4.8, 5.8, 5.1]} />;
  else return <Template values={[6.4, 2.2, 4, 5.1, 4.2, 5.3, 6.8, 5.5]} />;
};

export default Conocenos;
