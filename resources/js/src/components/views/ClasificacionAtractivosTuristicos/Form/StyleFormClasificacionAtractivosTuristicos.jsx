import styled from "styled-components";

const StyleFormClasificacionAtractivosTuristicos = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 95%;
  max-width: 740px;
  margin: 0 auto;
  .MainInformation {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }
  p,
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .titleInformation {
    font-family: ${(props) => props.theme.fonts.secondary};
    font-weight: 600;
    color: #15012e;
    font-size: 1.4rem;
  }
  .information {
    font-size: 1.2rem;
  }
  .ContainerButtons {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
  }
  .errorMessage {
    color: red;
    text-align: center;
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
`;

export { StyleFormClasificacionAtractivosTuristicos };