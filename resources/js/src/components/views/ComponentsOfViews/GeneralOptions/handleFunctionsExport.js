import {
  closeLoaderForm,
  openLoaderForm,
} from "../../../../features/modalsSlice";
import {helpHttp} from "../../../../helpers/helpHttp";
import {toastMs} from "../../../../helpers/helpToastMessage";

export const handleFunctionsExport = ({
  setData,
  setFilter,
  filter,
  dispatch,
  initialFilter,
  setTextFilter,
  textFilter,
  url,
}) => {
  //Funcion para enviar la consulta de que datos desea exportar
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch(openLoaderForm());
      const body = filter;
      const response = await helpHttp().post("export/" + url, {
        body,
      });
      dispatch(closeLoaderForm());
      if (!response.state) toastMs().error(response.message);
      setTextFilter({...textFilter, ...filter});
      setFilter(initialFilter);
      setData(response.data);
    } catch (error) {
      toastMs().error(error.message);
    }
  };

  const handleChange = e => {
    if (e.target.name === "ID_DEPARTAMENTOS") {
      const valueMunicipio = {ID_MUNICIPIOS: ""};
      if (e.target.value === "11") valueMunicipio.ID_MUNICIPIOS = "001";
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
        ...valueMunicipio,
      });
    } else setFilter({...filter, [e.target.name]: e.target.value});
  };

  return {handleSubmit, handleChange};
};
