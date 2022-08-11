import React from 'react';
import MenuNavbar from './Menu/MenuNavbar';
import { Nav } from './StyleNavbar';
import { useDispatch } from "react-redux";
import { closeMenu } from '../../../../features/mainLayoutSlice';
import { openModalLayoutState } from '../../../../features/modalsSlice';

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
  return (
    <header className="HeaderNav">
      <img src="/img/logos/LogoInventario.svg" alt="Logo inventario" />
    </header>
  );
}

const ButtonLogout = () => {
  const dispatch = useDispatch();

  return (
    <div className="ContainerLogoutNavbar">
      <button onClick={() => dispatch(openModalLayoutState())}>
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