export const changeNullValues = (data) => {
  for (const key in data) if(data[key] === null) data[key] = "";
  return data;
}