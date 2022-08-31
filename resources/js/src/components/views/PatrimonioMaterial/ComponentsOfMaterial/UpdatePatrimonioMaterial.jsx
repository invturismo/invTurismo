import React from 'react';
import { useParams } from 'react-router-dom';
import useCancelUpdate from '../../../../hooks/useCancelUpdate';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import { initialErrorsGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialErrorsGeneralForm';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm';
import MainGeneralForm from '../../ComponentsOfViews/GeneralForm/MainGeneralForm';
import useRecordMaterial from '../hooks/useRecordMaterial';
import { useDispatch } from "react-redux";
import { helpConvertData } from '../../../../helpers/helpConvertData';

const UpdatePatrimonioMaterial = () => {
  const { idPatrimonioMaterial } = useParams();
  const response = useRecordMaterial(idPatrimonioMaterial, "getrecordcom", true);
  const dispatch = useDispatch();
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack
        to={"/patrimonio-material/completado/" + idPatrimonioMaterial}
      />
      <h2>Actualizar datos del patrimonio material</h2>
      <MainGeneralForm
        who={1}
        initialErrors={initialErrorsGeneralForm("PATRIMONIO_MATERIAL")}
        initialValues={helpConvertData(
          initialValuesGeneralForm("PATRIMONIO_MATERIAL"),
          response.data,
          dispatch
        )}
        idRecord={{ ID_MATERIAL: idPatrimonioMaterial }}
        update
      />
    </div>
  );
}

export default UpdatePatrimonioMaterial;