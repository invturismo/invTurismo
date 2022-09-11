import React from 'react';
import MenuNavbar from './Menu/MenuNavbar';
import { Nav } from './StyleNavbar';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { closeMenu } from '../../../../features/mainLayoutSlice';
import { closeLoaderForm, openLoaderForm, openModalLayoutState } from '../../../../features/modalsSlice';
import { helpLogout } from '../../../../helpers/helpLogout';
import { HOME, LOGIN } from '../../../router/paths';

const CloseMenu = () => {
  const dispatch = useDispatch();

  return (
    <div className="ContainerCloseMenu">
      <button onClick={() => dispatch(closeMenu())}>
        <img src="/img/iconsMenu/IconCloseMenu.svg" alt="CloseIcon" />
      </button>
    </div>
  );
}

const HeaderMenu = () => {
  const dispatch = useDispatch();
  return (
    <header className="HeaderNav">
      <Link to={HOME} onClick={() => dispatch(closeMenu())}>
        inv
      </Link>
    </header>
  );
}

const ButtonLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleClickLogout = async () => {
    dispatch(openLoaderForm());
    await helpLogout();
    dispatch(closeLoaderForm());
    navigate(LOGIN);
  };
  const dataPayload = {
    textMessage1: "¿Estas seguro que quieres",
    textMessage2: "Cerrar sesion?",
    textButton: "cerrar",
    srcImg: "svgLogOutPopup",
    handleFunction: handleClickLogout,
  };

  return (
    <div className="ContainerLogoutNavbar">
      <button onClick={() => dispatch(openModalLayoutState(dataPayload))}>
        <span className="iconOption">
          <img src={`/img/iconsMenu/LogoutIcon.svg`} alt="icon" />
        </span>
        <span className="linkName">Cerrar sesion</span>
      </button>
    </div>
  );
}

const Navbar = ({movile,desktop}) => {
  return (
    <Nav
      resize={{ movile: movile, desktop: desktop }}
      initial={movile ? { x: -200 } : null}
      animate={movile ? { x: [-200, 0] } : null}
      transition={movile ? { duration: 0.5 } : null}
      exit={movile ? { x: [0, -1000] } : null}
      className="Navbar"
    >
      {movile && <CloseMenu />}
      <HeaderMenu />
      <div className="ContainerMenuNavbar">
        <MenuNavbar />
      </div>
      <ButtonLogout />
    </Nav>
  );
};

export default Navbar;