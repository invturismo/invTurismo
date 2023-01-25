import {helpErrors} from "../../../../helpers/helpErrors";

const templateCalidad = {
  PATRIMONIOS_MATERIALES: {
    ESTADO_CONSERVACION: [
      "PUNTAJES_VALORACION",
      "CALIDAD",
      "ESTADO_CONSERVACION",
    ],
    CONSTITUCION: ["PUNTAJES_VALORACION", "CALIDAD", "CONSTITUCION"],
    REPRESENTATIVIDAD: ["PUNTAJES_VALORACION", "CALIDAD", "REPRESENTATIVIDAD"],
  },
  PATRIMONIOS_INMATERIALES: {
    COLECTIVA: ["PUNTAJES_VALORACION", "CALIDAD", "COLECTIVA"],
    TRADICIONAL: ["PUNTAJES_VALORACION", "CALIDAD", "TRADICIONAL"],
    ANONIMA: ["PUNTAJES_VALORACION", "CALIDAD", "ANONIMA"],
    ESPONTANEA: ["PUNTAJES_VALORACION", "CALIDAD", "ESPONTANEA"],
    POPULAR: ["PUNTAJES_VALORACION", "CALIDAD", "POPULAR"],
  },
  FESTIVIDADES_EVENTOS: {
    ORGANIZACION: ["PUNTAJES_VALORACION", "CALIDAD", "ORGANIZACION"],
    B_SOCIOCULTURALES: ["PUNTAJES_VALORACION", "CALIDAD", "B_SOCIOCULTURALES"],
    B_ECONOMICOS: ["PUNTAJES_VALORACION", "CALIDAD", "B_ECONOMICOS"],
  },
  GRUPOS_ESPECIALES: {
    R_COSTUMBRES: ["PUNTAJES_VALORACION", "CALIDAD", "R_COSTUMBRES"],
  },
  SITIOS_NATURALES: {
    S_C_AIRE: ["PUNTAJES_VALORACION", "CALIDAD", "S_C_AIRE"],
    S_C_AGUA: ["PUNTAJES_VALORACION", "CALIDAD", "S_C_AGUA"],
    S_C_VISUAL: ["PUNTAJES_VALORACION", "CALIDAD", "S_C_VISUAL"],
    CONSERVACION: ["PUNTAJES_VALORACION", "CALIDAD", "CONSERVACION"],
    S_C_SONORA: ["PUNTAJES_VALORACION", "CALIDAD", "S_C_SONORA"],
    DIVERSIDAD: ["PUNTAJES_VALORACION", "CALIDAD", "DIVERSIDAD"],
    SINGULARIDAD: ["PUNTAJES_VALORACION", "CALIDAD", "SINGULARIDAD"],
  },
};

