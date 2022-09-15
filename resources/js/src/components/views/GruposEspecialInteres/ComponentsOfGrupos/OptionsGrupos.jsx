import React from 'react'
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsGrupos = () => {
  return (
    <div className="OptionsGeneral">
      <ActionBack to={-1} />
      <h2>Exportar grupos de especial interes</h2>
      <div className="ContainerMainOptionsClasificacion">
        <ExportExcel
          fileName="Grupos-especial-interes"
          url="grupos-especiales"
        />
      </div>
    </div>
  );
}

export default OptionsGrupos