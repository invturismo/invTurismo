import { helpCapitalize } from "../../../../helpers/helpCapitalize";
import { CLASIFICACION, CLASIFICADO, FESTIVIDADES, GRUPOS, INMATERIAL, LISTADO, MATERIAL, SINCLASIFICAR, SINCOMPLETAR, SITIOS } from "../../../router/paths";

const nameUrl = {
  1: ["Patrimonio cultural material", MATERIAL],
  2: ["Patrimonio cultural inmaterial", INMATERIAL],
  3: ["Festividades y eventos", FESTIVIDADES],
  4: ["Grupos de especial interes", GRUPOS],
  5: ["Sitios naturales", SITIOS],
};

export const helpUrl = ({
  ID_TIPO_PATRIMONIO,
  ID_TIPO_BIEN,
  NOMBRE,
  ID_RECURSO,
  ID_LISTADO,
}) => {
  const name = helpCapitalize(NOMBRE);
  const whoData = nameUrl[ID_TIPO_BIEN];
  if (ID_TIPO_PATRIMONIO)
    return [
      [name + " - " + whoData[0], `${whoData[1]}/completado/${ID_RECURSO}`],
    ];
  const urlArr = [];
  urlArr.push([
    name + " - " + "Listado preliminar",
    `${LISTADO}/${ID_LISTADO}`,
  ]);
  if (whoData) {
    urlArr.push([
      name + " - " + "Clasificacion recursos, Clasificado",
      `${CLASIFICACION}${CLASIFICADO}/${ID_LISTADO}`,
    ]);
    urlArr.push([
      name + " - " + whoData[0] + ", Sin completar",
      `${whoData[1]}${SINCOMPLETAR}/${ID_RECURSO}`,
    ]);
  } else
    urlArr.push([
      name + " - " + "Clasificacion recursos, Sin clasificar",
      `${CLASIFICACION}${SINCLASIFICAR}/${ID_LISTADO}`,
    ]);
  return urlArr;
};
