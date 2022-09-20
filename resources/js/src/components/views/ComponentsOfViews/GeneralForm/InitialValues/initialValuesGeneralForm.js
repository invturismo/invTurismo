import {
  actividades,
  caracteristicas,
  dataCalidad,
  fieldInternacional,
  funtionalData,
  generalidades,
  otros,
  promocion,
  relevantes,
  servicios,
  serviciosEspeciales,
} from "./templateValues";

export const initialValuesGeneralForm = (Calidad, data) =>
  funtionalData({
    GENERALIDADES: {
      ...generalidades(Calidad, data),
    },
    CARACTERISTICAS: {
      ...caracteristicas(data),
      IMAGEN1: null,
      IMAGEN2: null,
    },
    PUNTAJES_VALORACION: {
      CALIDAD: {
        ...dataCalidad[Calidad],
        SUBTOTAL: "",
      },
      ID_SIGNIFICADO: "",
      TOTAL: "",
    },
    ...relevantes(Calidad, true),
    ACTIVIDADES_SERVICIOS: {
      ...actividades,
      ...servicios(Calidad),
    },
    ...promocion,
    ...serviciosEspeciales(Calidad),
    OTROS: {
      ...otros,
      ...fieldInternacional(Calidad),
    },
  });
