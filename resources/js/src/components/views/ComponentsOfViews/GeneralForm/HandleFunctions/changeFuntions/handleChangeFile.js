import {
  closeLoadImage,
  openLoadImage,
  setUrlImage,
} from "../../../../../../features/imagesSlice";

export const handleChangeFiles = ({
  firstLevelErrors,
  dispatch,
  normalChange,
}) => {
  return e => {
    const {name, files} = e.target;
    let response = {errors: {}};
    if (!files[0].type.includes("image")) {
      response.errors[name] = "Solo puede subir imagenes";
      return firstLevelErrors("CARACTERISTICAS", response);
    }
    if (files[0].size / 1024 > 1024) {
      response.errors[name] = "El peso maximo de la imagen es de 1MB";
      return firstLevelErrors("CARACTERISTICAS", response);
    }
    const readerImage = new FileReader();
    readerImage.readAsDataURL(files[0]);
    dispatch(openLoadImage(name));
    readerImage.addEventListener("load", evt => {
      const {result} = evt.currentTarget;
      dispatch(closeLoadImage(name));
      dispatch(setUrlImage({[name]: result}));
      normalChange(name, files[0], "CARACTERISTICAS");
    });
  };
};
