import React from 'react';
import styled from 'styled-components';

const ButtonStyle = styled.button`
  position: relative;
  font-family: inherit;
  cursor: pointer;
  font-weight: 700;
  border-radius: 5px;
  border: none;
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  color: ghostwhite;
  overflow: hidden;
  img {
    width: 15px;
    height: 15px;
    margin-right: 0.5em;
  }
  span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
    display: inline-flex;
    align-items: center;
  }
  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  &::before {
    content: "";
    background: #15012e;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }
  &:hover::before {
    transform: translate3d(100%, 0, 0);
  }
  &:active {
    transform: scale(0.95);
  }
`;

const ButtonHeader = ({children,imgSrc,...props}) => {
  return (
    <ButtonStyle {...props}>
      <span>
        <img src={"/img/iconsGeneral/" + imgSrc} alt="icon" />
        {children}
      </span>
    </ButtonStyle>
  );
}

export default ButtonHeader