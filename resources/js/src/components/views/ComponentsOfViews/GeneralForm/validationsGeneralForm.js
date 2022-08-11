import { object } from "yup";
import { schemaGeneral, unitValidateTemplate } from "./schemasGeneralForm";

export const validationsGeneralForm = async (values, who, templateErrors) => {
  try {
    await schemaGeneral(who).validate(values, {
      abortEarly: false,
    });
    return { state: true };
  } catch (err) {
    let errors = JSON.parse(JSON.stringify(templateErrors));
    err.inner.forEach((val) => {
      const [v1, v2, v3] = val.path.split(".");
      if (!v3) return (errors[v1][v2] = val.message);
      return (errors[v1][v2][v3] = val.message);
    });
    return { state: false, errors };
  }
};

export const unitValidateGeneralForm = async (
  e,
  who,
  firstParent,
  secondParent
) => {
  const { name, value } = e.target;
  const fieldValue = { [name]: value };
  let schema;
  if (secondParent)
    schema = unitValidateTemplate(who)[firstParent][secondParent][name];
  else schema = unitValidateTemplate(who)[firstParent][name];
  try {
    await object({ [name]: schema }).validate(fieldValue);
    return { state: true, errors: { [name]: "" } };
  } catch (err) {
    return { state: false, errors: { [err.path]: err.message } };
  }
};
