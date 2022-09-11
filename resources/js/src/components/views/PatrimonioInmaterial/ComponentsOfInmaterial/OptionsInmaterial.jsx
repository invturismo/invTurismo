import React from 'react'
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsInmaterial = () => {
  return (
    <div className="OptionsGeneral">
      <ActionBack to={-1} />
      <h2>Exportar patrimonios inmateriales</h2>
      <div className="ContainerMainOptionsClasificacion">
        <ExportExcel
          fileName="Patrimonios-inmateriales"
          url="patrimonio-inmaterial"
        />
      </div>
    </div>
  );
}

export default OptionsInmaterial