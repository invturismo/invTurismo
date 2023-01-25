import {useEffect, useState} from "react";
import {helpHttp} from "../../../../helpers/helpHttp";

//Funcion para enviar datos al servidor

const useUpdateDataListadoPreliminar = idListado => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        const body = {REGISTRO: idListado};
        const response = await helpHttp().post("listados-preliminares/update", {
          signal,
          body,
        });
<<<<<<< HEAD
        console.log(response);
=======
>>>>>>> 98a7f589723d6c4daed4ea88d3e958a0ba602a92
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

export default useUpdateDataListadoPreliminar;
