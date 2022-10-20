import {mainChangeFunctions} from "./changeFuntions/mainChangeFunctions";
import {submitFunctionsGeneralForm} from "./submitFunctionsGeneralForm";

const valueWho = {
  1: "PATRIMONIO_MATERIAL",
  2: "PATRIMONIOS_INMATERIALES",
  3: "FESTIVIDADES_EVENTOS",
  4: "GRUPOS_ESPECIALES",
  5: "SITIOS_NATURALES",
};

export const handleFunctionsGeneralForm = ({
  values,
  setValues,
  errors,
  setErrors,
  initialErrors,
  who,
  dispatch,
  idRecord,
  navigate,
  initialValues,
}) => {
  const handleSubmit = submitFunctionsGeneralForm({
    dispatch,
    idRecord,
    initialErrors,
    initialValues,
    navigate,
    setErrors,
    values,
    valueWho,
    who,
  });

  const handleChange = mainChangeFunctions({
    dispatch,
    errors,
    setErrors,
    setValues,
    values,
    who,
    valueWho,
  });

  return {...handleChange, ...handleSubmit};
};
