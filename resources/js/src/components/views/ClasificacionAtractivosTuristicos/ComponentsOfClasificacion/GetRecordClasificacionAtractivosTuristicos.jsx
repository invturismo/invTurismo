import React from "react";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import ErrorComponent from "../../../common/ErrorComponent";
import FormClasificacionAtractivosTuristicos from "../Form/FormClasificacionAtractivosTuristicos";
import { useParams } from "react-router-dom";
import useRecordClasificacion from "../hooks/useRecordClasificacion";
import GeneralLoader from "../../../common/GeneralLoader";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";

const GetRecordClasificacionAtractivosTuristicos = ({ actualizando,url,back }) => {
  const { idRecursoAtractivo } = useParams();
  const response = useRecordClasificacion(
    idRecursoAtractivo,
    url,
    actualizando
  );
  useCancelUpdate(response);

  if (!response) return <GeneralLoader />;

  if (!response.state) return <ErrorComponent message={response.message} />;

  return (
    <div className="GetRecordClasificacionAtractivosTuristicos">
      <ActionBack
        to={"/clasificacion-recursos-atractivos/".concat(
          back,
          actualizando ? `/${response.data.ID_LISTADO}` : ""
        )}
      />
      <h2>{response.data.NOMBRE}</h2>
      <FormClasificacionAtractivosTuristicos
        initialValues={{
          ID_TIPO_BIEN: response.data.ID_TIPO_BIEN
            ? response.data.ID_TIPO_BIEN
            : "",
          ID_LISTADO: response.data.ID_LISTADO,
        }}
        actualizando={actualizando || null}
        {...response.data}
      />
    </div>
  );
};

export default GetRecordClasificacionAtractivosTuristicos;
