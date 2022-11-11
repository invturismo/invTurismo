import React from "react";
import FormListaPreliminar from "./Form/FormListaPreliminar";
import {StyleMainListadoPreliminar} from "./StyleMainListadoPreliminar";
import GetListadoPreliminar from "./ComponentsOfListadoPreliminar/GetListadoPreliminar";
import {initialValues} from "./Form/initialValuesFormListaPreliminar";
import GetRecordListadoPreliminar from "./ComponentsOfListadoPreliminar/GetRecordListadoPreliminar";
import UpdateListadoPreliminar from "./ComponentsOfListadoPreliminar/UpdateListadoPreliminar";
import ActionBack from "../ComponentsOfViews/ActionBack";
import OptionsListadoPreliminar from "./ComponentsOfListadoPreliminar/OptionsListadoPreliminar";
import {LISTADO} from "../../router/paths";
import TitleForm from "../ComponentsOfViews/TitleForm";

const CreateListadoPreliminar = () => {
  return (
    <div className="CreateListadoPreliminar">
      <ActionBack to={`${LISTADO}`} />
      <TitleForm title="Crear un listado preliminar" />
      <FormListaPreliminar
        initialValues={initialValues}
        nameButton="Aceptar"
        who={3}
      />
    </div>
  );
};

const MainListadoPreliminar = ({who}) => {
  return (
    <StyleMainListadoPreliminar>
      {who === 1 && <GetListadoPreliminar />}
      {who === 2 && <GetRecordListadoPreliminar />}
      {who === 3 && <CreateListadoPreliminar />}
      {who === 4 && <UpdateListadoPreliminar />}
      {who === 5 && <OptionsListadoPreliminar />}
    </StyleMainListadoPreliminar>
  );
};

export default MainListadoPreliminar;
