import React from "react";
import styled from "styled-components";

const StyleTitleForm = styled.div`
  small {
    display: block;
    text-align: center;
    font-style: italic;
    color: #6e21a9;
    font-weight: 900;
  }
  span {
    font-size: 0.6rem;
    color: #5328fe;
  }
`;

const TitleForm = ({title}) => {
  return (
    <StyleTitleForm>
      <h2>{title}</h2>
      <small>
        Los campos que tengan un <span>(*)</span> en el nombre son obligatorios
      </small>
    </StyleTitleForm>
  );
};

export default TitleForm;
