import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  max-width: 400px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: rgb(40, 37, 78, 0.25) 0px 6px 12px -2px,
    rgba(40, 37, 78, 0.3) 0px 3px 7px -3px;
  .containerFoto {
    background-color: ${props => props.bg};
    padding: 2rem 0.5rem;
  }
  .contianerText {
    background-color: white;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .containerImage {
    overflow: hidden;
    border-radius: 100%;
    height: max-content;
    aspect-ratio: 1/1;
    width: 40%;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  h3 {
    color: rgb(23, 23, 34);
    font-weight: 600;
    font-size: 1.7rem;
    font-family: ${props => props.theme.fonts.secondary};
    text-align: center;
  }
  .descripcion {
    font-size: 1rem;
    font-weight: 500;
    padding: 2rem;
  }
  @media (min-width: 814px) {
    flex-direction: row;
    max-width: 891px;
    .containerFoto {
      order: ${props => (props.order == "first" ? "" : "2")};
    }
    .containerImage {
      width: 100%;
      border: 15px solid rgb(23, 23, 34);
    }
    h3 {
      font-size: 2rem;
    }
    .descripcion {
      font-size: 1.3rem;
      padding: 1rem;
    }
  }
`;

const CardDesarrolladores = ({order, imgSrc, bg, name, text}) => {
  return (
    <StyledCard order={order} bg={bg}>
      <div className="containerFoto">
        <div className="containerImage">
          <img src={imgSrc} alt="..." />
        </div>
      </div>
      <div className="contianerText">
        <h3>{name}</h3>
        <div className="descripcion">{text}</div>
      </div>
    </StyledCard>
  );
};

export default CardDesarrolladores;
