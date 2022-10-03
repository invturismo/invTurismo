import styled from "styled-components";

const StyleBuscar = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
  h2 {
    font-family: ${props => props.theme.fonts.secondary};
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
  .MainBuscar {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-grow: 1;
  }
  a {
    text-decoration: underline;
    color: #5227fc;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    width: fit-content;
  }
  .ContainerPagination {
    display: flex;
    justify-content: center;
  }
  .NoData img {
    width: 200px;
    height: 200px;
  }
  .NoData {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: ${props => props.theme.fonts.secondary};
    text-align: center;
    font-size: 1.5rem;
    gap: 15px;
  }
`;

export {StyleBuscar};
