import Significado from "../../DataJson/DataSignificado.json";
import { helpChangeInt } from "../helpers/helpChangeInt";

export const handleChangeCalidad = ({ values, secondLevelChange }) => {
  const validateExists = (e, who) => {
    if (e.target.name === who) return e.target.value;
    return values.PUNTAJES_VALORACION.CALIDAD[who];
  };

  const handleChangeCalidadMaterial = (e) => {
    let ESTADO_CONSERVACION = validateExists(e, "ESTADO_CONSERVACION");
    let CONSTITUCION = validateExists(e, "CONSTITUCION");
    let REPRESENTATIVIDAD = validateExists(e, "REPRESENTATIVIDAD");
    let ID_SIGNIFICADO = values.PUNTAJES_VALORACION.ID_SIGNIFICADO;
    let SignificadoPuntaje = ID_SIGNIFICADO
      ? Significado[ID_SIGNIFICADO - 1]["PUNTAJE"]
      : "";
    ESTADO_CONSERVACION = helpChangeInt(ESTADO_CONSERVACION);
    CONSTITUCION = helpChangeInt(CONSTITUCION);
    REPRESENTATIVIDAD = helpChangeInt(REPRESENTATIVIDAD);
    SignificadoPuntaje = helpChangeInt(SignificadoPuntaje);
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

  const handleChangeCalidadInmaterial = (e) => {
    let COLECTIVA = validateExists(e, "COLECTIVA");
    let TRADICIONAL = validateExists(e, "TRADICIONAL");
    let ANONIMA = validateExists(e, "ANONIMA");
    let ESPONTANEA = validateExists(e, "ESPONTANEA");
    let POPULAR = validateExists(e, "POPULAR");
    let ID_SIGNIFICADO = values.PUNTAJES_VALORACION.ID_SIGNIFICADO;
    let SignificadoPuntaje = ID_SIGNIFICADO
      ? Significado[ID_SIGNIFICADO - 1]["PUNTAJE"]
      : "";
    COLECTIVA = helpChangeInt(COLECTIVA);
    TRADICIONAL = helpChangeInt(TRADICIONAL);
    ANONIMA = helpChangeInt(ANONIMA);
    ESPONTANEA = helpChangeInt(ESPONTANEA);
    POPULAR = helpChangeInt(POPULAR);
    SignificadoPuntaje = helpChangeInt(SignificadoPuntaje);
    let optionalChange = {
      SUBTOTAL: COLECTIVA + TRADICIONAL + ANONIMA + ESPONTANEA + POPULAR,
    };
    let optionalChange2 = {
      TOTAL:
        SignificadoPuntaje +
        COLECTIVA +
        TRADICIONAL +
        ANONIMA +
        ESPONTANEA +
        POPULAR,
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

  const handleChangeCalidadFestividades = (e) => {
    let ORGANIZACION = validateExists(e, "ORGANIZACION");
    let B_SOCIOCULTURALES = validateExists(e, "B_SOCIOCULTURALES");
    let B_ECONOMICOS = validateExists(e, "B_ECONOMICOS");
    let ID_SIGNIFICADO = values.PUNTAJES_VALORACION.ID_SIGNIFICADO;
    let SignificadoPuntaje = ID_SIGNIFICADO
      ? Significado[ID_SIGNIFICADO - 1]["PUNTAJE"]
      : "";
    ORGANIZACION = helpChangeInt(ORGANIZACION);
    B_SOCIOCULTURALES = helpChangeInt(B_SOCIOCULTURALES);
    B_ECONOMICOS = helpChangeInt(B_ECONOMICOS);
    SignificadoPuntaje = helpChangeInt(SignificadoPuntaje);
    let optionalChange = {
      SUBTOTAL: ORGANIZACION + B_SOCIOCULTURALES + B_ECONOMICOS,
    };
    let optionalChange2 = {
      TOTAL:
        SignificadoPuntaje + ORGANIZACION + B_SOCIOCULTURALES + B_ECONOMICOS,
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

  const handleChangeCalidadGrupos = (e) => {
    let R_COSTUMBRES = validateExists(e, "R_COSTUMBRES");
    let ID_SIGNIFICADO = values.PUNTAJES_VALORACION.ID_SIGNIFICADO;
    let SignificadoPuntaje = ID_SIGNIFICADO
      ? Significado[ID_SIGNIFICADO - 1]["PUNTAJE"]
      : "";
    R_COSTUMBRES = helpChangeInt(R_COSTUMBRES);
    SignificadoPuntaje = helpChangeInt(SignificadoPuntaje);
    let optionalChange = {
      SUBTOTAL: R_COSTUMBRES,
    };
    let optionalChange2 = {
      TOTAL: SignificadoPuntaje + R_COSTUMBRES,
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

  const handleChangeCalidadSitios = (e) => {
    let S_C_AIRE = validateExists(e, "S_C_AIRE");
    let S_C_AGUA = validateExists(e, "S_C_AGUA");
    let S_C_VISUAL = validateExists(e, "S_C_VISUAL");
    let CONSERVACION = validateExists(e, "CONSERVACION");
    let S_C_SONORA = validateExists(e, "S_C_SONORA");
    let DIVERSIDAD = validateExists(e, "DIVERSIDAD");
    let SINGULARIDAD = validateExists(e, "SINGULARIDAD");
    let ID_SIGNIFICADO = values.PUNTAJES_VALORACION.ID_SIGNIFICADO;
    let SignificadoPuntaje = ID_SIGNIFICADO
      ? Significado[ID_SIGNIFICADO - 1]["PUNTAJE"]
      : "";
    S_C_AIRE = helpChangeInt(S_C_AIRE);
    S_C_AGUA = helpChangeInt(S_C_AGUA);
    S_C_VISUAL = helpChangeInt(S_C_VISUAL);
    CONSERVACION = helpChangeInt(CONSERVACION);
    S_C_SONORA = helpChangeInt(S_C_SONORA);
    DIVERSIDAD = helpChangeInt(DIVERSIDAD);
    SINGULARIDAD = helpChangeInt(SINGULARIDAD);
    SignificadoPuntaje = helpChangeInt(SignificadoPuntaje);
    let optionalChange = {
      SUBTOTAL:
        S_C_AIRE +
        S_C_AGUA +
        S_C_VISUAL +
        CONSERVACION +
        S_C_SONORA +
        DIVERSIDAD +
        SINGULARIDAD,
    };
    let optionalChange2 = {
      TOTAL:
        SignificadoPuntaje +
        S_C_AIRE +
        S_C_AGUA +
        S_C_VISUAL +
        CONSERVACION +
        S_C_SONORA +
        DIVERSIDAD +
        SINGULARIDAD,
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

  return {
    handleChangeCalidadMaterial,
    handleChangeCalidadInmaterial,
    handleChangeCalidadFestividades,
    handleChangeCalidadGrupos,
    handleChangeCalidadSitios,
  };
};
