export const formDataTransform = (values,who) => {
  const valuesFormData = new Map(),
    arrVall = {
      OTROS: who === 2 ? 1 : 0,
      BANOS: 1,
      PAGINA_WEB: 1,
    };

  const hasValue = (val, values) => {
    if (valuesFormData.has(val) && val === "NOMBRE")
      return valuesFormData.set("NOMBRE_ADMIN", values[val]);
    if (valuesFormData.has(val)) {
      arrVall[val] += 1;
      let key = val + arrVall[val];
      return valuesFormData.set(key, values[val]);
    }
    valuesFormData.set(val, values[val]);
  };

  const exploreArray = (values) => {
    for (let val in values) {
      if (
        typeof values[val] === "object" &&
        !(val === "IMAGEN1" || val === "IMAGEN2")
      )
        exploreArray(values[val]);
      else hasValue(val, values);
    }
  };

  exploreArray(values);
  const formData = new FormData();
  valuesFormData.forEach((val,key) => {
    formData.append(key,val);
  });
  
  return formData;
};
