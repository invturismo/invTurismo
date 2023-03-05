/* Las siguientes funciones reparten los valores del formulario general en objetos */

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
  FESTIVIDADES_EVENTOS: {
    ORGANIZACION: "",
    B_SOCIOCULTURALES: "",
    B_ECONOMICOS: "",
  },
  GRUPOS_ESPECIALES: {
    R_COSTUMBRES: "",
  },
  SITIOS_NATURALES: {
    S_C_AIRE: "",
    S_C_AGUA: "",
    S_C_VISUAL: "",
    CONSERVACION: "",
    S_C_SONORA: "",
    DIVERSIDAD: "",
    SINGULARIDAD: "",
  },
};

const generalidades = (Calidad, data) => {
  const templateGeneralidades = {
    GEORREFERENCIACION: "",
    ID_TIPO_ACCESO: "",
    CORREGIMIENTO_VEREDA_LOCALIDAD: "",
    NOMBRE: data?.NOMBRE || "",
  };
  if (Calidad === "PATRIMONIOS_INMATERIALES") return templateGeneralidades;
  const others = {
    UBICACION: data?.UBICACION || "",
    INDICACIONES_ACCESO: "",
    "ADMIN/PROPIETARIOS": {
      NOMBRE: "",
      DIRECCION_UBICACION: "",
      CORREO: "",
      TELEFONO1: "",
      TELEFONO2: "",
    },
  };
  return {...templateGeneralidades, ...others};
};

const caracteristicas = data => {
  return {
    CODIGOS: {
      ID_MUNICIPIOS: data?.ID_MUNICIPIOS || "",
      ID_DEPARTAMENTOS: data?.ID_DEPARTAMENTOS || "",
      ID_ELEMENTO: "",
      ID_COMPONENTE: "",
      ID_GRUPO: "",
      ID_TIPO_PATRIMONIO: "",
    },
    DESCRIPCION: "",
    FUENTE: "",
  };
};

const relevantesBoolean = boolean => {
  if (!boolean)
    return {
      DIAS_HORARIOS: {
        HORAS: "",
      },
    };
  return {
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
  };
};

const relevantes = (Calidad, boolean = false) => {
  if (Calidad === "PATRIMONIOS_INMATERIALES") return {};
  return {
    CARACTERISTICAS_RELEVANTES: {
      ...relevantesBoolean(boolean),
      ID_TIPO_CLIMA: "",
      TEMPERATURA: "",
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

const actividades = {
  ACTIVIDADES: {
    CULTURALES: "",
    ARTISTICAS: "",
    FISICAS: "",
    RECREATIVAS: "",
    OTROS: "",
  },
};

const servicios = Calidad => {
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

const promocion = {
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
};

const serviciosEspeciales = Calidad => {
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

const otros = {
  REDES: {
    PAGINA_WEB: "",
    FACEBOOK: "",
    TWITTER: "",
    INSTAGRAM: "",
    OTRA: "",
  },
  REF_BIBLIOGRAFICA: "",
  OBSERVACIONES: "",
};

const fieldInternacional = (Calidad, initial = false) => {
  if (Calidad !== "GRUPOS_ESPECIALES") return {};
  return {
    APRO_INTERNACIONAL: initial ? "false" : "",
  };
};

const funtionalData = data => JSON.parse(JSON.stringify(data));

export {
  dataCalidad,
  generalidades,
  caracteristicas,
  relevantes,
  actividades,
  servicios,
  promocion,
  serviciosEspeciales,
  otros,
  fieldInternacional,
  funtionalData,
};
