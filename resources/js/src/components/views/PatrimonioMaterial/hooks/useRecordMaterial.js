import { useEffect, useState } from 'react';
import { helpHttp } from '../../../../helpers/helpHttp';

const useRecordMaterial = (REGISTRO,url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isMounted = true;

    (async () => {
      try {
        const body = { REGISTRO };
        const response = await helpHttp().post(
          "patrimonios-materiales/" + url,
          {
            signal,
            body,
          }
        );
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
  }, []);

  return data;
};

export default useRecordMaterial;