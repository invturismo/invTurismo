//Funcion para convertir la primera letra de un string en mayuscula
export const helpCapitalize = text => {
  if (!text) return "";
  return text[0].toUpperCase() + text.slice(1).toLocaleLowerCase();
};
