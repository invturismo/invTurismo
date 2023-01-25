import {useEffect, useState} from "react";
import {helpHttp} from "../../../../helpers/helpHttp";

const useRecordClasificacion = (REGISTRO, url, ACTUALIZANDO) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        const body = {REGISTRO};
        if (ACTUALIZANDO) body.ACTUALIZANDO = ACTUALIZANDO;
        const response = await helpHttp().post(
          "clasificacion-recursos-atractivos/" + url,
          {
            signal,
            body,
          }
        );
        if (!response.state) throw response;
        if (isMounted) setData(response);
      } catch (error) {
        if (isMounted) setData(error);
      }
    })();

    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, []);

  return data;
};

export default useRecordClasificacion;
