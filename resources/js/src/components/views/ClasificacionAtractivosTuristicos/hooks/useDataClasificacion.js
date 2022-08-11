import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { helpHttp } from "../../../../helpers/helpHttp";
import { toastMs } from "../../../../helpers/helpToastMessage";

const useDataClasificacion = (url) => {
  const [response, setResponse] = useState(false);
  const [data, setData] = useState([]);
  const [params] = useSearchParams();
  const dataFilter = useSelector((state) => state.filterSlice.dataFilter);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        if (isMounted) setResponse(false);
        const body = {};
        if (dataFilter.ID_DEPARTAMENTOS)
          body.ID_DEPARTAMENTOS = dataFilter.ID_DEPARTAMENTOS;
        if (dataFilter.ID_MUNICIPIOS)
          body.ID_MUNICIPIOS = dataFilter.ID_MUNICIPIOS;
        if (params.has("buscar")) body.BUSCAR = params.get("buscar");
        const page = params.has("page") ? "?page=" + params.get("page") : "";
        const responseServe = await helpHttp().post(
          "clasificacion-recursos-atractivos/" + url + page,
          {
            signal,
            body,
          }
        );
        console.log(responseServe);
        if (!responseServe.state) throw responseServe;
        if (isMounted) setData(responseServe);
      } catch (error) {
        console.log(error);
        if (isMounted) toastMs().error(error.message);
      } finally {
        if (isMounted) setResponse(true);
      }
    })();

    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, [params, dataFilter]);

  return { response, data };
};

export default useDataClasificacion;
