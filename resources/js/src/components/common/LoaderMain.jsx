import React from "react";
import styled from "styled-components";

const ContainerLoaderMain = styled.div`
  height: 100vh;
  display: grid;
  place-items: center center;
  background-color: #f9f9f9;
  img {
    width: 95%;
    height: auto;
    max-width: 500px;
  }
`;

const LoaderMain = () => {
  return (
    <ContainerLoaderMain>
      <img src="/img/loaders/LoaderMainGif.webp" alt="load" />
    </ContainerLoaderMain>
  );
};

export default LoaderMain;
