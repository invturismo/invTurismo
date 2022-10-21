export const handleChangesGeneralidades = ({
  secondLevelChange,
  normalChange,
}) => {
  const handleChangeDepartamentosMunicipio = (name, value) => {
    let optionalChange = {
      ID_MUNICIPIOS: "",
      ID_TIPO_PATRIMONIO: "",
      ID_GRUPO: "",
      ID_COMPONENTE: "",
      ID_ELEMENTO: "",
    };
    if (name === "ID_DEPARTAMENTOS") {
      secondLevelChange(
        name,
        value,
        "CARACTERISTICAS",
        "CODIGOS",
        optionalChange
      );
    } else {
      delete optionalChange.ID_MUNICIPIOS;
      secondLevelChange(
        name,
        value,
        "CARACTERISTICAS",
        "CODIGOS",
        optionalChange
      );
    }
  };

  return e => {
    if (
      e.target.name === "ID_DEPARTAMENTOS" ||
      e.target.name === "ID_MUNICIPIOS"
    ) {
      handleChangeDepartamentosMunicipio(e.target.name, e.target.value);
    } else {
      normalChange(e.target.name, e.target.value, "GENERALIDADES");
    }
  };
};
