import React from 'react'
import { useParams } from 'react-router-dom';
import useCancelUpdate from '../../../../hooks/useCancelUpdate';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import { initialErrorsGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialErrorsGeneralForm';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm';
import MainGeneralForm from '../../ComponentsOfViews/GeneralForm/MainGeneralForm';
import useRecordMaterial from '../hooks/useRecordMaterial';

const calidadValues = {
  ESTADO_CONSERVACION: "",
  CONSTITUCION: "",
  REPRESENTATIVIDAD: "",
};

const GetRecordSinMaterial = () => {
  const { idPatrimonioMaterial } = useParams();
  const response = useRecordMaterial(
    idPatrimonioMaterial,
    "getrecordsincom"
  );
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack to={"/patrimonio-material/sin-completar"} />
      <h2>Completar datos del patrimonio material</h2>
      <MainGeneralForm
        who={1}
        initialErrors={initialErrorsGeneralForm({ ...calidadValues })}
        initialValues={initialValuesGeneralForm(
          { ...calidadValues },
          response.data
        )}
        idRecord={{ "ID_MATERIAL": idPatrimonioMaterial }}
      />
    </div>
  );
}

export default GetRecordSinMaterial