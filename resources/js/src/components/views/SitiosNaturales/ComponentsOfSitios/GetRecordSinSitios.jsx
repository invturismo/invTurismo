import React from "react";
import {useParams} from "react-router-dom";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import {initialErrorsGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialErrorsGeneralForm";
import {initialValuesGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm";
import MainGeneralForm from "../../ComponentsOfViews/GeneralForm/MainGeneralForm";
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";
import TitleForm from "../../ComponentsOfViews/TitleForm";

const GetRecordSinSitios = () => {
  const {idSitiosNaturales} = useParams();
  const response = useRecordGeneral(
    idSitiosNaturales,
    "sitios-naturales/getrecordsincom"
  );
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack to={-1} />
      <TitleForm title="Completar datos de los sitios naturales" />
      <MainGeneralForm
        who={5}
        initialErrors={initialErrorsGeneralForm("SITIOS_NATURALES")}
        initialValues={initialValuesGeneralForm(
          "SITIOS_NATURALES",
          response.data
        )}
        idRecord={{ID_SITIO: idSitiosNaturales}}
      />
    </div>
  );
};

export default GetRecordSinSitios;
