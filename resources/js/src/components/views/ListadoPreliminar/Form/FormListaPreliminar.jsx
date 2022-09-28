import React, {useState} from "react";
import Fuentes from "./DataJson/DataFuentes.json";
import {handleFunctionsLP} from "./handleFunctionsLP";
import {initialErrors} from "./initialValuesFormListaPreliminar";
import ButtonPage from "../../../common/ButtonPage";
import {useNavigate} from "react-router-dom";
import GeneralFieldsGeneralidades from "../../ComponentsOfViews/GeneralFieldsGeneralidades";
import {useDispatch} from "react-redux";
import LabelSelect from "../../ComponentsOfViews/FieldsForm/LabelSelect";

const FormListaPreliminar = ({initialValues, nameButton, who}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {handleBlur, handleChange, handleCreate, handleUpdate} =
    handleFunctionsLP(values, setValues, setErrors, errors, navigate, dispatch);

  return (
    <form
      className="FormStyleL"
      onSubmit={e => {
        e.preventDefault();
        if (who === 3) handleCreate(e);
        else handleUpdate(e);
      }}
    >
      <div className="ContainerFields">
        <GeneralFieldsGeneralidades
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          values={values}
          valuesCodigo={values}
        />
        <LabelSelect
          errors={errors.ID_FUENTE}
          name="ID_FUENTE"
          nameField="Fuente"
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          value={values.ID_FUENTE}
          req
        >
          <option value="" disabled>
            Selecione una fuente
          </option>
          {Fuentes.map(val => {
            return (
              <option
                value={val.id_tipos_bien}
                key={val.id_tipos_bien + val.tipo_bien}
              >
                {val.tipo_bien[0].toUpperCase() +
                  val.tipo_bien.slice(1).toLocaleLowerCase()}
              </option>
            );
          })}
        </LabelSelect>
      </div>
      <div className="ContainerButtons">
        <ButtonPage
          type="submit"
          colorButton={who === 3 ? "#220646" : "#5328fe"}
        >
          {nameButton}
        </ButtonPage>
        {who === 3 && (
          <ButtonPage type="submit" colorButton="#5328fe" id="buttonNext">
            Siguiente
          </ButtonPage>
        )}
      </div>
    </form>
  );
};

export default FormListaPreliminar;
