import React from "react";
import styled from "styled-components";

const StyleCountData = styled.div`
  font-size: 1rem;
  b {
    font-family: ${props => props.theme.fonts.secondary};
    color: #220646;
  }
`;

const CountData = ({otherData}) => {
  return (
    <StyleCountData>
      <p>
        Por pagina: <b>{otherData.per_page}</b> - Total:{" "}
        <b>{otherData.total}</b>
      </p>
    </StyleCountData>
  );
};

export default CountData;
