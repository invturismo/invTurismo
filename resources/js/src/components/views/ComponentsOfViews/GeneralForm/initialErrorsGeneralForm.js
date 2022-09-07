const dataCalidad = {
  PATRIMONIO_MATERIAL: {
    ESTADO_CONSERVACION: "",
    CONSTITUCION: "",
    REPRESENTATIVIDAD: "",
  },
  PATRIMONIOS_INMATERIALES: {
    COLECTIVA: "",
    TRADICIONAL: "",
    ANONIMA: "",
    ESPONTANEA: "",
    POPULAR: "",
  },
};

const generalidades = (Calidad) => {
  const templateGeneralidades = {
    GEORREFERENCIACION: "",
    ID_TIPO_ACCESO: "",
    CORREGIMIENTO_VEREDA_LOCALIDAD: "",
    NOMBRE: "",
  };
  if (Calidad === "PATRIMONIOS_INMATERIALES") return templateGeneralidades;
  const others = {
    UBICACION: "",
    "ADMIN/PROPIETARIOS": {
      NOMBRE: "",
      DIRECCION_UBICACION: "",
      CORREO: "",
      TELEFONO1: "",
      TELEFONO2: "",
    },
  };
  return { ...templateGeneralidades, ...others };
};

const relevantes = (Calidad) => {
  if (Calidad === "PATRIMONIOS_INMATERIALES") return {};
  return {
    CARACTERISTICAS_RELEVANTES: {
      ID_TIPO_CLIMA: "",
      TEMPERATURA: "",
      DIAS_HORARIOS: {
        HORAS: "",
      },
      TARIFAS: {
        NINOS: "",
        ADULTOS: "",
        ADULTO_MAYOR: "",
        EXTRANJEROS: "",
        ESTUDIANTES: "",
        CITA_PREVIA: "",
        GENERAL: "",
      },
      ID_ESTADO: "",
    },
  };
};

const servicios = (Calidad) => {
  if (Calidad === "PATRIMONIOS_INMATERIALES") return {};
  return {
    SERVICIOS: {
      TIENDAS: "",
      GUIAS: "",
      BANOS: "",
      RESTAURANTES: "",
      PARQUEADERO: "",
      ALOJAMIENTO: "",
      OTROS: "",
    },
  };
};

const serviciosEspeciales = (Calidad) => {
  if (Calidad === "PATRIMONIOS_INMATERIALES") return {};
  return {
    SERVICIOS_ESPECIALES: {
      ASCENSORES: "",
      RAMPAS: "",
      DISCAP_AUDITIVA: "",
      BANOS: "",
      MOVILIDAD: "",
      OTROS: "",
    },
  };
};

export const initialErrorsGeneralForm = (Calidad) => ({
  GENERALIDADES: {
    ...generalidades(Calidad),
  },
  CARACTERISTICAS: {
    CODIGOS: {
      ID_MUNICIPIOS: "",
      ID_DEPARTAMENTOS: "",
      ID_ELEMENTO: "",
      ID_COMPONENTE: "",
      ID_GRUPO: "",
      ID_TIPO_PATRIMONIO: "",
    },
    DESCRIPCION: "",
    IMAGEN1: "",
    IMAGEN2: "",
    FUENTE: "",
  },
  PUNTAJES_VALORACION: {
    CALIDAD: {
      ...dataCalidad[Calidad],
    },
    ID_SIGNIFICADO: "",
  },
  ...relevantes(Calidad),
  ACTIVIDADES_SERVICIOS: {
    ACTIVIDADES: {
      CULTURALES: "",
      ARTISTICAS: "",
      FISICAS: "",
      RECREATIVAS: "",
      OTROS: "",
    },
    ...servicios(Calidad),
  },
  PROMOCION: {
    FOLLETOS_GUIAS: "",
    PUBLICACIONES: "",
    TRIPADVISOR: "",
    CTRAVEL: "",
    GOOGLEM: "",
    PAGINA_WEB: "",
    YOUTUBE: "",
    OTROS: "",
  },
  ...serviciosEspeciales(Calidad),
  OTROS: {
    REDES: {
      PAGINA_WEB: "",
      FACEBOOK: "",
      TWITTER: "",
      INSTAGRAM: "",
      OTRA: "",
    },
    REF_BIBLIOGRAFICA: "",
    OBSERVACIONES: "",
  },
});
