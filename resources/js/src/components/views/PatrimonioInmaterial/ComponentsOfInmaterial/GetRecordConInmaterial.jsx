import React from "react";
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";
import {useNavigate, useParams} from "react-router-dom";
import GeneralLoader from "../../../common/GeneralLoader";
import ErrorComponent from "../../../common/ErrorComponent";
import {helpConvertData} from "../../../../helpers/helpConvertData";
import GeneralGetRecord from "../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord";
import {helpDeleteRecurso} from "../../ComponentsOfViews/helpers/helpDeleteRecurso";
import {useDispatch} from "react-redux";
import {initialValuesGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm";
import {ACTUALIZAR, COMPLETADO, INMATERIAL} from "../../../router/paths";

const GetRecordConInmaterial = () => {
  const {idPatrimonioInmaterial} = useParams();
  const response = useRecordGeneral(
    idPatrimonioInmaterial,
    "patrimonios-inmateriales/getrecordcom"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `${INMATERIAL}${COMPLETADO}${ACTUALIZAR}/${response.data.OTROS.ID_INMATERIAL}`,
      {replace: true}
    );
  };

  const handleDelete = () => {
    const body = {REGISTRO: idPatrimonioInmaterial};
    helpDeleteRecurso({
      body,
      dispatch,
      navigate,
      linkNavigate: `${INMATERIAL}${COMPLETADO}`,
      url: "patrimonios-inmateriales/delete",
    });
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("PATRIMONIOS_INMATERIALES"),
        response.data
      )}
      originalData={response.data}
      back={-1}
      handleUpdate={handleClick}
      who="PATRIMONIOS_INMATERIALES"
      handleDelete={handleDelete}
    />
  );
};

export default GetRecordConInmaterial;
