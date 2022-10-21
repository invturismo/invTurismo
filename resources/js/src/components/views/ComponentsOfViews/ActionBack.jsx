import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const StyleActionBack = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: flex-start;
  .ButtonBack {
    color: white;
    display: flex;
    gap: 5px;
    padding: 10px 15px;
    align-items: center;
    justify-content: center;
    background-color: #473366;
    border-radius: 7px;
    letter-spacing: 1px;
    transition: all 0.2s linear;
    cursor: pointer;
  }
  path {
    fill: white;
  }
  .ButtonBack > svg {
    font-size: 20px;
    transition: all 0.4s ease-in;
  }
  .ButtonBack:hover > svg {
    font-size: 1.2em;
    transform: translateX(-5px);
  }
  .ButtonBack:hover {
    box-shadow: 9px 9px 33px #d1d1d1, -9px -9px 33px #ffffff;
    transform: translateY(-2px);
  }
`;

const SvgBack = () => {
  return (
    <svg
      height={16}
      width={16}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      <path d="M874.69 495.525c0 11.297-9.168 20.466-20.466 20.466H249.45l188.084 188.084c7.992 7.992 7.992 20.947 0 28.939a20.445 20.445 0 0 1-14.47 5.996 20.408 20.408 0 0 1-14.48-5.996l-223.008-223.01a20.455 20.455 0 0 1 0-28.94l223.019-223.028c7.992-7.992 20.957-7.992 28.95 0 7.991 8.002 7.991 20.957 0 28.95L249.47 475.058h604.753c11.298 0 20.466 9.158 20.466 20.466z" />
    </svg>
  );
};

const ActionBack = ({to, ...props}) => {
  return (
    <StyleActionBack>
      <Link to={to} className="ButtonBack" {...props}>
        <SvgBack />
        <span>Atras</span>
      </Link>
    </StyleActionBack>
  );
};

export default ActionBack;
