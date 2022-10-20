export const helpChangeInt = number =>
  isNaN(parseInt(number)) ? 0 : parseInt(number);
