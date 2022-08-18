import {
  closeLoaderForm,
  openLoaderForm,
  closeModalLayoutState,
} from "../../../../features/modalsSlice";
import { helpDeleteRegister } from "../../../../helpers/helpDeleteRegister";
import { helpLogout } from "../../../../helpers/helpLogout";
import { toastMs } from "../../../../helpers/helpToastMessage";
import { LOGIN } from "../../../router/paths";

export const handleFunctionsPopper = ({ dispatch,navigate,idRegister }) => {
  const handleClickLogout = async () => {
    dispatch(openLoaderForm());
    await helpLogout();
    dispatch(closeLoaderForm());
    navigate(LOGIN, { replace: true });
  };

  const handleClickDelete = async () => {
    console.log(idRegister);
    dispatch(openLoaderForm());
    const response = await helpDeleteRegister(idRegister);
    dispatch(closeLoaderForm());
    if(!response.state) return;
    dispatch(closeModalLayoutState());
    navigate("/usuarios", { replace: true });
    toastMs().success("El registro se elimino con exito");
  };

  return { handleClickLogout, handleClickDelete };
};
