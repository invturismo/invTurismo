export const helpDropNull = (obj) => {
  let data = Object.entries(obj);
  data = data.map(val=>val[1]?val:[val[0],""]);
  return Object.fromEntries(data);
}