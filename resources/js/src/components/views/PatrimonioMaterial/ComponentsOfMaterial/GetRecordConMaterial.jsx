import React from "react";
import {helpConvertData} from "../../../../helpers/helpConvertData";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import GeneralGetRecord from "../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord";
import {useNavigate, useParams} from "react-router-dom";
import useRecordGeneral from "../../ComponentsOfViews/hooks/useRecordGeneral";
import {useDispatch} from "react-redux";
import {helpDeleteRecurso} from "../../ComponentsOfViews/helpers/helpDeleteRecurso";
import {initialValuesGeneralForm} from "../../ComponentsOfViews/GeneralForm/InitialValues/initialValuesGeneralForm";
import {ACTUALIZAR, COMPLETADO, MATERIAL} from "../../../router/paths";

const GetRecordConMaterial = () => {
  const {idPatrimonioMaterial} = useParams();
  const response = useRecordGeneral(
    idPatrimonioMaterial,
    "patrimonios-materiales/getrecordcom"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `${MATERIAL}${COMPLETADO}${ACTUALIZAR}/${response.data.OTROS.ID_MATERIAL}`,
      {replace: true}
    );
  };

  const handleDelete = () => {
    const body = {REGISTRO: idPatrimonioMaterial};
    helpDeleteRecurso({
      body,
      dispatch,
      navigate,
      linkNavigate: `${MATERIAL}${COMPLETADO}`,
      url: "patrimonios-materiales/delete",
    });
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("PATRIMONIO_MATERIAL"),
        response.data
      )}
      originalData={response.data}
      back={-1}
      handleUpdate={handleClick}
      handleDelete={handleDelete}
      who="PATRIMONIO_MATERIAL"
    />
  );
};

export default GetRecordConMaterial;
