import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { helpConvertData } from '../../../../helpers/helpConvertData';
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import { initialValuesGeneralForm } from "../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm";
import GeneralGetRecord from '../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord';
import { helpDeleteRecurso } from '../../ComponentsOfViews/helpers/helpDeleteRecurso';
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";

const GetRecordConSitios = () => {
  const { idSitiosNaturales } = useParams();
  const response = useRecordGeneral(
    idSitiosNaturales,
    "sitios-naturales/getrecordcom"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `/sitios-naturales/completado/actualizar/${response.data.OTROS.ID_SITIO}`,
      { replace: true }
    );
  };

  const handleDelete = () => {
    const body = { REGISTRO: idSitiosNaturales };
    helpDeleteRecurso({
      body,
      dispatch,
      navigate,
      linkNavigate: "/sitios-naturales/completado",
      url: "sitios-naturales/delete",
    });
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("SITIOS_NATURALES"),
        response.data
      )}
      originalData={response.data}
      back={-1}
      handleUpdate={handleClick}
      who="SITIOS_NATURALES"
      handleDelete={handleDelete}
    />
  );
}

export default GetRecordConSitios