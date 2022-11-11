import React from "react";
import {useParams} from "react-router-dom";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {USUARIOS} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import TitleForm from "../../ComponentsOfViews/TitleForm";
import ResetPassword from "../Form/ComponentsOfFormUsuarios/ResetPassword";
import useRecordUsuario from "../hooks/useRecordUsuario";

const UpdatePassword = () => {
  const {idUsuario} = useParams();
  const response = useRecordUsuario(idUsuario, "user-update");
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="UpdatePassword">
      <ActionBack to={`${USUARIOS}/${idUsuario}`} replace={true} />
      <TitleForm title="Resetear contraseña" />
      <ResetPassword valuesQuery={response.data} />
    </div>
  );
};

export default UpdatePassword;
