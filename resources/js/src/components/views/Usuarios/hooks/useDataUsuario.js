import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {helpHttp} from "../../../../helpers/helpHttp";
import {toastMs} from "../../../../helpers/helpToastMessage";

const useDataUsuario = () => {
  const [response, setResponse] = useState(false);
  const [data, setData] = useState({});
  const [params] = useSearchParams();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        if (isMounted) setResponse(false);
        const body = {};
        if (params.has("buscar")) body.BUSCAR = params.get("buscar");
        const page = params.has("page") ? "?page=" + params.get("page") : "";
        const responseServe = await helpHttp().post("user-get" + page, {
          signal,
          body,
        });
        if (!responseServe.state) throw responseServe;
        if (isMounted) setData(responseServe);
      } catch (error) {
        if (isMounted) toastMs().error(error.message);
        if (isMounted) setData(error);
      } finally {
        if (isMounted) setResponse(true);
      }
    })();

    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, [params]);

  return {response, data};
};

export default useDataUsuario;
