const helpErrors = (data) => {
  Object.entries(data.errors).forEach(
    (val) => (data.errors[val[0]] = val[1].join(""))
  );
}

export {helpErrors};