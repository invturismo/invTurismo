import React from "react";

const whoObject = {
  TARIFAS: {
    NINOS: "Niños",
    ADULTOS: "Adultos",
    ADULTO_MAYOR: "Adulto mayor",
    EXTRANJEROS: "Extranjeros",
    ESTUDIANTES: "Estiduantes",
    CITA_PREVIA: "Cita previa",
    GENERAL: "General",
  },
  ACTIVIDADES: {
    CULTURALES: "Culturales",
    ARTISTICAS: "Artisticas",
    FISICAS: "Fisicas",
    RECREATIVAS: "Recreativas",
    OTROS: "Otros",
  },
  SERVICIOS: {
    TIENDAS: "Tiendas",
    GUIAS: "Guías",
    BANOS: "Baños",
    RESTAURANTES: "Restaurantes",
    PARQUEADERO: "Parqueadero",
    ALOJAMIENTO: "Alojamiento",
    OTROS: "Otros",
  },
  PROMOCION: {
    FOLLETOS_GUIAS: "Folletos o guías",
    PUBLICACIONES: "Publicaciones",
    TRIPADVISOR: "TripAdvisor",
    CTRAVEL: "Colombia travel",
    GOOGLEM: "Google Maps",
    PAGINA_WEB: "Página web",
    YOUTUBE: "Youtube",
    OTROS: "Otros",
  },
  SERVICIOS_ESPECIALES: {
    ASCENSORES: "Ascensores",
    RAMPAS: "Rampas",
    DISCAP_AUDITIVA: "Sistema de discapacidad auditiva",
    BANOS: "Baños",
    MOVILIDAD: "Elementos de movilidad",
    OTROS: "Otros",
  },
  REDES: {
    PAGINA_WEB: "Página web",
    FACEBOOK: "Facebook",
    TWITTER: "Twitter",
    INSTAGRAM: "Instagram",
    OTRA: "Otros",
  },
};

const convertObject = (values, parent) => {
  let finalArray = [];
  for (const key in values) {
    finalArray.push([whoObject[parent][key], values[key]]);
  }
  return finalArray;
};

const TableInformation = ({data, parent}) => {
  return (
    <div className="TableInformation">
      {convertObject(data, parent).map(val => (
        <div key={parent + val[0]} className="RowInformation">
          <div>
            <span className="titleRow">{val[0]}</span>
          </div>
          <div>
            <span className="contentRow">{val[1] || "-"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableInformation;
