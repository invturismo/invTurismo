const objectPages = (path, page, active) => ({
  url: `${path}?page=${page}`,
  label: page,
  active: active == page,
});

//Funcion para generar los links de la paginacion de la app
const validateOthers = (others, page) => {
  if (!others || !others.links || others.links.length === 0) return [];
  let dataOthers = JSON.parse(JSON.stringify(others)),
    links = dataOthers.last_page,
    finish = 0,
    dataArray = [],
    position = 0;
  finish = Math.ceil(links / 5);
  for (let i = 0; i < finish; i++) dataArray.push([]);
  for (let j = 0; j < links; j++) {
    let linkPage = objectPages(dataOthers.path, j + 1, dataOthers.current_page);
    dataArray[position].push(linkPage);
    if (dataArray[position].length == 5) position++;
  }
  if (!page) return dataArray[0];
  if (page >= links) return dataArray[dataArray.length - 1];
  if (page % 5 === 0) return dataArray[Math.trunc(page / 5) - 1];
  return dataArray[Math.trunc(page / 5)];
};

export {validateOthers};
