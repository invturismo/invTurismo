import React from 'react';

const TableClasificacionAtractivosTuristicos = ({children,who}) => {
  return (
    <div className="ContainerTable">
      <table className="StyleTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Departamento</th>
            <th>Municipio</th>
            {who === 2 && <th>Tipo de bien</th>}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default TableClasificacionAtractivosTuristicos;