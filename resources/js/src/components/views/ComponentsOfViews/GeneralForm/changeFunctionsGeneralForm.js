import { toastMs } from "../../../../helpers/helpToastMessage";
import Componentes from "./DataJson/DataComponentes.json";
import Elementos from "./DataJson/DataElementos.json";
import Significado from "./DataJson/DataSignificado.json";
import {
  unitValidateGeneralForm,
  validationsGeneralForm,
} from "./validationsGeneralForm";

const switchCodigo = (values, e) => {
  let optionalChange = {};
  let idPatrimonio = values.CARACTERISTICAS.CODIGOS.ID_TIPO_PATRIMONIO;
  switch (e.target.name) {
    case "ID_TIPO_PATRIMONIO":
      optionalChange.ID_GRUPO = "";
      optionalChange.ID_COMPONENTE = "";
      optionalChange.ID_ELEMENTO = "";
      break;
    case "ID_GRUPO":
      let Componente = Componentes[idPatrimonio][e.target.value];
      let valueField = !Componente ? "1" : "";
      optionalChange.ID_ELEMENTO = valueField;
      optionalChange.ID_COMPONENTE = valueField;
      break;
    case "ID_COMPONENTE":
      let idGrupo = values.CARACTERISTICAS.CODIGOS.ID_GRUPO;
      let Grupo = Elementos[idPatrimonio][idGrupo];
      if (!Grupo) optionalChange.ID_ELEMENTO = "1";
      else {
        let Elemento = Elementos[idPatrimonio][idGrupo][e.target.value];
        optionalChange.ID_ELEMENTO = !Elemento ? "1" : "";
      }
      break;
    default:
      break;
  }
  return optionalChange;
};
const changeInt = (number) => (isNaN(parseInt(number)) ? 0 : parseInt(number));
const valueWho = {
  1: "PATRIMONIO_MATERIAL",
};

