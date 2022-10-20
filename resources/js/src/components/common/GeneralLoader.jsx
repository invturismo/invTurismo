import React from "react";
import styled from "styled-components";

const StyleGeneralLoader = styled.div`
  display: grid;
  height: 100%;
  place-items: center center;
  .loader {
    width: 64px;
    height: 64px;
    position: relative;
    animation: rotate 1.5s ease-in infinite alternate;
  }
  .loader::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    color: #220646;
    background: currentColor;
    width: 64px;
    height: 32px;
    border-radius: 0 0 50px 50px;
  }
  .loader::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 10%;
    background: #000;
    width: 8px;
    height: 64px;
    animation: rotate 1.2s linear infinite alternate-reverse;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const GeneralLoader = () => {
  return (
    <StyleGeneralLoader>
      <span className="loader"></span>
    </StyleGeneralLoader>
  );
};

export default GeneralLoader;
