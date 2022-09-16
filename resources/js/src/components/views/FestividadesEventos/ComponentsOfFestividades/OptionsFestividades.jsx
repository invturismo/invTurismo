import React from 'react'
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsFestividades = () => {
  return (
    <div className="OptionsGeneral">
      <ActionBack to={-1} />
      <h2>Exportar festividades y eventos</h2>
      <div className="ContainerMainOptionsClasificacion">
        <ExportExcel
          fileName="Festividades-eventos"
          url="festividades-eventos"
        />
      </div>
    </div>
  );
}

export default OptionsFestividades