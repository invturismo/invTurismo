import styled from "styled-components";
import { motion } from "framer-motion";

const ContainerLogin = styled.div`
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginStyle = styled(motion.div)`
  background-color: #483ba8;
  box-shadow: rgb(0 0 0 / 58%) 0px 2px 18px 0px;
  margin: 0 auto;
  width: 95%;
  max-width: 405px;
  .MainContent {
    padding: 35px 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    border-radius: 5px;
    position: relative;
    z-index: 1;
  }
  .ContainerImage {
    display: grid;
    place-items: center center;
    padding: 10px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  h2 {
    font-size: 2.5rem;
    font-family: "Rubik", sans-serif;
    color: white;
  }
  .ContainerWhiteBackground {
    height: 150px;
    display: flex;
    align-items: flex-end;
    box-sizing: content-box;
    position: relative;
    padding: 30px;
    &::before {
      content: "";
      inset: 0 0 0 0;
      position: absolute;
      z-index: 1;
      background-color: white;
      clip-path: polygon(0 0, 100% 55%, 100% 100%, 0% 100%);
    }
    p {
      position: relative;
      z-index: 2;
      color: rgb(42 59 113);
      font-weight: 700;
    }
  }
`;

export { ContainerLogin, LoginStyle };
