import styled from "styled-components";

const StyleMainHome = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  gap: 30px;
  padding: 30px;
  &::before {
    content: "";
    position: fixed;
    background-color: #331a55;
    z-index: -1;
    inset: 0;
    clip-path: circle(37.8% at 90% 100%);
  }
  .CardsContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
    flex-wrap: wrap;
    flex-grow: 1;
  }
  .WelcomeMessage {
    font-size: 3.4rem;
    font-weight: 600;
    font-family: ${props => props.theme.fonts.secondary};
    text-align: center;
    overflow-wrap: anywhere;
  }
  .WelcomeMessage > span:nth-child(1) {
    color: #331a55;
  }
  .WelcomeMessage > span:nth-child(2) {
    color: #3739fe;
  }
`;

export {StyleMainHome};
