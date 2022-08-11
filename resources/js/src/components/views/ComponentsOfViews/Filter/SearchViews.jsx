import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyleSearch = styled.form`
  flex-grow: 1;
  max-width: 250px;
  padding-right: 15px;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
  }
  input {
    flex-grow: 1;
    cursor: text;
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

const SearchViews = () => {
  const [params,setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('buscar')||"");

  const handleChange = (e) => setSearch(e.target.value);
  const handleDelete = () => {
    setSearch("");
    params.delete("buscar");
    params.delete('page');
    setParams(params);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    params.set('buscar',search);
    params.delete('page');
    setParams(params);
  }

  return (
    <StyleSearch onSubmit={handleSubmit}>
      <label htmlFor="SerachViews">
        <button type="submit">
          <img src="/img/iconsGeneral/svgIconSearch.svg" alt="iconSearch" />
        </button>
        <input
          type="text"
          name="SerachViews"
          id="SerachViews"
          placeholder="Busqueda..."
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
};

export default SearchViews;
