export const handleChangeCheckBox = ({
  secondLevelChange,
  setValues,
  values,
}) => {
  return e => {
    if (e.target.name === "HORAS") {
      return secondLevelChange(
        e.target.name,
        e.target.value,
        "CARACTERISTICAS_RELEVANTES",
        "DIAS_HORARIOS"
      );
    }
    setValues({
      ...values,
      CARACTERISTICAS_RELEVANTES: {
        ...values.CARACTERISTICAS_RELEVANTES,
        [e.target.name]: {
          ...values.CARACTERISTICAS_RELEVANTES[e.target.name],
          [e.target.value]: values.CARACTERISTICAS_RELEVANTES[e.target.name][
            e.target.value
          ]
            ? false
            : true,
        },
      },
    });
  };
};
