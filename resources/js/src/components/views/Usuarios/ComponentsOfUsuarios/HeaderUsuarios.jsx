import React from "react";
import {Link} from "react-router-dom";
import ButtonHeader from "../../../common/ButtonHeader";
import {REGISTRAR, USUARIOS} from "../../../router/paths";
import SearchViews from "../../ComponentsOfViews/Filter/SearchViews";

const HeaderUsuarios = () => {
  return (
    <div className="StyleHeader">
      <div className="ContainerOptions">
        <Link to={`${USUARIOS}${REGISTRAR}`}>
          <ButtonHeader imgSrc="svgMore.svg" className="buttonNormal">
            Nuevo
          </ButtonHeader>
        </Link>
      </div>
      <div className="ContainerSearch">
        <SearchViews />
      </div>
    </div>
  );
};

export default HeaderUsuarios;
