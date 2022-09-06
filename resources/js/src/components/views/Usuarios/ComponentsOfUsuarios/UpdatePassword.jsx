import React from 'react';
import { useParams } from 'react-router-dom';
import useCancelUpdate from '../../../../hooks/useCancelUpdate';
import ErrorComponent from '../../../common/ErrorComponent';
import GeneralLoader from '../../../common/GeneralLoader';
import ActionBack from '../../ComponentsOfViews/ActionBack';
import ResetPassword from '../Form/ComponentsOfFormUsuarios/ResetPassword';
import useRecordUsuario from '../hooks/useRecordUsuario';

const UpdatePassword = () => {
  const { idUsuario } = useParams(); 
  const response = useRecordUsuario(idUsuario, "user-update");
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="UpdatePassword">
      <ActionBack to={`/usuarios/${idUsuario}`} replace={true}/>
      <h2>Resetear contraseña</h2>
      <ResetPassword valuesQuery={response.data}/>
    </div>
  );
}

export default UpdatePassword;