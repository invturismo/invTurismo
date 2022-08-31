import { setUrlImage } from "../features/imagesSlice";
import { DOMAIN } from "../components/router/paths";

export const helpConvertData = (initialValues, data, dispatch) => {
  const parentsObject = {
    "ADMIN/PROPIETARIOS": "GENERALIDADES",
    CODIGOS: "CARACTERISTICAS",
    CALIDAD: "PUNTAJES_VALORACION",
    ACCESO_HORARIOS: "CARACTERISTICAS_RELEVANTES",
    DIAS_HORARIOS: "CARACTERISTICAS_RELEVANTES",
    TARIFAS: "CARACTERISTICAS_RELEVANTES",
    ACTIVIDADES: "ACTIVIDADES_SERVICIOS",
    SERVICIOS: "ACTIVIDADES_SERVICIOS",
    REDES: "OTROS",
  };

  const validateNull = (val) => (val === null ? "" : val);
  const validateBolean = (val) => {
    if (typeof val != "number") return validateNull(val);
    return val === 0 ? false : true;
  };

  const secondObject = (val, values, parent) => {
    for (const key in values) {
      if (val === "DIAS_HORARIOS" || val === "ACCESO_HORARIOS")
        values[key] = validateBolean(data[parent][val][key]);
      else values[key] = validateNull(data[parent][val][key]);
    }
  };

  const hasValue = (val, values, parent) => {
    if (
      typeof values[val] === "object" &&
      !(val === "IMAGEN1" || val === "IMAGEN2")
    )
      secondObject(val, values[val], parent);
    else values[val] = validateNull(data[parent][val]);
  };

  const exploreArray = (values, parent) => {
    for (let val in values) {
      if (
        typeof values[val] === "object" &&
        !parentsObject[val] &&
        !(val === "IMAGEN1" || val === "IMAGEN2")
      )
        exploreArray(values[val], val);
      else hasValue(val, values, parent);
    }
  };
  
  const finalData = JSON.parse(JSON.stringify(initialValues));
  exploreArray(finalData);
  if(dispatch) {
    dispatch(
      setUrlImage({
        IMAGEN1:
          DOMAIN +
          "storage/imagenes_inventario/" +
          finalData.CARACTERISTICAS.IMAGEN1,
        IMAGEN2:
          DOMAIN +
          "storage/imagenes_inventario/" +
          finalData.CARACTERISTICAS.IMAGEN2,
      })
    );
  }
  return finalData;
};
