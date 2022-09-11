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

const UpdatePatrimonioInmaterial = () => {
  const { idPatrimonioInmaterial } = useParams();
  const response = useRecordGeneral(
    idPatrimonioInmaterial,
    "patrimonios-inmateriales/getrecordcom",
    true
  );
  const dispatch = useDispatch();
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack
        to={"/patrimonio-inmaterial/completado/" + idPatrimonioInmaterial}
        replace={true}
      />
      <h2>Actualizar datos del patrimonio inmaterial</h2>
      <MainGeneralForm
        who={2}
        initialErrors={initialErrorsGeneralForm("PATRIMONIOS_INMATERIALES")}
        initialValues={helpConvertData(
          initialValuesGeneralForm("PATRIMONIOS_INMATERIALES"),
          response.data,
          dispatch
        )}
        idRecord={{ ID_INMATERIAL: idPatrimonioInmaterial }}
        update
      />
    </div>
  );
}

export default UpdatePatrimonioInmaterial