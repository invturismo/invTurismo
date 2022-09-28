import React, {useState} from "react";
import {helpCapitalize} from "../../../../helpers/helpCapitalize";
import {StyleFormClasificacionAtractivosTuristicos} from "./StyleFormClasificacionAtractivosTuristicos";
import TipoDeBien from "./DataJson/DataTipoDeBien.json";
import ButtonPage from "../../../common/ButtonPage";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {handleFunctionsCAT} from "./handleFunctionsCAT";
import LabelSelect from "../../ComponentsOfViews/FieldsForm/LabelSelect";

const initialErrors = {
  ID_TIPO_BIEN: "",
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

  const {handleCreate, handleUpdate, handleBlur, handleChange} =
    handleFunctionsCAT({
      dispatch,
      ID_LISTADO,
      navigate,
      setValues,
      setErrors,
      values,
    });

  return (
    <StyleFormClasificacionAtractivosTuristicos
      onSubmit={e => {
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
        <LabelSelect
          nameField="Tipo de bien"
          errors={errors.ID_TIPO_BIEN}
          name="ID_TIPO_BIEN"
          value={values.ID_TIPO_BIEN}
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e)}
          req
        >
          <option value="" disabled>
            Seleccione un tipo de bien
          </option>
          {TipoDeBien.map(val => {
            return (
              <option
                value={val["id_tipos_bien"]}
                key={val["id_tipos_bien"] + val["tipo_bien"]}
              >
                {helpCapitalize(val["tipo_bien"])}
              </option>
            );
          })}
        </LabelSelect>
      </div>
      <div className="ContainerButtons">
        {actualizando ? (
          <ButtonPage type="submit" colorButton="#5328fe">
            Actualizar
          </ButtonPage>
        ) : (
          <>
            <ButtonPage type="submit" colorButton="#763af1">
              Clasificar
            </ButtonPage>
            <ButtonPage type="submit" colorButton="#220646" id="buttonNext">
              Siguiente
            </ButtonPage>
          </>
        )}
      </div>
    </StyleFormClasificacionAtractivosTuristicos>
  );
};

export default FormClasificacionAtractivosTuristicos;
