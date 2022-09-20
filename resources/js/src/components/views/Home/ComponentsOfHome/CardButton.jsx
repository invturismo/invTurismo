import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleCardButton = styled.div`
  .Link {
    border-radius: 10px;
    width: 200px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.colorBackground};
    cursor: pointer;
  }
  .Link:hover {
    transform: scale(0.95);
    transition: all 0.3s;
  }
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 7px;
  }
  .quantity {
    font-size: 2rem;
    font-family: ${(props) => props.theme.fonts.secondary};
    font-weight: 600;
    color: white;
    text-align: center;
  }
  .text {
    font-size: 2rem;
    font-weight: 600;
    font-family: ${(props) => props.theme.fonts.secondary};
    color: ${(props) => props.colorText};
  }
`;

const CardButton = ({ colorBackground, srcImg, name1, name2,colorText,linkClick,...props }) => {
  return (
    <StyleCardButton colorBackground={colorBackground} colorText={colorText}>
      <Link className="Link" to={linkClick} {...props}>
        <img src={"/img/iconsGeneral/" + srcImg} alt="icon" />
        <span className="quantity"> {name1} </span>
        {name2 && <span className="text"> {name2} </span>}
      </Link>
    </StyleCardButton>
  );
};

export default CardButton