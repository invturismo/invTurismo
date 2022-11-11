import React from "react";
import {useParams} from "react-router-dom";
import {helpDropNull} from "../../../../helpers/helpDropNull";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {USUARIOS} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import TitleForm from "../../ComponentsOfViews/TitleForm";
import RegistrationForm from "../Form/RegistrationForm";
import useRecordUsuario from "../hooks/useRecordUsuario";

const UpdateUsuarios = () => {
  const {idUsuario} = useParams();
  const response = useRecordUsuario(idUsuario, "user-update");
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="UpdateUsuarios">
      <ActionBack
        to={`${USUARIOS}/${response.data.ID_USUARIO}`}
        replace={true}
      />
      <TitleForm title="Actualizar un usuario" />
      <RegistrationForm
        who={2}
        initialValuesUpdate={helpDropNull(response.data)}
      />
    </div>
  );
};

export default UpdateUsuarios;
