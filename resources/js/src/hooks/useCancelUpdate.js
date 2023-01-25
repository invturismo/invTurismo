import {useEffect} from "react";
import {helpHttp} from "../helpers/helpHttp";

const useCancelUpdate = response => {
  useEffect(() => {
    return () => {
      if (!response) return false;
      if (!response.state) return false;
      setTimeout(async () => {
        try {
          const response = await helpHttp().del("cancel-update");
          if (!response.state) throw response;
        } catch (error) {
          if (error.status === 401) return;
        }
      }, 500);
    };
  });
};

export default useCancelUpdate;
