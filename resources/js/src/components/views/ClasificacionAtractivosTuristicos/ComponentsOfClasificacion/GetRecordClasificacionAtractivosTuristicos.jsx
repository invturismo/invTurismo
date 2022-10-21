import React from "react";
import ActionBack from "../../ComponentsOfViews/ActionBack";
import ErrorComponent from "../../../common/ErrorComponent";
import FormClasificacionAtractivosTuristicos from "../Form/FormClasificacionAtractivosTuristicos";
import {useParams} from "react-router-dom";
import useRecordClasificacion from "../hooks/useRecordClasificacion";
import GeneralLoader from "../../../common/GeneralLoader";
import useCancelUpdate from "../../../../hooks/useCancelUpdate";
import {CLASIFICACION, CLASIFICADO} from "../../../router/paths";

const linkUpdate = idListado => `${CLASIFICACION}${CLASIFICADO}/${idListado}`;

const GetRecordClasificacionAtractivosTuristicos = ({actualizando, url}) => {
  const {idRecursoAtractivo} = useParams();
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
        to={actualizando ? linkUpdate(response.data.ID_LISTADO) : -1}
        replace={actualizando || null}
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
