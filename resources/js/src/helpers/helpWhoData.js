//Funcion para descartar valores de un array
export const helpWhoData = (array, data, id) => {
  let newArray = array.filter(val => val[id] == data[id]);
  return newArray[0];
};
