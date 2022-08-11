import React from 'react';

const TableListadoPreliminar = ({children}) => {
  return (
    <div className="ContainerTable">
      <table className="StyleTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Municipio</th>
            <th>Ubicación</th>
            <th>Fuente</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default TableListadoPreliminar