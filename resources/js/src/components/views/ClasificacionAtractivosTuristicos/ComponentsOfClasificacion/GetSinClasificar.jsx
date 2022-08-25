import React from 'react';
import GeneralLoader from '../../../common/GeneralLoader';
import useDataClasificacion from '../hooks/useDataClasificacion';
import RowTableClasificacion from './RowTableClasificacion';
import TemplateGet from './TemplateGet';

const GetSinClasificar = () => {
  const { response, data } = useDataClasificacion("sinclas-get");

  if (!response) return <GeneralLoader />;

  return (
    <TemplateGet who={1} others={data}>
      {data?.data?.length > 0 ? (
        data.data.map((val, key) => {
          return (
            <RowTableClasificacion
              key={"RowSinClasificar" + key}
              who={1}
              {...val}
            />
          );
        })
      ) : (
        <tr className="NoData">
          <td colSpan={4}>No hay datos que puedas modificar</td>
        </tr>
      )}
    </TemplateGet>
  );
};

export default GetSinClasificar;