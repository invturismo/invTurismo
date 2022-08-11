import React, { useState } from 'react';
import Fuentes from './DataJson/DataFuentes.json';
import { handleFunctionsLP } from "./handleFunctionsLP";
import { initialErrors } from './initialValuesFormListaPreliminar';
import ButtonPage from '../../../common/ButtonPage';
import { useNavigate } from 'react-router-dom';
import GeneralFieldsGeneralidades from '../../ComponentsOfViews/GeneralFieldsGeneralidades';
import { useDispatch } from 'react-redux';

const FormListaPreliminar = ({ initialValues, nameButton, who }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleBlur, handleChange, handleSubmit } = handleFunctionsLP(
    values,
    setValues,
    setErrors,
    errors,
    navigate,
    dispatch
  );

  return (
    <form
      className="FormStyleL"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e, who);
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
        <label htmlFor="ID_FUENTE">
          <span className="NameField">Fuente</span>
          <select
            name="ID_FUENTE"
            id="ID_FUENTE"
            value={values.ID_FUENTE}
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleChange(e)}
          >
            <option value="" disabled>
              Selecione una fuente
            </option>
            {Fuentes.map((val) => {
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
          </select>
          {errors.ID_FUENTE && (
            <small className="errorMessage">{errors.ID_FUENTE}</small>
          )}
        </label>
      </div>
      <div className="ContainerButtons">
        <ButtonPage type="submit" colorButton={who === 3 ? "blue" : "green"}>
          {nameButton}
        </ButtonPage>
        {who === 3 && (
          <ButtonPage type="submit" colorButton="green" id="buttonNext">
            Siguiente
          </ButtonPage>
        )}
      </div>
    </form>
  );
};

export default FormListaPreliminar