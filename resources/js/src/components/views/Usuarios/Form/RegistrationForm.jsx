import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ButtonPage from "../../../common/ButtonPage";
import {handleFunctionsUsuarios} from "./handleFunctionsUsuarios";
import {
  initialErrorsUsuarios,
  initialValuesUsuarios,
} from "./initialValuesUsuarios";
import FieldsPassword from "./ComponentsOfFormUsuarios/FieldsPassword";
import LabelInput from "../../ComponentsOfViews/FieldsForm/LabelInput";

const dataPassword = {
  CONFIRMAR_CLAVE: false,
  CLAVE: false,
};

const RegistrationForm = ({initialValuesUpdate, who}) => {
  const [values, setValues] = useState(
    initialValuesUpdate || initialValuesUsuarios
  );
  const [errors, setErrors] = useState(initialErrorsUsuarios);
  const [viewPassword, setViewPassword] = useState(dataPassword);
  const [focus, setFocus] = useState(dataPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {handleBlur, handleChange, handleSubmit, handleFocus, handleClickView} =
    handleFunctionsUsuarios({
      dispatch,
      errors,
      navigate,
      setErrors,
      setValues,
      values,
      viewPassword,
      setViewPassword,
      focus,
      setFocus,
      who,
    });

  return (
    <form className="FormStyleR" onSubmit={handleSubmit}>
      <div className="ContainerFields">
        <LabelInput
          errors={errors.PRIMER_NOMBRE}
          name="PRIMER_NOMBRE"
          nameField="Primer nombre"
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          value={values.PRIMER_NOMBRE}
          req
          autOff
        />
        <LabelInput
          errors={errors.SEGUNDO_NOMBRE}
          name="SEGUNDO_NOMBRE"
          nameField="Segundo nombre"
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          value={values.SEGUNDO_NOMBRE}
          autOff
        />
        <LabelInput
          errors={errors.PRIMER_APELLIDO}
          name="PRIMER_APELLIDO"
          nameField="Primer apellido"
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          value={values.PRIMER_APELLIDO}
          req
          autOff
        />
        <LabelInput
          errors={errors.SEGUNDO_APELLIDO}
          name="SEGUNDO_APELLIDO"
          nameField="Segundo apellido"
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          value={values.SEGUNDO_APELLIDO}
          autOff
        />
        <LabelInput
          errors={errors.USUARIO}
          name="USUARIO"
          nameField="Usuario"
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          value={values.USUARIO}
          placeholder="Ejemplo: Pepito123"
          autOff
        />
        <LabelInput
          type="email"
          errors={errors.CORREO}
          name="CORREO"
          nameField="Correo"
          onBlur={e => handleBlur(e)}
          onChange={e => handleChange(e)}
          value={values.CORREO}
          autOff
          req
        />
        {who === 1 && (
          <FieldsPassword
            errors={errors}
            focus={focus}
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleClickView={handleClickView}
            handleFocus={handleFocus}
            values={values}
            viewPassword={viewPassword}
          />
        )}
      </div>
      <ButtonPage
        type="submit"
        colorButton="#5328fe"
        className="ButtonRegistrar"
      >
        {who === 1 ? "Registrar" : "Actualizar"}
      </ButtonPage>
    </form>
  );
};

export default RegistrationForm;
