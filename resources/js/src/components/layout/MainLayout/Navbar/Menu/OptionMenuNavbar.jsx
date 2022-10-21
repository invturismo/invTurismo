import React from "react";
import {useDispatch} from "react-redux";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {closeMenu} from "../../../../../features/mainLayoutSlice";

const OptionMenuStyle = styled.li`
  display: block;
  width: 100%;
  a {
    display: flex;
    gap: 10px;
    align-items: center;
    cursor: pointer;
    padding: 10px 10px 10px 20px;
    box-sizing: border-box;
    width: 100%;
  }
  a:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
  img {
    width: 30px;
    height: 30px;
  }
  .linkName {
    font-weight: 100;
    font-size: 0.8rem;
    color: white;
  }
`;

const ContainOption = ({linkName, srcImg}) => {
  return (
    <>
      <span className="iconOption">
        <img src={`/img/iconsMenu/${srcImg}.svg`} alt="icon" />
      </span>
      <span className="linkName">{linkName}</span>
    </>
  );
};

const OptionMenuNavbar = ({linkDirection, linkName, srcImg}) => {
  const dispatch = useDispatch();
  return (
    <OptionMenuStyle>
      <NavLink
        to={linkDirection}
        className={({isActive}) => (isActive ? "decorationActive" : undefined)}
        onClick={() => dispatch(closeMenu())}
      >
        <ContainOption linkName={linkName} srcImg={srcImg} />
      </NavLink>
    </OptionMenuStyle>
  );
};

export default OptionMenuNavbar;
