import React from "react";
import {useParams} from "react-router-dom";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";
import GeneralLoader from "../../../common/GeneralLoader";
import ErrorComponent from "../../../common/ErrorComponent";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import MainGeneralForm from "../../ComponentsOfViews/GeneralForm/MainGeneralForm";
import {initialErrorsGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialErrorsGeneralForm";
import {initialValuesGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm";
import TitleForm from "../../ComponentsOfViews/TitleForm";

const GetRecordSinGrupos = () => {
  const {idGruposEspeciales} = useParams();
  const response = useRecordGeneral(
    idGruposEspeciales,
    "grupos-especiales/getrecordsincom"
  );
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack to={-1} />
      <TitleForm title="Completar datos del patrimonio material" />
      <MainGeneralForm
        who={4}
        initialErrors={initialErrorsGeneralForm("GRUPOS_ESPECIALES")}
        initialValues={initialValuesGeneralForm(
          "GRUPOS_ESPECIALES",
          response.data
        )}
        idRecord={{ID_GRUPOS: idGruposEspeciales}}
      />
    </div>
  );
};

export default GetRecordSinGrupos;
