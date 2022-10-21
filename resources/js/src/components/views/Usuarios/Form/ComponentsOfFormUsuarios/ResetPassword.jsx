import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ButtonPage from "../../../../common/ButtonPage";
import {handleFunctionsUsuarios} from "../handleFunctionsUsuarios";
import {
  initialErrorsUsuarios,
  initialValuesUsuarios,
} from "../initialValuesUsuarios";
import FieldsPassword from "./FieldsPassword";

const dataPassword = {
  CONFIRMAR_CLAVE: false,
  CLAVE: false,
};

const ResetPassword = ({valuesQuery}) => {
  const [values, setValues] = useState({
    ...initialValuesUsuarios,
    ...valuesQuery,
  });
  const [errors, setErrors] = useState(initialErrorsUsuarios);
  const [viewPassword, setViewPassword] = useState(dataPassword);
  const [focus, setFocus] = useState(dataPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const who = 3;

  const {handleBlur, handleChange, handleClickView, handleFocus, handleSubmit} =
    handleFunctionsUsuarios({
      dispatch,
      errors,
      focus,
      navigate,
      setErrors,
      setFocus,
      setValues,
      setViewPassword,
      values,
      viewPassword,
      who,
    });

  return (
    <form onSubmit={e => handleSubmit(e)} className="FormStyleR">
      <div className="ContainerFields">
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
      </div>
      <ButtonPage
        type="submit"
        colorButton="#5328fe"
        className="ButtonActualizar"
      >
        Actualizar
      </ButtonPage>
    </form>
  );
};

export default ResetPassword;
