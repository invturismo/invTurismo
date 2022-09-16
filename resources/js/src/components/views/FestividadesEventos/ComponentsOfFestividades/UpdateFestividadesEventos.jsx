import React from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { helpConvertData } from '../../../../helpers/helpConvertData';
import useCancelUpdate from '../../../../hooks/useCancelUpdate';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import { initialErrorsGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialErrorsGeneralForm';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm';
import MainGeneralForm from '../../ComponentsOfViews/GeneralForm/MainGeneralForm';
import useRecordGeneral from '../../ComponentsOfViews/hooks/useRecordGeneral';

const UpdateFestividadesEventos = () => {
  const { idFestividadesEventos } = useParams();
  const response = useRecordGeneral(
    idFestividadesEventos,
    "festividades-eventos/getrecordcom",
    true
  );
  const dispatch = useDispatch();
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack
        to={"/festividades-eventos/completado/" + idFestividadesEventos}
        replace={true}
      />
      <h2>Actualizar datos de festividades y eventos</h2>
      <MainGeneralForm
        who={3}
        initialErrors={initialErrorsGeneralForm("FESTIVIDADES_EVENTOS")}
        initialValues={helpConvertData(
          initialValuesGeneralForm("FESTIVIDADES_EVENTOS"),
          response.data,
          dispatch
        )}
        idRecord={{ ID_EVENTO: idFestividadesEventos }}
        update
      />
    </div>
  );
}

export default UpdateFestividadesEventos