import React from "react";
import OptionMenuNavbar from "./OptionMenuNavbar";
import styled from "styled-components";
import Cookies from "universal-cookie";
import {
  CLASIFICACION,
  FESTIVIDADES,
  GRUPOS,
  HOME,
  INMATERIAL,
  LISTADO,
  MATERIAL,
  SITIOS,
  USUARIOS,
} from "../../../../router/paths";
const cookies = new Cookies();

const MenuStyle = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

const MenuNavbar = () => {
  const userRole = cookies.get("user_role");
  return (
    <MenuStyle>
      <OptionMenuNavbar
        linkDirection={HOME}
        linkName="Inicio"
        srcImg="IconInicio"
      />
      <OptionMenuNavbar
        linkDirection={LISTADO}
        linkName="Listado preliminar"
        srcImg="IconListaPreliminar"
      />
      <OptionMenuNavbar
        linkDirection={CLASIFICACION}
        linkName="Clasificacion recursos y atractivos"
        srcImg="IconClasificacionRecursos"
      />
      <OptionMenuNavbar
        linkDirection={MATERIAL}
        linkName="Patrimonio material"
        srcImg="IconPatrimonioMaterial"
      />
      <OptionMenuNavbar
        linkDirection={INMATERIAL}
        linkName="Patrimonio inmaterial"
        srcImg="IconPatrimonioInmaterial"
      />
      <OptionMenuNavbar
        linkDirection={FESTIVIDADES}
        linkName="Festividades y eventos"
        srcImg="IconFestividades"
      />
      <OptionMenuNavbar
        linkDirection={GRUPOS}
        linkName="Grupos especial interes"
        srcImg="IconGruposInteres"
      />
      <OptionMenuNavbar
        linkDirection={SITIOS}
        linkName="Sitios naturales"
        srcImg="IconSitiosNaturales"
      />
      {userRole == 1 && (
        <OptionMenuNavbar
          linkDirection={USUARIOS}
          linkName="Usuarios"
          srcImg="IconUsuarios"
        />
      )}
    </MenuStyle>
  );
};

export default MenuNavbar;
