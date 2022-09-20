import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { helpConvertData } from '../../../../helpers/helpConvertData';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import { ACTUALIZAR, COMPLETADO, GRUPOS } from '../../../router/paths';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm';
import GeneralGetRecord from '../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord';
import { helpDeleteRecurso } from '../../ComponentsOfViews/helpers/helpDeleteRecurso';
import useRecordGeneral from '../../ComponentsOfViews/hooks/useRecordGeneral';

const GetRecordConGrupos = () => {
  const { idGruposEspeciales } = useParams();
  const response = useRecordGeneral(
    idGruposEspeciales,
    "grupos-especiales/getrecordcom"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `${GRUPOS}${COMPLETADO}${ACTUALIZAR}/${response.data.OTROS.ID_GRUPOS}`,
      { replace: true }
    );
  };

  const handleDelete = () => {
    const body = { REGISTRO: idGruposEspeciales };
    helpDeleteRecurso({
      body,
      dispatch,
      navigate,
      linkNavigate: `${GRUPOS}${COMPLETADO}`,
      url: "grupos-especiales/delete",
    });
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
      handleDelete={handleDelete}
    />
  );
}

export default GetRecordConGrupos