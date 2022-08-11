const validateOthers = (others, page) => {
  if (!others || !others.links || others.links.length === 0) return [];
  let dataOthers = JSON.parse(JSON.stringify(others)),
    links = dataOthers.links,
    finish = 0,
    dataArray = [],
    position = 0;
  links.splice(0, 1);
  links.splice(-1, 1);
  finish = Math.ceil(links.length / 5);
  for (let i = 0; i < finish; i++) dataArray.push([]);
  links.forEach((val) => {
    dataArray[position].push(val);
    position = Math.trunc(val.label / 5);
  });
  if (!page) return dataArray[0];
  if (page >= links.length) return dataArray[dataArray.length - 1];
  if (page % 5 === 0) return dataArray[Math.trunc(page / 5) - 1];
  return dataArray[Math.trunc(page / 5)];
};

export { validateOthers };