const templateErrors = who => ({
  ...templateCalidad[who],
  NOMBRE: ["GENERALIDADES", "NOMBRE"],
  UBICACION: ["GENERALIDADES", "UBICACION"],
  ID_TIPO_ACCESO: ["GENERALIDADES", "ID_TIPO_ACCESO"],
  GEORREFERENCIACION: ["GENERALIDADES", "GEORREFERENCIACION"],
  CORREGIMIENTO_VEREDA_LOCALIDAD: [
    "GENERALIDADES",
    "CORREGIMIENTO_VEREDA_LOCALIDAD",
  ],
  INDICACIONES_ACCESO: ["GENERALIDADES", "INDICACIONES_ACCESO"],
  NOMBRE_ADMIN: ["GENERALIDADES", "ADMIN/PROPIETARIOS", "NOMBRE"],
  DIRECCION_UBICACION: [
    "GENERALIDADES",
    "ADMIN/PROPIETARIOS",
    "DIRECCION_UBICACION",
  ],
  CORREO: ["GENERALIDADES", "ADMIN/PROPIETARIOS", "CORREO"],
  TELEFONO1: ["GENERALIDADES", "ADMIN/PROPIETARIOS", "TELEFONO1"],
  TELEFONO2: ["GENERALIDADES", "ADMIN/PROPIETARIOS", "TELEFONO2"],
  DESCRIPCION: ["CARACTERISTICAS", "DESCRIPCION"],
  IMAGEN1: ["CARACTERISTICAS", "IMAGEN1"],
  IMAGEN2: ["CARACTERISTICAS", "IMAGEN2"],
  FUENTE: ["CARACTERISTICAS", "FUENTE"],
  ID_DEPARTAMENTOS: ["CARACTERISTICAS", "CODIGOS", "ID_DEPARTAMENTOS"],
  ID_MUNICIPIOS: ["CARACTERISTICAS", "CODIGOS", "ID_MUNICIPIOS"],
  ID_ELEMENTO: ["CARACTERISTICAS", "CODIGOS", "ID_ELEMENTO"],
  ID_COMPONENTE: ["CARACTERISTICAS", "CODIGOS", "ID_COMPONENTE"],
  ID_GRUPO: ["CARACTERISTICAS", "CODIGOS", "ID_GRUPO"],
  ID_TIPO_PATRIMONIO: ["CARACTERISTICAS", "CODIGOS", "ID_TIPO_PATRIMONIO"],
  ID_SIGNIFICADO: ["PUNTAJES_VALORACION", "ID_SIGNIFICADO"],
  ID_ESTADO: ["CARACTERISTICAS_RELEVANTES", "ID_ESTADO"],
  ID_TIPO_CLIMA: ["CARACTERISTICAS_RELEVANTES", "ID_TIPO_CLIMA"],
  TEMPERATURA: ["CARACTERISTICAS_RELEVANTES", "TEMPERATURA"],
  HORAS: ["CARACTERISTICAS_RELEVANTES", "DIAS_HORARIOS", "HORAS"],
  NINOS: ["CARACTERISTICAS_RELEVANTES", "TARIFAS", "NINOS"],
  ADULTOS: ["CARACTERISTICAS_RELEVANTES", "TARIFAS", "ADULTOS"],
  ADULTO_MAYOR: ["CARACTERISTICAS_RELEVANTES", "TARIFAS", "ADULTO_MAYOR"],
  EXTRANJEROS: ["CARACTERISTICAS_RELEVANTES", "TARIFAS", "EXTRANJEROS"],
  ESTUDIANTES: ["CARACTERISTICAS_RELEVANTES", "TARIFAS", "ESTUDIANTES"],
  CITA_PREVIA: ["CARACTERISTICAS_RELEVANTES", "TARIFAS", "CITA_PREVIA"],
  GENERAL: ["CARACTERISTICAS_RELEVANTES", "TARIFAS", "GENERAL"],
  CULTURALES: ["ACTIVIDADES_SERVICIOS", "ACTIVIDADES", "CULTURALES"],
  ARTISTICAS: ["ACTIVIDADES_SERVICIOS", "ACTIVIDADES", "ARTISTICAS"],
  FISICAS: ["ACTIVIDADES_SERVICIOS", "ACTIVIDADES", "FISICAS"],
  RECREATIVAS: ["ACTIVIDADES_SERVICIOS", "ACTIVIDADES", "RECREATIVAS"],
  OTROS: ["ACTIVIDADES_SERVICIOS", "ACTIVIDADES", "OTROS"],
  TIENDAS: ["ACTIVIDADES_SERVICIOS", "SERVICIOS", "TIENDAS"],
  GUIAS: ["ACTIVIDADES_SERVICIOS", "SERVICIOS", "GUIAS"],
  BANOS: ["ACTIVIDADES_SERVICIOS", "SERVICIOS", "BANOS"],
  RESTAURANTES: ["ACTIVIDADES_SERVICIOS", "SERVICIOS", "RESTAURANTES"],
  PARQUEADERO: ["ACTIVIDADES_SERVICIOS", "SERVICIOS", "PARQUEADERO"],
  ALOJAMIENTO: ["ACTIVIDADES_SERVICIOS", "SERVICIOS", "ALOJAMIENTO"],
  OTROS1: ["ACTIVIDADES_SERVICIOS", "SERVICIOS", "OTROS"],
  FOLLETOS_GUIAS: ["PROMOCION", "FOLLETOS_GUIAS"],
  PUBLICACIONES: ["PROMOCION", "PUBLICACIONES"],
  TRIPADVISOR: ["PROMOCION", "TRIPADVISOR"],
  CTRAVEL: ["PROMOCION", "CTRAVEL"],
  GOOGLEM: ["PROMOCION", "GOOGLEM"],
  PAGINA_WEB: ["PROMOCION", "PAGINA_WEB"],
  YOUTUBE: ["PROMOCION", "YOUTUBE"],
  OTROS2: ["PROMOCION", "OTROS"],
  ASCENSORES: ["SERVICIOS_ESPECIALES", "ASCENSORES"],
  RAMPAS: ["SERVICIOS_ESPECIALES", "RAMPAS"],
  DISCAP_AUDITIVA: ["SERVICIOS_ESPECIALES", "DISCAP_AUDITIVA"],
  BANOS2: ["SERVICIOS_ESPECIALES", "BANOS"],
  MOVILIDAD: ["SERVICIOS_ESPECIALES", "MOVILIDAD"],
  OTROS3: ["SERVICIOS_ESPECIALES", "OTROS"],
  PAGINA_WEB2: ["OTROS", "REDES", "PAGINA_WEB"],
  FACEBOOK: ["OTROS", "REDES", "FACEBOOK"],
  TWITTER: ["OTROS", "REDES", "TWITTER"],
  INSTAGRAM: ["OTROS", "REDES", "INSTAGRAM"],
  OTRA: ["OTROS", "REDES", "OTRA"],
  REF_BIBLIOGRAFICA: ["OTROS", "REF_BIBLIOGRAFICA"],
  OBSERVACIONES: ["OTROS", "OBSERVACIONES"],
  APRO_INTERNACIONAL: ["OTROS", "APRO_INTERNACIONAL"],
});

export const errorsTransform = (data, who, initialErrors) => {
  helpErrors(data);
  const newErrors = JSON.parse(JSON.stringify(initialErrors)),
    {errors} = data;
  for (const key in errors) {
    let [v1, v2, v3] = templateErrors(who)[key];
    if (!v3) newErrors[v1][v2] = errors[v2];
    else newErrors[v1][v2][v3] = errors[v3];
  }
  return newErrors;
};
