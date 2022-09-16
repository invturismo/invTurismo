import React from 'react'
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsSitios = () => {
  return (
    <div className="OptionsGeneral">
      <ActionBack to={-1} />
      <h2>Exportar sitios naturales</h2>
      <div className="ContainerMainOptionsClasificacion">
        <ExportExcel
          fileName="Sitios-naturales"
          url="sitios-naturales"
        />
      </div>
    </div>
  );
}

export default OptionsSitios