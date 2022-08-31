export const helpWhoData = (array,data,id) => {
  let newArray = array.filter((val) => val[id] == data[id]);
  return newArray[0];
}