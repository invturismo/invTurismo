import React from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {helpConvertData} from "../../../../helpers/helpConvertData";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {COMPLETADO, GRUPOS} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import {initialErrorsGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialErrorsGeneralForm";
import {initialValuesGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm";
import MainGeneralForm from "../../ComponentsOfViews/GeneralForm/MainGeneralForm";
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";
import TitleForm from "../../ComponentsOfViews/TitleForm";

const UpdateGrupos = () => {
  const {idGruposEspeciales} = useParams();
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
        to={`${GRUPOS}${COMPLETADO}/${idGruposEspeciales}`}
        replace={true}
      />
      <TitleForm title="Actualizar datos grupos de especial interés" />
      <MainGeneralForm
        who={4}
        initialErrors={initialErrorsGeneralForm("GRUPOS_ESPECIALES")}
        initialValues={helpConvertData(
          initialValuesGeneralForm("GRUPOS_ESPECIALES"),
          response.data,
          dispatch
        )}
        idRecord={{ID_GRUPOS: idGruposEspeciales}}
        update
      />
    </div>
  );
};

export default UpdateGrupos;
