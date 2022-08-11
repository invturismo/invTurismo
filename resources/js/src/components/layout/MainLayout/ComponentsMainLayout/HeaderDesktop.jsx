import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';

const StyleHeaderDesktop = styled.header`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  position: relative;
  &::before {
    content: "";
    display: block;
    position: absolute;
    inset: 0;
    background-color: #220646;
    z-index: -1;
    clip-path: ellipse(73% 76% at 30% 0%);
  }
  .ContainerSearchBar {
    flex-grow: 1;
  }
`;

const HeaderDesktop = () => {
  return (
    <StyleHeaderDesktop className='HeaderDesktop'>
      <SearchBar desktop={true}/>
    </StyleHeaderDesktop>
  )
}

export default HeaderDesktop;