import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {LOGIN} from "../components/router/paths";
import {storeDataProfile} from "../features/dataProfileSlice";
import {
  closeLoaderForm,
  closeModalLayoutState,
  openLoaderForm,
  openModalLayoutState,
} from "../features/modalsSlice";
import {helpAddTimeSession} from "../helpers/helpAddTimeSession";
import {helpDropCookies} from "../helpers/helpDropCookies";
import {helpHttp} from "../helpers/helpHttp";

const initialAuth = {
  state: 0,
  message: "",
};

//Funcion para generar cuadro de dialogo y confirmar si desea seguir en sesion (Se ejecuta cada hora)
const execTimeOut = (dispatch, navigate) => {
  const cancelSession = setTimeout(() => {
    navigate(LOGIN);
    dispatch(closeModalLayoutState());
  }, 1000 * 60 + 1000);
  const handleFunction = async () => {
    clearTimeout(cancelSession);
    dispatch(openLoaderForm());
    const response = await helpAddTimeSession();
    dispatch(closeLoaderForm());
    dispatch(closeModalLayoutState());
    if (!response.state) return navigate(LOGIN);
    setTimeout(() => execTimeOut(dispatch, navigate), 1000 * 60 * 60);
  };
  const dataPayload = {
    textMessage1: "Por seguridad la sesion se cierra cada hora",
    textMessage2: "¿Quieres seguir en sesion?",
    textButton: "Aceptar",
    srcImg: "svgWarning",
    handleFunction,
    noButton: true,
  };
  dispatch(openModalLayoutState(dataPayload));
};

//Funcion para consultar si el usuario esta actualmente en sesion
const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(initialAuth);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("accecs_token");
    (async () => {
      try {
        const data = await helpHttp({profile: true}).post("profile");
        if (data.status) throw data;
        if (!data.state) return setAuth({state: 1, message: data.message});
        const {PRIMER_NOMBRE, PRIMER_APELLIDO} = data.data;
        dispatch(storeDataProfile({PRIMER_NOMBRE, PRIMER_APELLIDO}));
        setAuth({state: 2, message: ""});
        setTimeout(() => execTimeOut(dispatch, navigate), 1000 * 60 * 60);
      } catch (error) {
        if (token) helpDropCookies();
        setAuth({state: 1, message: error.message});
      }
    })();
  }, []);

  return auth;
};

export default useAuth;
