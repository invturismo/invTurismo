import React from 'react';
import styled from 'styled-components';

const ContainerLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: grid;
  place-items: center center;
  background-color: #000000ba;
  z-index: 51;
  .loader {
    width: 84px;
    height: 84px;
    position: relative;
    overflow: hidden;
  }
  .loader:before,
  .loader:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #fff;
    transform: translate(-50%, 100%) scale(0);
    animation: push 2s infinite ease-in;
  }
  .loader:after {
    animation-delay: 1s;
  }
  @keyframes push {
    0% {
      transform: translate(-50%, 100%) scale(1);
    }
    15%,
    25% {
      transform: translate(-50%, 50%) scale(1);
    }
    50%,
    75% {
      transform: translate(-50%, -30%) scale(0.5);
    }
    80%,
    100% {
      transform: translate(-50%, -50%) scale(0);
    }
  }
`;

const LoaderForm = () => {
  return (
    <ContainerLoader className="LoaderForm">
      <span className="loader"></span>
    </ContainerLoader>
  );
}

export default LoaderForm