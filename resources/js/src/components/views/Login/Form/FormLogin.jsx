import React, {useState} from "react";
import ButtonPage from "../../../common/ButtonPage";
import {ContainerForm} from "./StylesFormLogin";
import {initialErrors, initialValues} from "./initialValuesFormLogin";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {handleFunctionsLogin} from "./handleFunctionsLogin";

const FormLogin = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const {handleBlur, handleChange, handleSubmit} = handleFunctionsLogin({
    dispatch,
    errors,
    initialErrors,
    navigate,
    setErrors,
    setValues,
    values,
  });

  return (
    <ContainerForm onSubmit={e => handleSubmit(e)}>
      <label htmlFor="user">
        <span>Email o Usuario</span>
        <input
          type="text"
          name="user"
          id="user"
          placeholder="Example@gmail.com"
          autoComplete="off"
          value={values.user}
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e)}
        />
        {errors.user && <small className="errorMessage">{errors.user}</small>}
      </label>
      <label htmlFor="clave">
        <span>Contraseña</span>
        <input
          type="password"
          name="clave"
          id="clave"
          placeholder="Tu contraseña"
          value={values.clave}
          onChange={e => handleChange(e)}
          onBlur={e => handleBlur(e)}
        />
        {errors.clave && <small className="errorMessage">{errors.clave}</small>}
      </label>
      <ButtonPage type="submit" colorButton="white">
        LOGIN
      </ButtonPage>
    </ContainerForm>
  );
};

export default FormLogin;
