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

const generalidades = (Calidad,data) => {
  const templateGeneralidades = {
    GEORREFERENCIACION: "",
    ID_TIPO_ACCESO: "",
    CORREGIMIENTO_VEREDA_LOCALIDAD: "",
    NOMBRE: data?.NOMBRE || "",
  };
  if(Calidad === 'PATRIMONIOS_INMATERIALES') return templateGeneralidades;
  const others = {
    UBICACION: data?.UBICACION || "",
    "ADMIN/PROPIETARIOS": {
      NOMBRE: "",
      DIRECCION_UBICACION: "",
      CORREO: "",
      TELEFONO1: "",
      TELEFONO2: "",
    },
  };
  return { ...templateGeneralidades, ...others };
}

const relevantes = (Calidad) => {
  if (Calidad === "PATRIMONIOS_INMATERIALES") return {};
  return {
    CARACTERISTICAS_RELEVANTES: {
      ID_TIPO_CLIMA: "",
      TEMPERATURA: "",
      ACCESO_HORARIOS: {
        RESTRINGIDO: false,
        PERMANENTE: false,
        VISITA_EXTERIOR: false,
        VISITA_INTERIOR: false,
      },
      DIAS_HORARIOS: {
        LUNES: false,
        MARTES: false,
        MIERCOLES: false,
        JUEVES: false,
        VIERNES: false,
        SABADO: false,
        DOMINGO: false,
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
    }
  }
}

export const initialValuesGeneralForm = (Calidad, data) => ({
  GENERALIDADES: {
    ...generalidades(Calidad, data),
  },
  CARACTERISTICAS: {
    CODIGOS: {
      ID_MUNICIPIOS: data?.ID_MUNICIPIOS || "",
      ID_DEPARTAMENTOS: data?.ID_DEPARTAMENTOS || "",
      ID_ELEMENTO: "",
      ID_COMPONENTE: "",
      ID_GRUPO: "",
      ID_TIPO_PATRIMONIO: "",
    },
    DESCRIPCION: "",
    IMAGEN1: null,
    IMAGEN2: null,
    FUENTE: "",
  },
  PUNTAJES_VALORACION: {
    CALIDAD: {
      ...dataCalidad[Calidad],
      SUBTOTAL: "",
    },
    ID_SIGNIFICADO: "",
    TOTAL: "",
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
