import React from 'react';
import { Link } from 'react-router-dom';
import ButtonHeader from '../../../common/ButtonHeader';
import SearchViews from '../../ComponentsOfViews/Filter/SearchViews';

const HeaderUsuarios = () => {
  return (
    <div className='StyleHeader'>
      <div className="ContainerOptions">
        <Link to="./registrar">
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
}

export default HeaderUsuarios