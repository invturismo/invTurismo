import React from 'react'
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsResumen = () => {
  return (
    <div className="OptionsGeneral">
      <ActionBack to={-1} />
      <h2>Exportar cuadro resumen</h2>
      <div className="ContainerMainOptionsClasificacion">
        <ExportExcel fileName="Cuadro-resumen" url="cuadro-resumen" />
      </div>
    </div>
  );
}

export default OptionsResumen