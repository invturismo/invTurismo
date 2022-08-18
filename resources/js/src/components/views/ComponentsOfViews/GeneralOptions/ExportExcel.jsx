import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { useDispatch } from "react-redux";
import ButtonPage from "../../../common/ButtonPage";
import SelectDepartamentos from "../Selects/SelectDepartamentos";
import SelectMunicipio from "../Selects/SelectMunicipio";
import { handleFunctionsExport } from "./handleFunctionsExport";
import { StyleExportExcel } from "./StyleExportExcel";
import Departamentos from "../../ListadoPreliminar/Form/DataJson/DataDepartamentos.json";
import Municipios from "../../ListadoPreliminar/Form/DataJson/DataMunicipio.json";
import { headersExcel } from "./headersExcel";

const initialFilter = {
  ID_DEPARTAMENTOS: "",
  ID_MUNICIPIOS: "",
};

const whoFilter = (textFilter) => {
  const { ID_DEPARTAMENTOS, ID_MUNICIPIOS } = textFilter;
  let stringFilter = "";
  if (ID_DEPARTAMENTOS) {
    Departamentos.forEach((val) => {
      if (val.Código === ID_DEPARTAMENTOS) stringFilter += ` de ${val.Nombre}`;
    });
  }
  if (ID_MUNICIPIOS) {
    if (ID_DEPARTAMENTOS != "11")
      Municipios[ID_DEPARTAMENTOS]?.forEach((val) => {
        if (val.Id_Municipio === ID_MUNICIPIOS)
          stringFilter += ` - ${val.Nombre}`;
      });
  }
	return stringFilter;
};

const ExportExcel = ({ fileName,url }) => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(initialFilter);
  const [textFilter, setTextFilter] = useState(initialFilter);
  const dispatch = useDispatch();

  const { handleSubmit, handleChange } = handleFunctionsExport({
    setData,
    filter,
    setFilter,
    dispatch,
    initialFilter,
    setTextFilter,
    textFilter,
		url
  });

  return (
    <StyleExportExcel>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p>Filtros de exportacion</p>
        <div className="ContainerFilters">
          <SelectDepartamentos handleChange={handleChange} values={filter} />
          <SelectMunicipio handleChange={handleChange} values={filter} />
        </div>
        <ButtonPage type="submit" colorButton="#15012e">
          Consultar
        </ButtonPage>
      </form>
      {data && (
        <p className="LengthQuery">
          Se encontraron <b>{data.length}</b> resultados {whoFilter(textFilter)}
        </p>
      )}
      {data?.length > 0 && (
        <div className="ContainerButtonExcel">
          <CSVLink
            data={data}
            separator={";"}
            filename={fileName}
            className="CsvLink"
            headers={headersExcel[fileName]}
          >
            <span>
              <img src="/img/iconsGeneral/svgExcel.svg" alt="excel" />
            </span>
            <span className="TextDownload">Descargar</span>
          </CSVLink>
        </div>
      )}
    </StyleExportExcel>
  );
};

export default ExportExcel;
