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

const UpdateGrupos = () => {
  const { idGruposEspeciales } = useParams();
  const response = useRecordGeneral(
    idGruposEspeciales,
    "grupos-especiales/getrecordcom",
    true
  );
  const dispatch = useDispatch();
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack
        to={"/grupos-especial-interes/completado/" + idGruposEspeciales}
        replace={true}
      />
      <h2>Actualizar datos grupos de especial interés</h2>
      <MainGeneralForm
        who={4}
        initialErrors={initialErrorsGeneralForm("GRUPOS_ESPECIALES")}
        initialValues={helpConvertData(
          initialValuesGeneralForm("GRUPOS_ESPECIALES"),
          response.data,
          dispatch
        )}
        idRecord={{ ID_GRUPOS: idGruposEspeciales }}
        update
      />
    </div>
  );
}

export default UpdateGrupos