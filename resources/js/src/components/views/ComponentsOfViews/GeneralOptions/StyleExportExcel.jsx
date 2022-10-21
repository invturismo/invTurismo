import styled from "styled-components";

const StyleExportExcel = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  form > p {
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 1.4rem;
    font-weight: 700;
  }
  select {
    background-color: #2c1742eb;
    width: 180px;
    color: white;
    padding: 3px 5px;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
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
  .LengthQuery {
    padding: 10px 0;
    font-size: 0.9rem;
    font-weight: 900;
  }
  .LengthQuery b {
    background-image: linear-gradient(90deg, #6a11cb 0, #2575fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1rem;
  }
  button {
    align-self: center;
  }
  .ContainerFilters {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
  .ContainerButtonExcel {
    padding: 15px 0;
    display: flex;
    justify-content: center;
  }
  .CsvLink {
    display: flex;
    border-radius: 8px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    gap: 5px;
    padding: 15px;
    background-color: rgb(236, 236, 236);
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  }
  .TextDownload {
    align-self: center;
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 1.1rem;
  }
  img {
    width: 60px;
    height: 60px;
  }
  @media (max-width: 783px) {
    select {
      flex-grow: 1;
    }
  }
`;

export {StyleExportExcel};
