import { helpCapitalize } from "../../../../helpers/helpCapitalize";

const nameUrl = {
  1: ["Patrimonio cultural material", "patrimonio-material"],
  2: ["Patrimonio cultural inmaterial", "patrimonio-inmaterial"],
  3: ["Festividades y eventos", "festividades-eventos"],
  4: ["Grupos de especial interes", "grupos-especial-interes"],
  5: ["Sitios naturales", "sitios-naturales"],
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
      [name + " - " + whoData[0], `/${whoData[1]}/completado/${ID_RECURSO}`],
    ];
  const urlArr = [];
  urlArr.push([
    name + " - " + "Listado preliminar",
    `/listado-preliminar/${ID_LISTADO}`,
  ]);
  if (whoData) {
    urlArr.push([
      name + " - " + "Clasificacion recursos, Clasificado",
      `/clasificacion-recursos-atractivos/clasificado/${ID_LISTADO}`,
    ]);
    urlArr.push([
      name + " - " + whoData[0] + ", Sin completar",
      `/${whoData[1]}/sin-completar/${ID_RECURSO}`,
    ]);
  } else
    urlArr.push([
      name + " - " + "Clasificacion recursos, Sin clasificar",
      `/clasificacion-recursos-atractivos/sin-clasificar/${ID_LISTADO}`,
    ]);
  return urlArr;
};
