import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { helpConvertData } from '../../../../helpers/helpConvertData';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm';
import GeneralGetRecord from '../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord';
import useRecordGeneral from '../../ComponentsOfViews/hooks/useRecordGeneral';

const GetRecordConFestividades = () => {
  const { idFestividadesEventos } = useParams();
  const response = useRecordGeneral(
    idFestividadesEventos,
    "festividades-eventos/getrecordcom"
  );
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `/festividades-eventos/completado/actualizar/${response.data.OTROS.ID_EVENTO}`,
      { replace: true }
    );
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("FESTIVIDADES_EVENTOS"),
        response.data
      )}
      originalData={response.data}
      back={-1}
      handleUpdate={handleClick}
      who="FESTIVIDADES_EVENTOS"
    />
  );
}

export default GetRecordConFestividades