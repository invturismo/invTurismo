import React from "react";
import {useParams} from "react-router-dom";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import ErrorComponent from "../../../common/ErrorComponent";
import GeneralLoader from "../../../common/GeneralLoader";
import {LISTADO} from "../../../router/paths";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import TitleForm from "../../ComponentsOfViews/TitleForm";
import {changeNullValues} from "../Form/changeNullValues";
import FormListaPreliminar from "../Form/FormListaPreliminar";
import useUpdateDataListadoPreliminar from "../hooks/useUpdateDataListadoPreliminar";

const UpdateListadoPreliminar = () => {
  const {idListado} = useParams();
  const response = useUpdateDataListadoPreliminar(idListado);
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="UpdateListadoPreliminar">
      <ActionBack
        to={`${LISTADO}/${response.data.ID_LISTADO}`}
        replace={true}
      />
      <TitleForm title="Actulizar un listado preliminar" />
      <FormListaPreliminar
        initialValues={changeNullValues(response.data)}
        nameButton="Actualizar"
        who={4}
      />
    </div>
  );
};

export default UpdateListadoPreliminar;
