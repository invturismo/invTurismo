import React from 'react'
import { useParams } from 'react-router-dom';
import { helpDropNull } from '../../../../helpers/helpDropNull';
import useCancelUpdate from '../../../../hooks/useCancelUpdate';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import { USUARIOS } from '../../../router/paths';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import RegistrationForm from '../Form/RegistrationForm';
import useRecordUsuario from '../hooks/useRecordUsuario';

const UpdateUsuarios = () => {
  const { idUsuario } = useParams();
  const response = useRecordUsuario(idUsuario, "user-update");
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="UpdateUsuarios">
      <ActionBack to={`${USUARIOS}/${response.data.ID_USUARIO}`} replace={true} />
      <h2>Actualizar un usuario</h2>
      <RegistrationForm
        who={2}
        initialValuesUpdate={helpDropNull(response.data)}
      />
    </div>
  );
}

export default UpdateUsuarios