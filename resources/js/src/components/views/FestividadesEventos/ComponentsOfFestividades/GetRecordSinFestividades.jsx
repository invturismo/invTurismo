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

const GetRecordSinFestividades = () => {
  const {idFestividadesEventos} = useParams();
  const response = useRecordGeneral(
    idFestividadesEventos,
    "festividades-eventos/getrecordsincom"
  );
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack to={-1} />
      <TitleForm title="Completar datos del patrimonio material" />
      <MainGeneralForm
        who={3}
        initialErrors={initialErrorsGeneralForm("FESTIVIDADES_EVENTOS")}
        initialValues={initialValuesGeneralForm(
          "FESTIVIDADES_EVENTOS",
          response.data
        )}
        idRecord={{ID_EVENTO: idFestividadesEventos}}
      />
    </div>
  );
};

export default GetRecordSinFestividades;
