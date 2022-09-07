import React from 'react';
import { useParams } from "react-router-dom";
import useCancelUpdate from '../../../../hooks/useCancelUpdate';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import { initialErrorsGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialErrorsGeneralForm';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm';
import MainGeneralForm from '../../ComponentsOfViews/GeneralForm/MainGeneralForm';
import useRecordGeneral from '../../ComponentsOfViews/hooks/useRecordGeneral';

const GetRecordSinInmaterial = () => {
  const { idPatrimonioInmaterial } = useParams();
  const response = useRecordGeneral(
    idPatrimonioInmaterial,
    "patrimonios-inmateriales/getrecordsincom"
  );
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack to={-1} />
      <h2>Completar datos del patrimonio inmaterial</h2>
      <MainGeneralForm
        who={2}
        initialErrors={initialErrorsGeneralForm("PATRIMONIOS_INMATERIALES")}
        initialValues={initialValuesGeneralForm(
          "PATRIMONIOS_INMATERIALES",
          response.data
        )}
        idRecord={{ ID_INMATERIAL: idPatrimonioInmaterial }}
      />
    </div>
  );
}

export default GetRecordSinInmaterial