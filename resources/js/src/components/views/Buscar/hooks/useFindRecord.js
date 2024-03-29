import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {helpHttp} from "../../../../helpers/helpHttp";

//Peticion al servidor para obtener resultados de la busqueda del usuario

const useFindRecord = find => {
  const [response, setResponse] = useState(false);
  const [data, setData] = useState([]);
  const [params] = useSearchParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        if (isMounted) setResponse(false);
        const body = {BUSCAR: find};
        const page = params.has("page") ? "?page=" + params.get("page") : "";
        const responseServe = await helpHttp().post("find" + page, {
          signal,
          body,
        });
        if (!responseServe.state) throw responseServe;
        if (isMounted) setData(responseServe);
      } catch (error) {
        if (isMounted) toastMs().error(error.message);
      } finally {
        if (isMounted) setResponse(true);
      }
    })();

    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, [find, params]);

  return {data, response};
};

export default useFindRecord;
