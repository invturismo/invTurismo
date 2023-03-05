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

//Valores iniciales de los errores
export const initialErrorsGeneralForm = Calidad =>
  funtionalData({
    GENERALIDADES: {
      ...generalidades(Calidad),
    },
    CARACTERISTICAS: {
      ...caracteristicas(),
      IMAGEN1: "",
      IMAGEN2: "",
    },
    PUNTAJES_VALORACION: {
      CALIDAD: {
        ...dataCalidad[Calidad],
      },
      ID_SIGNIFICADO: "",
    },
    ...relevantes(Calidad),
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
