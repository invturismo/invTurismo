import {useEffect, useState} from "react";
import {helpHttp} from "../../../../helpers/helpHttp";

//Funcion para enviar datos al servidor

const useRecordListadoPreliminar = idListado => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        const body = {ID_LISTADO: idListado};
        const response = await helpHttp().post("listados-preliminares", {
          signal,
          body,
        });
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
  }, [idListado]);

  return data;
};

export default useRecordListadoPreliminar;
