import React, { useState } from "react";
import { helpCapitalize } from "../../../../helpers/helpCapitalize";
import { StyleFormClasificacionAtractivosTuristicos } from "./StyleFormClasificacionAtractivosTuristicos";
import TipoDeBien from "./DataJson/DataTipoDeBien.json";
import ButtonPage from "../../../common/ButtonPage";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleFunctionsCAT } from "./handleFunctionsCAT";

const initialErrors = {
  ID_TIPO_BIEN : "",
};

const FormClasificacionAtractivosTuristicos = ({
  initialValues,
  actualizando,
  ID_LISTADO,
  DEPARTAMENTO,
  MUNICIPIO,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const { handleCreate, handleUpdate , handleBlur, handleChange } = handleFunctionsCAT({
    dispatch,
    ID_LISTADO,
    navigate,
    setValues,
    setErrors,
    values,
  });

  return (
    <StyleFormClasificacionAtractivosTuristicos
      onSubmit={(e) => {
        e.preventDefault();
        if (actualizando) handleUpdate(e);
        else handleCreate(e);
      }}
    >
      <div className="MainInformation">
        <p>
          <span className="titleInformation">Departamento: </span>
          <span className="information">{helpCapitalize(DEPARTAMENTO)}</span>
        </p>
        <p>
          <span className="titleInformation">Municipio: </span>
          <span className="information">{helpCapitalize(MUNICIPIO)}</span>
        </p>
        <label htmlFor="ID_TIPO_BIEN">
          <span className="titleInformation">Tipo de bien</span>
          <select
            name="ID_TIPO_BIEN"
            id="ID_TIPO_BIEN"
            value={values.ID_TIPO_BIEN}
            onChange={(e) => handleChange(e)}
            onBlur={(e) => handleBlur(e)}
          >
            <option value="" disabled>
              Seleccione un tipo de bien
            </option>
            {TipoDeBien.map((val) => {
              return (
                <option
                  value={val["id_tipos_bien"]}
                  key={val["id_tipos_bien"] + val["tipo_bien"]}
                >
                  {helpCapitalize(val["tipo_bien"])}
                </option>
              );
            })}
          </select>
          {errors.ID_TIPO_BIEN && (
            <small className="errorMessage">{errors.ID_TIPO_BIEN}</small>
          )}
        </label>
      </div>
      <div className="ContainerButtons">
        {actualizando ? (
          <ButtonPage type="submit" colorButton="green">
            Actualizar
          </ButtonPage>
        ) : (
          <>
            <ButtonPage type="submit" colorButton="blue">
              Clasificar
            </ButtonPage>
            <ButtonPage type="submit" colorButton="green" id="buttonNext">
              Siguiente
            </ButtonPage>
          </>
        )}
      </div>
    </StyleFormClasificacionAtractivosTuristicos>
  );
};

export default FormClasificacionAtractivosTuristicos;
