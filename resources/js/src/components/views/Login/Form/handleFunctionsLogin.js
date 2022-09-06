import { closeLoaderForm, openLoaderForm } from "../../../../features/modalsSlice";
import { HOME } from "../../../router/paths";
import { fetchLogin, saveCookies } from "./LogicFormLogin";
import { unitValidationLogin, validationsLogin } from "./schemaErrorsFormLogin";

export const handleFunctionsLogin = ({
  dispatch,
  setErrors,
  navigate,
  setValues,
  errors,
  initialErrors,
  values
}) => {
  const handleChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    const response = await unitValidationLogin(e);
    if (response.state) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleBlur = async (e) => {
    const response = await unitValidationLogin(e);
    if (!response.state) setErrors({ ...errors, ...response.errors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validationsLogin(values);
    if (!response.state)
      return setErrors({ ...initialErrors, ...response.errors });
    dispatch(openLoaderForm());
    const data = await fetchLogin(values);
    dispatch(closeLoaderForm());
    if (!data.state) return setErrors(data.errors);
    saveCookies(data);
    navigate(HOME);
  };
  return { handleChange, handleSubmit, handleBlur };
};