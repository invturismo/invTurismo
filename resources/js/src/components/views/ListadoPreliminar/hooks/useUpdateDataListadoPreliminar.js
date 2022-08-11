import { useEffect, useState } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';

const useUpdateDataListadoPreliminar = (idListado) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        const body = { REGISTRO: idListado };
        const response = await helpHttp().post("listados-preliminares/update", {signal,body});
        console.log(response);
        if (!response.state) throw response;
        if (isMounted) setData(response);
      } catch (error) {
        console.log(error);
        if (isMounted) setData(error);
      }
    })();

    return () => {
      abortController.abort();
      isMounted = false;
    };
  }, [idListado]);

  return data;
}

export default useUpdateDataListadoPreliminar