import styled from "styled-components";

const StyleMainHome = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .ContainerImageHome {
    display: flex;
    justify-content: center;
  }
  img {
    width: 90%;
    height: auto;
    max-width: 725px;
  }
  p {
    font-family: ${(props) => props.theme.fonts.secondary};
    font-size: 3rem;
    color: #072847;
    .Color1 {
      color: #3739fe;
    }
    .Color2 {
      color: #ff0046;
    }
  }
`;

export {StyleMainHome};