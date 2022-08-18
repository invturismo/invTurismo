import styled from "styled-components";

const StyleMainClasificacionAtractivosTuristicos = styled.div`
  display: grid;
  min-height: 100%;
  .GetRecordClasificacionAtractivosTuristicos,
  .GetRecordClasificado {
    h2 {
      width: fit-content;
      margin: 0 auto 10px;
      padding-bottom: 5px;
      border-bottom: 3px solid #2206467a;
      text-transform: uppercase;
    }
  }
  .GetRecordClasificado,
  .GetRecordClasificacionAtractivosTuristicos,
  .OptionsClasificacion {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 10px;
    h2 {
      text-align: center;
      font-size: 2.3rem;
      font-family: ${(props) => props.theme.fonts.secondary};
    }
  }
`;

export { StyleMainClasificacionAtractivosTuristicos };