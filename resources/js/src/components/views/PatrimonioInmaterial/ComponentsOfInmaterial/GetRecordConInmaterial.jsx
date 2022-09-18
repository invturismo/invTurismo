import React from 'react'
import useRecordGeneral from '../../ComponentsOfViews/hooks/useRecordGeneral';
import { useNavigate, useParams } from "react-router-dom";
import GeneralLoader from '../../../common/GeneralLoader';
import ErrorComponent from '../../../common/ErrorComponent';
import { helpConvertData } from '../../../../helpers/helpConvertData';
import GeneralGetRecord from '../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm';
import { helpDeleteRecurso } from '../../ComponentsOfViews/helpers/helpDeleteRecurso';
import { useDispatch } from 'react-redux';

const GetRecordConInmaterial = () => {
  const { idPatrimonioInmaterial } = useParams();
  const response = useRecordGeneral(
    idPatrimonioInmaterial,
    "patrimonios-inmateriales/getrecordcom"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `/patrimonio-inmaterial/completado/actualizar/${response.data.OTROS.ID_INMATERIAL}`,
      { replace: true }
    );
  };

  const handleDelete = () => {
    const body = { REGISTRO: idPatrimonioInmaterial };
    helpDeleteRecurso({
      body,
      dispatch,
      navigate,
      linkNavigate: "/patrimonio-inmaterial/completado",
      url: "patrimonios-inmateriales/delete",
    });
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("PATRIMONIOS_INMATERIALES"),
        response.data
      )}
      originalData={response.data}
      back={-1}
      handleUpdate={handleClick}
      who="PATRIMONIOS_INMATERIALES"
      handleDelete={handleDelete}
    />
  );
}

export default GetRecordConInmaterial