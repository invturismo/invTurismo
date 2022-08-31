import React from 'react';
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import { openMenu } from '../../../../features/mainLayoutSlice';
import { openModalLayoutState } from '../../../../features/modalsSlice';
import SvgHamburgerMenu from '../SvgComponents/SvgHamburgerMenu';
import SvgLogout from '../SvgComponents/SvgLogout';
import SearchBar from "./SearchBar";

const StyleHeaderMovil = styled.header`
  display: flex;
  padding: 15px;
  background-color: #220646;
  gap: 10px;
  .ContainerSearchBar{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
  .ContainerButtonMenu,
  .ContainerButtonSesion {
    display: grid;
    place-items: center center;
  }
  button {
    cursor: pointer;
  }
`;

const HeaderMovil = () => {
  const dispatch = useDispatch();
  const dataPayload = {
    textMessage1: "¿Estas seguro que quieres",
    textMessage2: "Cerrar sesion?",
    textButton: "cerrar",
    srcImg: "svgLogOutPopup",
    whoFunction: "handleClickLogout",
  };

  return (
    <StyleHeaderMovil>
      <div className="ContainerButtonMenu">
        <button onClick={() => dispatch(openMenu())}>
          <SvgHamburgerMenu size={40} />
        </button>
      </div>
      <div className="ContainerSearchBar">
        <SearchBar movile={true} />
      </div>
      <div className="ContainerButtonSesion">
        <button onClick={() => dispatch(openModalLayoutState(dataPayload))}>
          <SvgLogout size={40} />
        </button>
      </div>
    </StyleHeaderMovil>
  );
};

export default HeaderMovil;