export const changeFunctionsGeneralForm = ({
  values,
  setValues,
  errors,
  setErrors,
  initialErrors,
  who,
}) => {
  const validateExists = (e, who) => {
    if (e.target.name === who) return e.target.value;
    return values.PUNTAJES_VALORACION.CALIDAD[who];
  };

  const firstLevelErrors = (firstParent, response) => {
    setErrors({
      ...errors,
      [firstParent]: {
        ...errors[firstParent],
        ...response.errors,
      },
    });
  };

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

  const normalChange = async (name, value, table, optionalChange = {}) => {
    let e = {
      target: {
        name,value
      }
    }
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
        name,value
      }
    }
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

  const handleChangeGeneralidades = (e) => {
    if (
      e.target.name === "ID_DEPARTAMENTOS" ||
      e.target.name === "ID_MUNICIPIOS"
    ) {
      handleChangeDepartamentosMunicipio(e.target.name, e.target.value);
    } else {
      normalChange(e.target.name, e.target.value, "GENERALIDADES");
    }
  };

  const handleChangeAdminPropietario = (e) => {
    secondLevelChange(e.target.name, e.target.value, "GENERALIDADES", "ADMIN/PROPIETARIOS");
  };

  const handleChangeCaracteristicas = (e) => {
    normalChange(e.target.name, e.target.value, "CARACTERISTICAS");
  };

  const handleChangeCodigo = (e) => {
    let optionalChange = switchCodigo(values, e);
    secondLevelChange(
      e.target.name,
      e.target.value,
      "CARACTERISTICAS",
      "CODIGOS",
      optionalChange
    );
  };

  const handleChangeFile = (e) => {
    console.log(e);
    normalChange(e.target.name, e.target.files[0], "CARACTERISTICAS");
  };

  const handleChangePuntajes = (e) => {
    let Subtotal = values.PUNTAJES_VALORACION.CALIDAD.SUBTOTAL;
    let SignificadoPuntaje = Significado[e.target.value - 1]["PUNTAJE"];
    Subtotal = changeInt(Subtotal);
    SignificadoPuntaje = changeInt(SignificadoPuntaje);
    let optionalChange = {
      TOTAL: SignificadoPuntaje + Subtotal,
    };
    normalChange(
      e.target.name,
      e.target.value,
      "PUNTAJES_VALORACION",
      optionalChange
    );
  };

  const handleChangeCalidadMaterial = (e) => {
    let ESTADO_CONSERVACION = validateExists(e, "ESTADO_CONSERVACION");
    let CONSTITUCION = validateExists(e, "CONSTITUCION");
    let REPRESENTATIVIDAD = validateExists(e, "REPRESENTATIVIDAD");
    let ID_SIGNIFICADO = values.PUNTAJES_VALORACION.ID_SIGNIFICADO;
    let SignificadoPuntaje = ID_SIGNIFICADO
      ? Significado[ID_SIGNIFICADO - 1]["PUNTAJE"]
      : "";
    ESTADO_CONSERVACION = changeInt(ESTADO_CONSERVACION);
    CONSTITUCION = changeInt(CONSTITUCION);
    REPRESENTATIVIDAD = changeInt(REPRESENTATIVIDAD);
    SignificadoPuntaje = changeInt(SignificadoPuntaje);
    let optionalChange = {
      SUBTOTAL: ESTADO_CONSERVACION + CONSTITUCION + REPRESENTATIVIDAD,
    };
    let optionalChange2 = {
      TOTAL:
        SignificadoPuntaje +
        ESTADO_CONSERVACION +
        CONSTITUCION +
        REPRESENTATIVIDAD,
    };
    secondLevelChange(
      e.target.name,
      e.target.value,
      "PUNTAJES_VALORACION",
      "CALIDAD",
      optionalChange,
      optionalChange2
    );
  };

  const handleChangeCaracteristicasRelevantes = (e) => {
    normalChange(e.target.name, e.target.value, "CARACTERISTICAS_RELEVANTES");
  };

  const handleChangeCheckbox = (e) => {
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

  const handleChangeTarifas = (e) => {
    secondLevelChange(
      e.target.name,
      e.target.value,
      "CARACTERISTICAS_RELEVANTES",
      "TARIFAS"
    );
  };

  const handleChangeActividades = (e) => {
    secondLevelChange(
      e.target.name,
      e.target.value,
      "ACTIVIDADES_SERVICIOS",
      "ACTIVIDADES"
    );
  };

  const handleChangeServicios = (e) => {
    secondLevelChange(
      e.target.name,
      e.target.value,
      "ACTIVIDADES_SERVICIOS",
      "SERVICIOS"
    );
  };

  const handleChangePromocion = (e) => {
    normalChange(e.target.name, e.target.value, "PROMOCION");
  };

  const handleChangeServiciosEspeciales = (e) => {
    normalChange(e.target.name, e.target.value, "SERVICIOS_ESPECIALES");
  };

  const handleChangeRedes = (e) => {
    secondLevelChange(e.target.name, e.target.value, "OTROS", "REDES");
  };

  const handleChangeOtros = (e) => {
    normalChange(e.target.name, e.target.value, "OTROS");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await validationsGeneralForm(
      values,
      valueWho[who],
      initialErrors
    );
    if (!response.state) {
      toastMs().error('Hay campos erroneos');
      return setErrors({ ...response.errors });
    }
    console.log("Todo bien");
  };

  const handleBlur = async (e, firstParent, secondParent) => {
    const response = await unitValidateGeneralForm(
      e,
      valueWho[who],
      firstParent,
      secondParent
    );
    if (!response.state) {
      if (!secondParent) firstLevelErrors(firstParent, response);
      else secondLevelErrors(firstParent, secondParent, response);
    }
  };

  return {
    handleChangeCheckbox,
    handleBlur,
    handleSubmit,
    handleChangeGeneralidades,
    handleChangeAdminPropietario,
    handleChangeCaracteristicas,
    handleChangeCodigo,
    handleChangeFile,
    handleChangePuntajes,
    handleChangeCalidadMaterial,
    handleChangeCaracteristicasRelevantes,
    handleChangeTarifas,
    handleChangeActividades,
    handleChangeServicios,
    handleChangePromocion,
    handleChangeServiciosEspeciales,
    handleChangeRedes,
    handleChangeOtros,
  };
};
