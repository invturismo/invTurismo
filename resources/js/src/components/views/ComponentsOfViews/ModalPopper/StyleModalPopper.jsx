import styled from "styled-components";
import { motion } from "framer-motion";

const StyleModalPopper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: grid;
  place-items: center center;
  z-index: 51;
  .backgroundModal {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: #000000ba;
  }
`;

const MainModalPopper = styled(motion.div)`
  --color-5x: #110934;
  --color-4x: #29157e;
  --color-3x: #4424d6;
  --color-2x: #8c78e8;
  --color-1x: #e5e0fa;
  position: relative;
  z-index: 52;
  width: 260px;
  height: 330px;
  background: #fff;
  border: none;
  border-radius: 6px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.09), 0 4px 12px 0 rgba(0, 0, 0, 0.19);
  img {
    width: 70px;
    height: 70px;
  }
  .body {
    position: relative;
    width: auto;
    height: 220px;
    background: var(--color-1x);
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }
  .body span {
    color: var(--color-5x);
    display: block;
  }
  .body span.bold {
    font-weight: 700;
    font-size: 1em;
  }
  .body .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 100%;
  }
  .body .text div {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-family: ${(props) => props.theme.fonts.secondary};
  }
  .footer {
    width: 100%;
    height: 110px;
  }
  .footer .container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 100%;
    width: 100%;
  }
  .button-inline {
    background-color: var(--color-3x);
    border: 1px solid var(--color-3x);
    color: white;
  }
  .button-outline {
    background-color: white;
    color: var(--color-5x);
    border: 1px solid var(--color-3x);
  }
  .bttn {
    font-family: ${(props) => props.theme.fonts.secondary};
    width: 100px;
    height: 40px;
    padding: 4px 8px;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 0.7em;
    font-weight: 300;
    cursor: pointer;
    transition: transform 0.2s ease-out;
  }
  .bttn:hover {
    transform: translateY(-3px);
  }
`;

export { StyleModalPopper, MainModalPopper };