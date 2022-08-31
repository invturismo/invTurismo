import React from 'react'
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsMaterial = () => {
  return (
    <div className="OptionsGeneral">
      <ActionBack to={-1}/>
      <h2>Exportar patrimonios materiales</h2>
      <div className="ContainerMainOptionsClasificacion">
        <ExportExcel
          fileName="Patrimonios-materiales"
          url="patrimonio-material"
        />
      </div>
    </div>
  );
}

export default OptionsMaterial