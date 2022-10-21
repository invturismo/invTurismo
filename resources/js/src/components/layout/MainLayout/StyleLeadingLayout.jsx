import styled from "styled-components";

const styleLeandingLayoutResize = ({movile, desktop}) => {
  if (movile)
    return `
    display: grid;
    grid-template-rows: auto 1fr;
    min-height: 100vh;
    .backgroungMenuMovile{
      position : fixed;
      height: 100vh;
      top: 0;
      left: 0;
      right: 0;
      background-color: #000000ba;
      z-index: 49;
    }
  `;
  if (desktop)
    return `
    .HeaderDesktop {
      grid-area: HeaderDesktop;
    }
    main {
      grid-area: main;
    }
    .Navbar{
      grid-area: Navbar;
    }
    display: grid;
    grid-template-areas:"Navbar HeaderDesktop"
                        "Navbar main";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
  `;
};

const StyleLeandingLayout = styled.div`
  ${props => styleLeandingLayoutResize(props.resize)}
  main {
    width: 100%;
    overflow-x: hidden;
  }
`;

export {StyleLeandingLayout};
