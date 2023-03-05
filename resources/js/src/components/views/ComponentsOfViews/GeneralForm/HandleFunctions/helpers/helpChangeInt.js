//Ayuda a cambiar a un numero entero el valor que pase el usuario
export const helpChangeInt = number =>
  isNaN(parseInt(number)) ? 0 : parseInt(number);
