const arrayHeader = [
  { label: "N°", key: "ID" },
  { label: "Nombre", key: "NOMBRE" },
  { label: "Departamento", key: "DEPARTAMENTO" },
  { label: "Municipio", key: "MUNICIPIO" },
  { label: "Código", key: "CODIGO" },
  { label: "Calificación", key: "CALIFICACION" },
  { label: "Ubicación", key: "UBICACION" },
  { label: "Georreferenciación", key: "GEORREFERENCIACION" },
  { label: "Fecha", key: "FECHA_MOVIMIENTO" },
  { label: "Diligenciado por", key: "USUARIO" },
];

export const headersExcel = {
  "Listado-Preliminar": [
    { label: "N°", key: "ID_LISTADO" },
    { label: "Nombre", key: "NOMBRE" },
    { label: "Ubicación", key: "UBICACION" },
    { label: "Departamento", key: "DEPARTAMENTO" },
    { label: "Municipio", key: "MUNICIPIO" },
    { label: "Fuente", key: "FUENTE" },
    { label: "Fecha", key: "FECHA_MOVIMIENTO" },
    { label: "Diligenciado por", key: "USUARIO" },
  ],
  "Clasificacion-Recuros-Atractivos": [
    { label: "N°", key: "ID_LISTADO" },
    { label: "Nombre", key: "NOMBRE" },
    { label: "Departamento", key: "DEPARTAMENTO" },
    { label: "Municipio", key: "MUNICIPIO" },
    { label: "Tipo de bien", key: "TIPO_BIEN" },
    { label: "Formulario", key: "Formulario" },
    { label: "Fecha", key: "FECHA_MOVIMIENTO" },
    { label: "Diligenciado por", key: "USUARIO" },
  ],
  "Patrimonios-materiales": arrayHeader,
  "Patrimonios-inmateriales": arrayHeader,
  "Grupos-especial-interes": arrayHeader,
  "Grupos-especial-interes": arrayHeader,
  "Sitios-naturales": arrayHeader,
  "Festividades-eventos": arrayHeader,
  "Cuadro-resumen": arrayHeader.concat([
    { label: "Tipo de bien", key: "TIPO_BIEN" },
  ]),
};