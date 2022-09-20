import React from 'react';
import { useParams } from 'react-router-dom';
import useCancelUpdate from '../../../../hooks/useCancelUpdate';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import MainGeneralForm from '../../ComponentsOfViews/GeneralForm/MainGeneralForm';
import { useDispatch } from "react-redux";
import { helpConvertData } from '../../../../helpers/helpConvertData';
import useRecordGeneral from '../../ComponentsOfViews/hooks/useRecordGeneral';
import { initialErrorsGeneralForm } from '../../ComponentsOfViews/GeneralForm/InitialValues/initialErrorsGeneralForm';
import { initialValuesGeneralForm } from '../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm';
import { COMPLETADO, MATERIAL } from '../../../router/paths';

const UpdatePatrimonioMaterial = () => {
  const { idPatrimonioMaterial } = useParams();
  const response = useRecordGeneral(
    idPatrimonioMaterial,
    "patrimonios-materiales/getrecordcom",
    true
  );
  const dispatch = useDispatch();
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack
        to={`${MATERIAL}${COMPLETADO}/${idPatrimonioMaterial}`}
        replace={true}
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