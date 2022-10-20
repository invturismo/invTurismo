import React from "react";

const GeneralTable = ({children}) => {
  return (
    <div className="ContainerTable">
      <table className="StyleTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Código</th>
            <th>Calificación</th>
            <th>Ubicación</th>
            <th>Georreferenciación</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default GeneralTable;
