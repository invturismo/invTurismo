import React from "react";
import { helpConvertData } from "../../../../helpers/helpConvertData";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import { initialValuesGeneralForm } from "../../ComponentsOfViews/GeneralForm/initialValuesGeneralForm";
import GeneralGetRecord from "../../ComponentsOfViews/GeneralGetRecord/GeneralGetRecord";
import useRecordMaterial from "../hooks/useRecordMaterial";
import { useNavigate, useParams } from "react-router-dom";

const GetRecordConMaterial = () => {
  const { idPatrimonioMaterial } = useParams();
  const response = useRecordMaterial(idPatrimonioMaterial, "getrecordcom");
  const navigate = useNavigate();

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  const handleClick = () => {
    navigate(
      `/patrimonio-material/completado/actualizar/${response.data.OTROS.ID_MATERIAL}`,
      {
        replace: true,
      }
    );
  };

  return (
    <GeneralGetRecord
      data={helpConvertData(
        initialValuesGeneralForm("PATRIMONIO_MATERIAL"),
        response.data
      )}
      originalData={response.data}
      back="/patrimonio-material/completado"
      handleUpdate={handleClick}
    />
  );
};

export default GetRecordConMaterial;
