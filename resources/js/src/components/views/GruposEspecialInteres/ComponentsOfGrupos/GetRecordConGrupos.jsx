import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { helpConvertData } from '../../../../helpers/helpConvertData';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm';
import GeneralGetRecord from '../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord';
import useRecordGeneral from '../../ComponentsOfViews/hooks/useRecordGeneral';

const GetRecordConGrupos = () => {
  const { idGruposEspeciales } = useParams();
  const response = useRecordGeneral(
    idGruposEspeciales,
    "grupos-especiales/getrecordcom"
  );
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `/grupos-especial-interes/completado/actualizar/${response.data.OTROS.ID_GRUPOS}`,
      { replace: true }
    );
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("GRUPOS_ESPECIALES"),
        response.data
      )}
      originalData={response.data}
      back={-1}
      handleUpdate={handleClick}
      who="GRUPOS_ESPECIALES"
    />
  );
}

export default GetRecordConGrupos