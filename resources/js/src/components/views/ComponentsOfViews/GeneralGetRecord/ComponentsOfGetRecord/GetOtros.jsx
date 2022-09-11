import React from 'react';
import GetInformation1 from './GetInformation1';
import TableInformation from './TableInformation';

const Redes = ({ data }) => {
  return (
    <div className="GetContainerTittle">
      <h4>Redes</h4>
      <TableInformation data={data} parent="REDES" />
    </div>
  );
};

const Otros = ({ data }) => {
  return (
    <div className="ContainerGet1">
      <GetInformation1
        content={data.REF_BIBLIOGRAFICA}
        name="Referencias bibliograficas"
        help
      />
      <GetInformation1 content={data.OBSERVACIONES} name="Observaciones" help />
    </div>
  );
};

const Fecha = ({data}) => {
  return (
    <>
      <div className="ContainerGet1">
        {console.log(data)}
        <GetInformation1
          content={data.FECHA_MOVIMIENTO}
          name="Fecha creacion"
        />
        <GetInformation1 content={data.USUARIO} name="Creado por" />
      </div>
      {data.FECHA_MODIFICACION && data.USUARIO_AC && (
        <div className="ContainerGet1">
          <GetInformation1
            content={data.FECHA_MODIFICACION}
            name="Fecha actualizacion"
          />
          <GetInformation1 content={data.USUARIO_AC} name="Actualizado por" />
        </div>
      )}
    </>
  );
}

const GetOtros = ({ data, originalData }) => {
  return (
    <>
      <Redes data={data.REDES} />
      <Otros data={data} />
      <Fecha data={originalData} />
    </>
  );
};

export default GetOtros