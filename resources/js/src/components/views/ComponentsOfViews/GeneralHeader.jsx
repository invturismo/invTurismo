import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {
  closeFilter,
  openFilter,
  updateWindow,
} from "../../../features/filterSlice";
import ButtonHeader from "../../common/ButtonHeader";
import {CREAR} from "../../router/paths";
import SearchViews from "./Filter/SearchViews";

const GeneralHeader = ({linkOptions, who}) => {
  const dispatch = useDispatch();
  const stateFilter = useSelector(state => state.filterSlice.stateFilter);

  const handleClickFilter = () => {
    if (stateFilter) dispatch(closeFilter());
    else dispatch(openFilter());
  };

  return (
    <div className="StyleHeader">
      <div className="ContainerOptions">
        {who === 1 && (
          <Link to={`.${CREAR}`}>
            <ButtonHeader imgSrc="svgMore.svg" className="buttonNormal">
              Nuevo
            </ButtonHeader>
          </Link>
        )}
        <ButtonHeader
          imgSrc="svgFilter.svg"
          className="buttonNormal"
          onClick={handleClickFilter}
        >
          Filtros
        </ButtonHeader>
        <Link to={linkOptions}>
          <ButtonHeader imgSrc="svgExport.svg" className="buttonNormal">
            Exportar
          </ButtonHeader>
        </Link>
        <img
          src="/img/iconsGeneral/svgUpdate.svg"
          alt="update"
          onClick={() => dispatch(updateWindow())}
          className="updateImg"
          title="Actualizar"
        />
      </div>
      <div className="ContainerSearch">
        <SearchViews />
      </div>
    </div>
  );
};

export default GeneralHeader;
