import React from 'react';
import GeneralLoader from '../../../common/GeneralLoader';
import useDataClasificacion from '../hooks/useDataClasificacion';
import RowTableClasificacion from './RowTableClasificacion';
import TemplateGet from './TemplateGet';

const GetClasificado = () => {
  const { response, data } = useDataClasificacion("clas-get");

  if (!response) return <GeneralLoader />;

  return (
    <TemplateGet who={2} others={data}>
      {data.data.length > 0 ? (
        data.data.map((val, key) => {
          return (
            <RowTableClasificacion
              key={"RowSinClasificar" + key}
              who={2}
              {...val}
            />
          );
        })
      ) : (
        <tr className="NoData">
          <td colSpan={5}>No hay datos que puedas visualizar</td>
        </tr>
      )}
    </TemplateGet>
  );
}

export default GetClasificado;