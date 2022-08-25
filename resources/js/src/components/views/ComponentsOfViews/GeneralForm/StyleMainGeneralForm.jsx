import styled from "styled-components";
import { DOMAIN } from "../../../router/paths";

const StyleMainGeneralForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 95%;
  max-width: 980px;
  margin: 0 auto;
  input[type="text"],
  input[type="email"],
  input[type="number"] {
    width: 100%;
    box-shadow: rgb(0 0 0 / 80%) 0px 1px 4px;
    border-radius: 5px;
    padding: 7px 15px;
    box-sizing: border-box;
    font-size: 1rem;
    cursor: text;
  }
  input[type="text"]:focus-visible,
  input[type="email"]:focus-visible,
  input[type="number"]:focus-visible,
  textarea:focus-visible {
    box-shadow: rgb(73 0 187) 0px 1px 4px;
  }
  textarea {
    width: 100%;
    font-family: inherit;
    font-size: 1rem;
    resize: none;
    padding: 10px;
    border-radius: 8px;
    border: none;
    box-shadow: rgb(0 0 0 / 80%) 0px 1px 4px;
  }
  select {
    background-color: #2c1742eb;
    color: white;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    width: 100%;
    option {
      background-color: white;
      color: #15012e;
    }
    option:disabled {
      color: #130522b3;
    }
  }
  select:disabled {
    position: relative;
    opacity: 0.5;
  }
  input[type="checkbox"] {
    position: relative;
    width: 18px;
    height: 18px;
    z-index: 1;
  }
  input[type="checkbox"]::after {
    content: "";
    position: absolute;
    z-index: 2;
    inset: -2px;
    border: 3px solid #2c1742eb;
    border-radius: 8px;
    background-color: white;
    cursor: pointer;
  }
  input[type="checkbox"]:checked::before {
    content: "";
    position: absolute;
    z-index: 3;
    width: 80%;
    height: 80%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -35%);
    background-image: url("/img/iconsGeneral/SvgCheck.svg");
    background-size: cover;
    background-position: center;
    cursor: pointer;
  }
  h3,
  h4 {
    font-family: ${(props) => props.theme.fonts.secondary};
  }
  h3 {
    text-align: center;
    font-size: 2rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  section,
  .SectionDivType2 {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .SectionDivType1 {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }
  .TextCodigo {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  .LabelType1,
  .ContainerInputFile {
    display: flex;
    flex-direction: column;
  }
  .LabelFile input {
    display: none;
  }
  .LabelFile {
    display: flex;
    width: 100%;
    max-width: 216px;
    cursor: pointer;
    margin: 0 auto;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-radius: 30px;
    border: 3px solid #220646;
  }
  .LabelFile::before {
    content: "";
    display: block;
    background-size: cover;
    background-position: center;
    background-image: url(${DOMAIN + "img/iconsGeneral/svgUpgrade.svg"});
    height: 30px;
    width: 30px;
  }
  .LabelFile::after {
    content: "Subir imagen";
    display: block;
    font-weight: 800;
    font-size: 0.9rem;
  }
  .containerImage > img {
    width: 100%;
    height: auto;
  }
  .containerImage {
    position: relative;
    max-width: 350px;
    margin: 0 auto;
  }
  .containerImage:hover span {
    display: grid;
  }
  .containerImage span {
    position: absolute;
    inset: 0;
    display: none;
    place-items: center center;
  }
  .containerImage span i {
    cursor: pointer;
  }
  .containerImage span i img {
    width: 40px;
    height: 40px;
  }
  .LabelType1 .NameField {
    font-size: 1.1rem;
    margin-bottom: 8px;
    font-weight: 600;
    color: #15012e;
  }
  .ContainerTextArea {
    margin-top: 15px;
  }
  .Results {
    font-size: 1.2rem;
  }
  label[for="ID_SIGNIFICADO"] {
    max-width: 511px;
  }
  .MainHorario {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
  }
  .ContainerCheckbox > div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .ContainerOptionAcceso {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .errorMessage {
    color: red;
    text-align: center;
  }
  .textEstado {
    font-weight: 900;
  }
  button {
    align-self: center;
    width: max-content;
  }
`;

export {StyleMainGeneralForm};