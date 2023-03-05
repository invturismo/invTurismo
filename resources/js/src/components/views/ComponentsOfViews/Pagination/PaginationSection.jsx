import React from "react";
import {useSearchParams} from "react-router-dom";
import {validateOthers} from "./logicPagination";
import {StylePagination} from "./StylePagination";

const PaginationSection = ({others}) => {
  const [params, setParams] = useSearchParams();

  //Funcion para cambiar de pagina ya sea siguiente o previa
  const handleClick = (url, prev) => {
    let paramsClick = new URL(url).searchParams;
    let page = paramsClick.get("page");
    if (prev && page > others.last_page) page = others.last_page;
    params.set("page", page);
    setParams(params);
  };

  return (
    <StylePagination>
      {others?.prev_page_url ? (
        <span
          onClick={() => handleClick(others.prev_page_url, true)}
          className="prev"
        >
          <img src="/img/iconsGeneral/svgPrevAndNext.svg" alt="prev" />
        </span>
      ) : (
        <span className="nullSpan"></span>
      )}
      <div>
        {validateOthers(others, params.get("page")).map(val => {
          return (
            <span
              onClick={() => handleClick(val.url)}
              className={val.active ? "ActiveSpan" : null}
              key={"paginacion" + val.label}
            >
              {val.label}
            </span>
          );
        })}
      </div>
      {others?.next_page_url ? (
        <span
          onClick={() => handleClick(others.next_page_url)}
          className="next"
        >
          <img src="/img/iconsGeneral/svgPrevAndNext.svg" alt="prev" />
        </span>
      ) : (
        <span className="nullSpan"></span>
      )}
    </StylePagination>
  );
};

export default PaginationSection;
