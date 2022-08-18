import React from 'react';
import ExportExcel from '../../ComponentsOfViews/GeneralOptions/ExportExcel';

const OptionsClasificacion = () => {
  return (
    <div className="OptionsClasificacion">
      <h2>Exportar clasificacion de recursos y atractivos</h2>
      <div className="ContainerMainOptionsClasificacion">
        <ExportExcel
          fileName="Clasificacion-Recuros-Atractivos"
          url="clasificacion-atractivos"
        />
      </div>
    </div>
  );
}

export default OptionsClasificacion;