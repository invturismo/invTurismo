import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {helpConvertData} from "../../../../helpers/helpConvertData";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {ACTUALIZAR, COMPLETADO, FESTIVIDADES} from "../../../router/paths";
import {initialValuesGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm";
import GeneralGetRecord from "../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord";
import {helpDeleteRecurso} from "../../ComponentsOfViews/helpers/helpDeleteRecurso";
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";

const GetRecordConFestividades = () => {
  const {idFestividadesEventos} = useParams();
  const response = useRecordGeneral(
    idFestividadesEventos,
    "festividades-eventos/getrecordcom"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `${FESTIVIDADES}${COMPLETADO}${ACTUALIZAR}/${response.data.OTROS.ID_EVENTO}`,
      {replace: true}
    );
  };

  const handleDelete = () => {
    const body = {REGISTRO: idFestividadesEventos};
    helpDeleteRecurso({
      body,
      dispatch,
      navigate,
      linkNavigate: `${FESTIVIDADES}${COMPLETADO}`,
      url: "festividades-eventos/delete",
    });
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("FESTIVIDADES_EVENTOS"),
        response.data
      )}
      originalData={response.data}
      back={-1}
      handleUpdate={handleClick}
      who="FESTIVIDADES_EVENTOS"
      handleDelete={handleDelete}
    />
  );
};

export default GetRecordConFestividades;
