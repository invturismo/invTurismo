import {Parallax} from "@react-spring/parallax";
import styled from "styled-components";

export const StyleMainConocenos = styled(Parallax)`
  .imgUcc {
    display: block;
    width: 150px;
    height: auto;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .titleSection {
    font-size: 2rem;
    color: white;
    font-family: "Rubik";
    text-align: end;
  }
  .titleSection span {
    padding: 8px 18px 15px;
    border-radius: 20px 0 0 20px;
    font-family: "Rubik";
    border-bottom: 3px solid white;
    background-color: rgb(47 46 65);
  }
  .sectionProfe,
  .sectionColaboracion {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-items: center;
    gap: 2rem;
  }
  .sectionColaboracion img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
  }
  .sectionColaboracion div {
    width: 100%;
    max-width: 500px;
  }
  .sectionProfe,
  .sectionColaboracion,
  .conPad {
    padding: 0 10px;
  }
  .conPad {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .imgRight,
  .imgLeft {
    display: block;
    width: 60%;
  }
  .imgRight {
    margin-right: 75%;
  }
  .imgLeft {
    margin-left: 65%;
  }
  .containerFondoImg {
    pointer-events: none;
    z-index: -1;
    opacity: 0.3;
  }
  .containerFondoImg div {
    display: flex;
    flex-direction: column;
    gap: 10rem;
  }
  .descripcionSistema {
    padding: 0 10px;
  }
  .descripcionSistema div {
    background-color: white;
    padding: 1rem;
    color: #171722;
    font-size: 1.1rem;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 0.9rem;
  }
  @media (min-width: 814px) {
    .imgUcc {
      width: 200px;
      top: 20px;
      left: 20px;
    }
    .titleSection {
      font-size: 3rem;
    }
    .sectionProfe,
    .sectionColaboracion {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: initial;
    }
    .imgRight,
    .imgLeft {
      width: 40%;
    }
    .containerFondoImg {
      gap: 0.3rem;
    }
    .descripcionSistema div {
      font-size: 1.5rem;
      padding: 1.8rem;
    }
  }
`;
