const dataCalidad = {
  PATRIMONIO_MATERIAL: {
    ESTADO_CONSERVACION: "",
    CONSTITUCION: "",
    REPRESENTATIVIDAD: "",
  },
};

export const initialErrorsGeneralForm = (Calidad) => ({
  GENERALIDADES: {
    GEORREFERENCIACION: "",
    ID_TIPO_ACCESO: "",
    INDICACIONES_ACCESO: "",
    CORREGIMIENTO_VEREDA_LOCALIDAD: "",
    NOMBRE: "",
    UBICACION: "",
    "ADMIN/PROPIETARIOS": {
      NOMBRE: "",
      DIRECCION_UBICACION: "",
      CORREO: "",
      TELEFONO1: "",
      TELEFONO2: "",
    },
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
  ACTIVIDADES_SERVICIOS: {
    ACTIVIDADES: {
      CULTURALES: "",
      ARTISTICAS: "",
      FISICAS: "",
      RECREATIVAS: "",
      OTROS: "",
    },
    SERVICIOS: {
      TIENDAS: "",
      GUIAS: "",
      BANOS: "",
      RESTAURANTES: "",
      PARQUEADERO: "",
      ALOJAMIENTO: "",
      OTROS: "",
    },
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
  SERVICIOS_ESPECIALES: {
    ASCENSORES: "",
    RAMPAS: "",
    DISCAP_AUDITIVA: "",
    BANOS: "",
    MOVILIDAD: "",
    OTROS: "",
  },
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
