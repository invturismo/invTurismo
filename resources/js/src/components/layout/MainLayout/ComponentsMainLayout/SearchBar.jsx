import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { changeSearch } from '../../../../features/filterSlice';

const StyleSearch = styled.form`
  max-width: 350px;
  padding-right: 15px;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px,
    rgb(60 64 67 / 15%) 0px 1px 3px 1px;
  label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
  }
  input {
    flex-grow: 1;
    cursor: text;
    width: 100%;
  }
  button {
    padding: 0 8px;
    display: grid;
    place-items: center center;
    cursor: pointer;
  }
  img,
  .nullSpan {
    width: 15px;
    height: 15px;
  }
  .deleteSearch {
    display: grid;
    place-items: center center;
    cursor: pointer;
  }
`;

const SearchBar = () => {
  const location = useLocation();
  const search = useSelector((state) => state.filterSlice.searchState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const {pathname} = location;
    (()=> {
      if (!pathname.includes("/buscar/")) return "";
      const arrPath = pathname.split("/");
      dispatch(changeSearch(arrPath[2]));
    })();
  }, [location]);
  

  const handleChange = (e) => dispatch(changeSearch(e.target.value));
  const handleDelete = () => {
    const {pathname} = window.location;
    dispatch(changeSearch(""));
    if (pathname.includes("/buscar/")) navigate("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    navigate("/buscar/" + search);
  };

  return (
    <StyleSearch onSubmit={handleSubmit} className="ContainerSearchBar">
      <label htmlFor="SerachBar">
        <button type="submit">
          <img src="/img/iconsGeneral/svgIconSearch.svg" alt="iconSearch" />
        </button>
        <input
          type="text"
          name="SerachBar"
          id="SerachBar"
          placeholder="Buscar recurso"
          value={search}
          onChange={handleChange}
          autoComplete="off"
        />
        {search ? (
          <span className="deleteSearch" onClick={handleDelete}>
            <img src="/img/iconsGeneral/svgDeleteSearch.svg" alt="iconDelete" />
          </span>
        ) : (
          <span className="nullSpan"></span>
        )}
      </label>
    </StyleSearch>
  );
}

export default SearchBar;