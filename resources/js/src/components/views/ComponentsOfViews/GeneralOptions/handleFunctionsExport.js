import { closeLoaderForm, openLoaderForm } from "../../../../features/modalsSlice";
import { helpHttp } from "../../../../helpers/helpHttp";
import { toastMs } from "../../../../helpers/helpToastMessage";

export const handleFunctionsExport = ({ setData, setFilter, filter, dispatch }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(openLoaderForm());
      const response = await helpHttp().post("export/listado-preliminar");
      dispatch(closeLoaderForm());
      if (!response.state) toastMs().error(response.message);
      setData(response.data);
    } catch (error) {
      toastMs().error(error.message);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "ID_DEPARTAMENTOS") {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
        ID_MUNICIPIOS: "",
      });
    } else setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return { handleSubmit, handleChange };
};
