import React from "react";
import styled from "styled-components";

const StyleCardProfesores = styled.div`
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: rgb(40, 37, 78, 0.25) 0px 6px 12px -2px,
    rgba(40, 37, 78, 0.3) 0px 3px 7px -3px;
  .containerInfoProfe {
    background-color: white;
  }
  .headerProfe {
    height: 120px;
    width: 100%;
    background-color: ${props => props.bg};
    position: relative;
    &::before {
      content: "";
      position: absolute;
      background-color: #17172291;
      z-index: 1;
      inset: 0;
    }
  }
  .imgProfe {
    position: relative;
    z-index: 2;
    width: 150px;
    aspect-ratio: 1/1;
    overflow: hidden;
    margin: -70px auto 0;
    border-radius: 100%;
    padding: 5px;
    background-color: white;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100%;
    }
  }
  h5 {
    text-align: center;
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 1.8rem;
    color: #171722;
  }
  .descripcionProfe {
    padding: 1.5rem;
  }
  p {
    font-size: 0.8rem;
    text-transform: capitalize;
    font-weight: 900;
    color: #6e6e6e;
    text-align: center;
  }
`;

const CardProfesores = ({name, text, srcImg, bg}) => {
  return (
    <StyleCardProfesores bg={bg}>
      <div className="headerProfe" />
      <div className="containerInfoProfe">
        <div className="imgProfe">
          <img src={srcImg} alt="..." />
        </div>
        <div className="descripcionProfe">
          <h5>{name}</h5>
          <p>{text}</p>
        </div>
      </div>
    </StyleCardProfesores>
  );
};

export default CardProfesores;
