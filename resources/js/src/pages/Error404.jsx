import React from 'react';
import styled from 'styled-components';

const StyleError404 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  h2 {
    font-family: ${(props) => props.theme.fonts.secondary};
    font-size: 2.5rem;
  }
  img{
    height: 150px;
    width: 150px;
  }
`;

const Error404 = () => {
  return (
    <StyleError404>
      <img src="/img/Vectores/Img404.svg" alt="404" />
      <h2>La pagina no existe</h2>
    </StyleError404>
  )
}

export default Error404;