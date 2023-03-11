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
        offset={values[1]}
        sticky={{start: values[1], end: values[2]}}
        style={{pointerEvents: "none"}}
      >
        <h2 className="titleSection">
          <span>Auxiliares de investigación</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={values[3]}>
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
        offset={values[4]}
        style={{pointerEvents: "none"}}
        sticky={{start: values[4], end: values[5]}}
      >
        <h2 className="titleSection">
          <span>Grupo Neotic</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={values[6]}>
        <div className="sectionProfe">
          <CardProfesores
            name="Jaime Alberto Paez"
            srcImg="https://www.zonahistorica.jptecnologia.com/img/bit-jaime.png"
            text="INVESTIGADOR PRINCIPAL"
            bg="rgb(83 40 254)"
          />
          <CardProfesores
            name="Fredys Alberto Simanca"
            srcImg="https://www.zonahistorica.jptecnologia.com/img/bit-fredys.png"
            bg="rgb(43,230,171)"
            text="COINVESTIGADOR"
          />
          <CardProfesores
            name="Jairo Augusto Cortes"
            srcImg="https://zonahistorica.jptecnologia.com/img/bit-jairo.png"
            bg="rgb(54, 35, 97)"
            text="COINVESTIGADOR"
          />
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        offset={values[7]}
        style={{pointerEvents: "none"}}
        sticky={{start: values[7], end: values[8]}}
      >
        <h2 className="titleSection">
          <span>Grupo CYGA</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={values[9]}>
        <div className="sectionProfe">
          <CardProfesores
            name="Iván Fernando Amaya"
            srcImg="https://media.licdn.com/dms/image/C4D03AQGnCHf8XPSR_Q/profile-displayphoto-shrink_800_800/0/1530023374616?e=1683763200&v=beta&t=ReWruv7LdhQP9JHA5WpIZU_Ck7rVD5TJ0iboLWplGGU"
            text="Docente Investigador en educación Superior"
            bg="rgb(83 40 254)"
          />
          <CardProfesores
            name="Francisco Javier Lagos"
            srcImg="https://scontent.fbog2-4.fna.fbcdn.net/v/t1.6435-9/67847862_2428814360728328_3926914544630235136_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=174925&_nc_eui2=AeHt5Ht28sxc3x3m0GN-YpMD7wIRMDo65t7vAhEwOjrm3t0qBxn9ALikM9zmgZxEQJkpKbG6vS2TrqPCSm3k1625&_nc_ohc=4XkuNwuHzVAAX8IhhS6&_nc_ht=scontent.fbog2-4.fna&oh=00_AfDy-yy8jAJbx_xElhEiONLDNrZKJNzu8D5O78gndQCUEQ&oe=64343B3F"
            bg="rgb(43,230,171)"
            text="Docente de construcción"
          />
          <CardProfesores
            name="Jairo Jamith Palacios"
            srcImg="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            bg="rgb(54, 35, 97)"
          />
          <CardProfesores
            name="Helber Ferney Guzmán"
            srcImg="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            bg="rgb(83 40 254)"
            text="Profesor de Turismo"
          />
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        offset={values[10]}
        style={{pointerEvents: "none"}}
        sticky={{start: values[10], end: values[11]}}
      >
        <h2 className="titleSection">
          <span>En colaboración con</span>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={values[12]}>
        <div className="sectionColaboracion">
          <div>
            <img src="/img/nosotros/UccLogo2.png" alt="..." />
          </div>
          <div>
            <img src="/img/nosotros/UnicolLogo.png" alt="..." />
          </div>
          <div>
            <img src="/img/nosotros/neotic.png" alt="..." />
          </div>
        </div>
      </ParallaxLayer>
    </StyleMainConocenos>
  );
};

const Conocenos = () => {
  useTittle("Conocenos");
  const desktop = useResponsive(1285);
  const tablet = useResponsive(860,1284);
  if (desktop)
    return <Template values={[7,2, 3.4, 2.4, 3.6, 4, 3.9, 4.6, 5.7, 4.9 ,6, 8, 6.3]} />;
  else if(tablet) return <Template values={[7.8,2, 3.4, 2.4, 3.6, 4, 3.9, 5.1, 6.2, 5.4 ,6.5, 7.8, 6.8]} />;
  else return <Template values={[10,2, 4, 2.4, 4.2, 6, 4.5, 6.2, 7.9, 6.5 ,8.6, 10, 8.9]} />;
};

export default Conocenos;
