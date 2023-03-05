const PRODUCTION = true;
const LOCALPATH = "127.0.0.1:8000";
const PRODUCTIONPATH = "invturismo.jptecnologia.com";
export const API = `${window.location.protocol}//${
  PRODUCTION ? PRODUCTIONPATH : LOCALPATH
}/api/`;
export const DOMAIN = `${window.location.protocol}//${
  PRODUCTION ? PRODUCTIONPATH : LOCALPATH
}/`;
export const HOME = "/";
export const LOGIN = "/inicio-sesion";
export const CREAR = "/crear";
export const LISTADO = "/listado-preliminar";
export const CLASIFICACION = "/clasificacion-recursos-atractivos";
export const MATERIAL = "/patrimonio-material";
export const INMATERIAL = "/patrimonio-inmaterial";
export const FESTIVIDADES = "/festividades-eventos";
export const GRUPOS = "/grupos-especial-interes";
export const SITIOS = "/sitios-naturales";
export const USUARIOS = "/usuarios";
export const BUSCAR = "/buscar";
export const EXPORTS = "/exportar";
export const CLASIFICADO = "/clasificado";
export const SINCLASIFICAR = "/sin-clasificar";
export const ACTUALIZAR = "/actualizar";
export const COMPLETADO = "/completado";
export const SINCOMPLETAR = "/sin-completar";
export const REGISTRAR = "/registrar";
export const CAMBIARCLAVE = "/cambiar-clave";
export const CUADRORESUMEN = "/cuadro-resumen";
export const CONOCENOS = "/conocenos";
