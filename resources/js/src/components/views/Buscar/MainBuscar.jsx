import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {changeSearch} from "../../../features/filterSlice";
import {helpCapitalize} from "../../../helpers/helpCapitalize";
import GeneralLoader from "../../common/GeneralLoader";
import PaginationSection from "../ComponentsOfViews/Pagination/PaginationSection";
import {helpUrl} from "./helpers/helpUrl";
import useFindRecord from "./hooks/useFindRecord";
import {StyleBuscar} from "./StyleBuscar";

const MainBuscar = () => {
  const {find} = useParams();
  const {data, response} = useFindRecord(find);
  const dispath = useDispatch();

  useEffect(() => {
    return () => {
      dispath(changeSearch(""));
    };
  }, []);

  if (!response) return <GeneralLoader />;

  return (
    <StyleBuscar>
      <h2>Resultados para {helpCapitalize(find)}</h2>
      {data?.data?.length > 0 ? (
        <div className="MainBuscar">
          {data?.data
            ?.reduce(
              (previousValue, currentValue) => [
                ...previousValue,
                ...helpUrl(currentValue),
              ],
              []
            )
            .map((val, key) => (
              <Link to={val[1]} key={`LinkRecurso${key}`}>
                {val[0]}
              </Link>
            ))}
        </div>
      ) : (
        <div className="NoData">
          <img src="/img/iconsGeneral/svgNoResults.svg" alt="No results" />
          <span>Sin resultados para tu busqueda</span>
        </div>
      )}
      <div className="ContainerPagination">
        <PaginationSection others={data} />
      </div>
    </StyleBuscar>
  );
};

export default MainBuscar;
