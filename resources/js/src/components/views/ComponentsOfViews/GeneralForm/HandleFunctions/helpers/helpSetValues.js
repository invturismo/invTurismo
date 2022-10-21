import {unitValidateGeneralForm} from "../../validationsGeneralForm";

export const helpSetValues = ({
  errors,
  setErrors,
  setValues,
  values,
  valueWho,
  who,
}) => {
  /*Cambia un valor de error si el objeto solo tiene un objeto padre */
  const firstLevelErrors = (firstParent, response) => {
    setErrors({
      ...errors,
      [firstParent]: {
        ...errors[firstParent],
        ...response.errors,
      },
    });
  };

  /*Cambia un valor de error si el objeto tiene dos objetos padre */
  const secondLevelErrors = (firstParent, secondParent, response) => {
    setErrors({
      ...errors,
      [firstParent]: {
        ...errors[firstParent],
        [secondParent]: {
          ...errors[firstParent][secondParent],
          ...response.errors,
        },
      },
    });
  };

  /*Cambia un valor del campo de texto si el objeto solo tiene un objeto padre */
  const normalChange = async (name, value, table, optionalChange = {}) => {
    let e = {
      target: {
        name,
        value,
      },
    };
    setValues({
      ...values,
      [table]: {
        ...values[table],
        [name]: value,
        ...optionalChange,
      },
    });
    let response = await unitValidateGeneralForm(e, valueWho[who], table);
    if (response.state) firstLevelErrors(table, response);
  };

  /*Cambia un valor del campo de texto si el objeto tiene dos objetos padre */
  const secondLevelChange = async (
    name,
    value,
    firstTable,
    secondTable,
    optionalChange = {},
    optionalChange2 = {}
  ) => {
    let e = {
      target: {
        name,
        value,
      },
    };
    setValues({
      ...values,
      [firstTable]: {
        ...values[firstTable],
        [secondTable]: {
          ...values[firstTable][secondTable],
          [name]: value,
          ...optionalChange,
        },
        ...optionalChange2,
      },
    });
    let response = await unitValidateGeneralForm(
      e,
      valueWho[who],
      firstTable,
      secondTable
    );
    if (response.state) secondLevelErrors(firstTable, secondTable, response);
  };

  return {
    firstLevelErrors,
    secondLevelErrors,
    normalChange,
    secondLevelChange,
  };
};
