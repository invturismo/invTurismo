import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from 'universal-cookie';
import { storeDataProfile } from "../features/dataProfileSlice";
import { helpDropCookies } from "../helpers/helpDropCookies";
import { helpHttp } from "../helpers/helpHttp";

const initialAuth = {
  state: 0,
  message: '' 
}

const useAuth = () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(initialAuth);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('accecs_token');
    (async () => {
      try {
        const data = await helpHttp().post("profile");
        if (data.status) throw data;
        if (!data.state) setAuth({ state: 1, message: data.message });
        else {
          const { PRIMER_NOMBRE, PRIMER_APELLIDO } = data.data;
          dispatch(storeDataProfile({ PRIMER_NOMBRE, PRIMER_APELLIDO }));
          setAuth({ state: 2, message: "" });
        };
      } catch (error) {
        if (token) {
          helpDropCookies();
        }
        setAuth({ state: 1, message: error.message });
      }
    })();
  }, []);
  
  return auth;
}

export default useAuth;