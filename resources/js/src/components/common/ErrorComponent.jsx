import React from "react";
import styled from "styled-components";

const StyleErrorComponent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 15px;
  h2 {
    font-size: 2.2rem;
    font-family: ${props => props.theme.fonts.secondary};
    text-align: center;
  }
  img {
    width: 150px;
    height: 150px;
  }
`;

const ErrorComponent = ({message}) => {
  return (
    <StyleErrorComponent>
      <img src="/img/vectores/ImgError.svg" alt="error" />
      <h2>{message}</h2>
    </StyleErrorComponent>
  );
};

export default ErrorComponent;
