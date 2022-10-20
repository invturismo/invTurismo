import React from "react";

const TableUsuarios = ({children}) => {
  return (
    <div className="ContainerTable">
      <table className="StyleTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Primer nombre</th>
            <th>Primer apellido</th>
            <th>Usuario</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default TableUsuarios;
