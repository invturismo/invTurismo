import React from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  color: ${(props) => props["color-button"]};
  font-family: inherit;
  padding: 0.6em 1.3em;
  font-weight: 900;
  font-size: 18px;
  border: 3px solid ${(props) => props["color-button"]};
  border-radius: 0.4em;
  box-shadow: 0.1em 0.1em;
  white-space: pre-line;
  text-align: center;
  height: max-content;
  cursor: pointer;
  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
  }
  &:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em;
  }
`;

const ButtonPage = ({ children,colorButton, type, ...props }) => {
  return (
    <ButtonStyle type={type || null} color-button={colorButton} {...props}>
      {children}
    </ButtonStyle>
  );
};

export default ButtonPage;
