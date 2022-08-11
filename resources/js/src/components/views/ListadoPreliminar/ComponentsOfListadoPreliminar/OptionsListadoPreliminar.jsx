import React from 'react'
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsListadoPreliminar = () => {
  return (
    <div className="OptionsListadoPreliminar">
      <h2>Exportar listado preliminar</h2>
      <div className="ContainerMainOptionsListadoPreliminar">
        <ExportExcel fileName='Listado-Preliminar'/>
      </div>
    </div>
  );
}

export default OptionsListadoPreliminar