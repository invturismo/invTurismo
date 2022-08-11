import styled from "styled-components";
import { motion } from "framer-motion";

const styleNavResize = ({movile,desktop}) => {
  if(movile) return `
    position : fixed;
    top: 0;
    left: 0;
    z-index: 50;
    width: 85%;
    max-width: 286px;
    .ContainerCloseMenu {
      display: flex;
      padding: 10px;
      justify-content: flex-end;
      button {
        cursor: pointer;
      }
      img {
        width: 30px;
        height: 30px;
      }
    }
  `;
  if(desktop) return `
    width: 286px;
  `;
}

const Nav = styled(motion.nav)`
  background-color: #220646;
  display: flex;
  flex-direction: column;
  height: 100vh;
  ${(props) => styleNavResize(props.resize)}
  .HeaderNav {
    display: grid;
    padding: 15px;
    place-items: center center;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .ContainerMenuNavbar {
    flex-grow: 1;
  }
  .ContainerLogoutNavbar {
    background-color: #15012e;
  }
  .ContainerLogoutNavbar > button {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    padding: 10px 10px 10px 20px;
    box-sizing: border-box;
    width: 100%;
  }
  .ContainerLogoutNavbar > button:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
  .ContainerLogoutNavbar > button img {
    width: 30px;
    height: 30px;
  }
  .ContainerLogoutNavbar > button .linkName {
    font-weight: 100;
    font-size: 0.8rem;
    color: white;
  }
  .decorationActive {
    border-right: 3px solid #e4cbff;
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export {Nav};