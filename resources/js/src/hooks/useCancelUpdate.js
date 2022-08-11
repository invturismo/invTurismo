import { useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { toastMs } from "../helpers/helpToastMessage";

const useCancelUpdate = (response) => {
  useEffect(() => {
    return () => {
      if (!response) return false;
      if (!response.state) return false;
      setTimeout(async () => {
        try {
          const response = await helpHttp().del("cancel-update");
          console.log(response, "del");
          if (!response.state) throw response;
        } catch (error) {
          if(error.status === 401) return;
          toastMs().error('Error al cancelar la actualizacion');
        }
      }, 500);
    };
  });
}

export default useCancelUpdate