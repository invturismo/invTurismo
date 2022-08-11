import React, { useState } from 'react';
import styled from 'styled-components';

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
  const [search, setSearch] = useState("");

  const handleChange = (e) => setSearch(e.target.value);
  const handleDelete = () => setSearch("");
  const handleSubmit = (e) => e.preventDefault();

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
          placeholder="Buscar en todo"
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