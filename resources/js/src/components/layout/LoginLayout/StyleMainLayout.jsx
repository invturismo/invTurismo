import styled from "styled-components";
import {motion} from "framer-motion";

const MainDiv = styled.div`
  position: relative;
  min-height: 100vh;
  & > *:not(.LoaderForm) {
    position: relative;
    z-index: 3;
  }
  &::before {
    content: "";
    background-color: #28254e;
    clip-path: circle(120.8% at 0 100%);
    position: absolute;
    z-index: 2;
    inset: 0;
  }
  .ContainerLeft {
    display: none;
  }
  .ContainerRight {
    position: relative;
    min-height: 100vh;
  }
  .LinkConocenos2 {
    z-index: 99 !important;
  }
  @media (min-width: 768px) {
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    .ContainerLeft {
      display: grid;
      place-items: center center;
    }
    .ContainerRight {
      height: 100vh;
      overflow-y: auto;
    }
    .LinkConocenos2 {
      display: none !important;
    }
  }
`;

const ImgAnimation = styled(motion.div)`
  display: flex;
  justify-content: center;
  img {
    width: 95%;
    max-width: 500px;
  }
`;

export {ImgAnimation, MainDiv};
