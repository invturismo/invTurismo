import React from 'react'
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsListadoPreliminar = () => {
  return (
    <div className="OptionsListadoPreliminar">
      <ActionBack to={-1} />
      <h2>Exportar listado preliminar</h2>
      <div className="ContainerMainOptionsListadoPreliminar">
        <ExportExcel fileName="Listado-Preliminar" url="listado-preliminar" />
      </div>
    </div>
  );
}

export default OptionsListadoPreliminar