import * as yup from "yup";

const messageRequire = "El campo es obligatorio";
const messageEmail = "No es un email";
const messageTelefono = "No es un telefono valido";
const messageTarifa = "El valor no es valido";
const messageCalidad = (text) =>
  `El numero no es valido debe ser entre 0 y ${text}`;
const maxMessage = (text) => `No puede superar ${text} caracteres`;

const testTelefono = (value) => {
  if (!value) return true;
  return /^\d{5,10}$/g.test(value);
};
const testCalidad = (value, max) => {
  if (!value) return true;
  if (isNaN(parseInt(value))) return false;
  let number = parseInt(value);
  return number >= 0 && number <= max;
};
const testTarifa = (value) => {
  if (!value) return true;
  return /^\d+$/g.test(value);
};

const yupMaxAndReq = (max) =>
  yup.string().required(messageRequire).max(max, maxMessage(max));
const yupTelefono = () =>
  yup.string().test({
    test: testTelefono,
    message: messageTelefono,
  });
const yupMax = (max) => yup.string().max(max, maxMessage(max));
const yupCalidad = (max) =>
  yup
    .string()
    .required(messageRequire)
    .test({
      test: (v) => testCalidad(v, max),
      message: messageCalidad(max),
    });
const yupTarifa = () =>
  yup.string().test({
    test: testTarifa,
    message: messageTarifa,
  });

const schemaCalidad = {
  PATRIMONIO_MATERIAL: {
    ESTADO_CONSERVACION: yupCalidad(21),
    CONSTITUCION: yupCalidad(21),
    REPRESENTATIVIDAD: yupCalidad(28),
  },
};

const schemaGeneralidades = {
  GEORREFERENCIACION: yupMaxAndReq(50),
  ID_TIPO_ACCESO: yupMaxAndReq(1),
  INDICACIONES_ACCESO: yupMax(300),
  NOMBRE: yupMaxAndReq(200),
  UBICACION: yupMaxAndReq(200),
};

const schemaAdminPropietarios = {
  NOMBRE: yupMaxAndReq(200),
  DIRECCION_UBICACION: yupMaxAndReq(200),
  CORREO: yup.string().email(messageEmail).max(200, maxMessage(200)),
  TELEFONO1: yupTelefono(),
  TELEFONO2: yupTelefono(),
};

const schemaCaracteristicas = {
  DESCRIPCION: yupMax(300),
  IMAGEN1: yup.mixed().required(messageRequire),
  IMAGEN2: yup.mixed().required(messageRequire),
  FUENTE: yupMaxAndReq(200),
};

const schemaCodigo = {
  ID_MUNICIPIOS: yupMaxAndReq(3),
  ID_DEPARTAMENTOS: yupMaxAndReq(2),
  ID_ELEMENTO: yupMaxAndReq(2),
  ID_COMPONENTE: yupMaxAndReq(2),
  ID_GRUPO: yupMaxAndReq(2),
  ID_TIPO_PATRIMONIO: yupMaxAndReq(1),
};

const schemaPuntajes = {
  ID_SIGNIFICADO: yupMaxAndReq(1),
};

const schemaCaracteristicasRelevantes = {
  ID_TIPO_CLIMA: yupMax(1),
  TEMPERATURA: yupMax(4),
  ID_ESTADO: yupMax(1),
};

const schemaDiasHorarios = {
  HORAS: yupMax(300),
};

const schemaTarifas = {
  NINOS: yupTarifa(),
  ADULTOS: yupTarifa(),
  ADULTO_MAYOR: yupTarifa(),
  EXTRANJEROS: yupTarifa(),
  ESTUDIANTES: yupTarifa(),
  CITA_PREVIA: yupTarifa(),
  GENERAL: yupTarifa(),
};

const schemaActividades = {
  CULTURALES: yupMax(300),
  ARTISTICAS: yupMax(300),
  FISICAS: yupMax(300),
  RECREATIVAS: yupMax(300),
  OTROS: yupMax(300),
};

const schemaServicios = {
  TIENDAS: yupMax(300),
  GUIAS: yupMax(300),
  BANOS: yupMax(300),
  RESTAURANTES: yupMax(300),
  PARQUEADERO: yupMax(300),
  ALOJAMIENTO: yupMax(300),
  OTROS: yupMax(300),
};

const schemaPromocion = {
  FOLLETOS_GUIAS: yupMax(300),
  PUBLICACIONES: yupMax(300),
  TRIPADVISOR: yupMax(300),
  CTRAVEL: yupMax(300),
  GOOGLEM: yupMax(300),
  PAGINA_WEB: yupMax(300),
  YOUTUBE: yupMax(300),
  OTROS: yupMax(300),
};

const schemaServiciosEspeciales = {
  ASCENSORES: yupMax(300),
  RAMPAS: yupMax(300),
  DISCAP_AUDITIVA: yupMax(300),
  BANOS: yupMax(300),
  MOVILIDAD: yupMax(300),
  OTROS: yupMax(300),
};

const schemaOtros = {
  REF_BIBLIOGRAFICA: yupMax(300),
  OBSERVACIONES: yupMax(300),
};

const schemaRedes = {
  PAGINA_WEB: yupMax(300),
  FACEBOOK: yupMax(300),
  TWITTER: yupMax(300),
  INSTAGRAM: yupMax(300),
  OTRA: yupMax(300),
};

const unitValidateTemplate = (who) => ({
  GENERALIDADES: {
    ...schemaGeneralidades,
    "ADMIN/PROPIETARIOS": schemaAdminPropietarios,
  },
  CARACTERISTICAS: {
    ...schemaCaracteristicas,
    CODIGOS: schemaCodigo,
  },
  PUNTAJES_VALORACION: {
    ...schemaPuntajes,
    CALIDAD: schemaCalidad[who],
  },
  CARACTERISTICAS_RELEVANTES: {
    ...schemaCaracteristicasRelevantes,
    DIAS_HORARIOS: schemaDiasHorarios,
    TARIFAS: schemaTarifas,
  },
  ACTIVIDADES_SERVICIOS: {
    ACTIVIDADES: schemaActividades,
    SERVICIOS: schemaServicios,
  },
  PROMOCION: schemaPromocion,
  SERVICIOS_ESPECIALES: schemaServiciosEspeciales,
  OTROS: {
    ...schemaOtros,
    REDES: schemaRedes,
  },
});

const schemaGeneral = (who) =>
  yup.object({
    GENERALIDADES: yup.object({
      ...schemaGeneralidades,
      "ADMIN/PROPIETARIOS": yup.object(schemaAdminPropietarios),
    }),
    CARACTERISTICAS: yup.object({
      ...schemaCaracteristicas,
      CODIGOS: yup.object(schemaCodigo),
    }),
    PUNTAJES_VALORACION: yup.object({
      ...schemaPuntajes,
      CALIDAD: yup.object(schemaCalidad[who]),
    }),
    CARACTERISTICAS_RELEVANTES: yup.object({
      ...schemaCaracteristicasRelevantes,
      DIAS_HORARIOS: yup.object(schemaDiasHorarios),
      TARIFAS: yup.object(schemaTarifas),
    }),
    ACTIVIDADES_SERVICIOS: yup.object({
      ACTIVIDADES: yup.object(schemaActividades),
      SERVICIOS: yup.object(schemaServicios),
    }),
    PROMOCION: yup.object(schemaPromocion),
    SERVICIOS_ESPECIALES: yup.object(schemaServiciosEspeciales),
    OTROS: yup.object({
      ...schemaOtros,
      REDES: yup.object(schemaRedes),
    }),
  });

export { schemaGeneral, unitValidateTemplate };
