import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import { useDispatch } from 'react-redux';
import ButtonPage from '../../../common/ButtonPage';
import SelectDepartamentos from '../Selects/SelectDepartamentos';
import SelectMunicipio from '../Selects/SelectMunicipio';
import { handleFunctionsExport } from './handleFunctionsExport';
import { StyleExportExcel } from './StyleExportExcel';

const initialFilter = {
  ID_DEPARTAMENTOS: "",
  ID_MUNICIPIOS: "",
}

const ExportExcel = ({fileName}) => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(initialFilter);
  const dispatch = useDispatch();

  const { handleSubmit, handleChange } = handleFunctionsExport({
    setData,
    filter,
    setFilter,
    dispatch,
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
          Se encontraron <b>{data.length}</b> resultados
        </p>
      )}
      {data?.length > 0 && (
        <div className="ContainerButtonExcel">
          <CSVLink
            data={data}
            separator={";"}
            filename={fileName}
            className="CsvLink"
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
}

export default ExportExcel