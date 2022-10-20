import React from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import {helpConvertData} from "../../../../helpers/helpConvertData";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {COMPLETADO, SITIOS} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import {initialErrorsGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialErrorsGeneralForm";
import {initialValuesGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm";
import MainGeneralForm from "../../ComponentsOfViews/GeneralForm/MainGeneralForm";
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";

const UpdateSitiosNaturales = () => {
  const {idSitiosNaturales} = useParams();
  const response = useRecordGeneral(
    idSitiosNaturales,
    "sitios-naturales/getrecordcom",
    true
  );
  const dispatch = useDispatch();
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GeneralContainer">
      <ActionBack
        to={`${SITIOS}${COMPLETADO}/${idSitiosNaturales}`}
        replace={true}
      />
      <h2>Actualizar datos de los sitios naturales</h2>
      <MainGeneralForm
        who={5}
        initialErrors={initialErrorsGeneralForm("SITIOS_NATURALES")}
        initialValues={helpConvertData(
          initialValuesGeneralForm("SITIOS_NATURALES"),
          response.data,
          dispatch
        )}
        idRecord={{ID_SITIO: idSitiosNaturales}}
        update
      />
    </div>
  );
};

export default UpdateSitiosNaturales;
