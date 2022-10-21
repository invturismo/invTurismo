import React from "react";
import {Toaster} from "react-hot-toast";
import {useSelector} from "react-redux";
import LoaderForm from "../MainLayout/ComponentsMainLayout/LoaderForm";
import {ImgAnimation, MainDiv} from "./StyleMainLayout";

const MainLoginLayout = ({children}) => {
  const loaderForm = useSelector(state => state.modalsSlice.loaderForm);
  return (
    <MainDiv>
      <div className="ContainerLeft">
        <ImgAnimation animate={{scale: [0.7, 1]}} transition={{duration: 0.5}}>
          <img src="/img/vectores/ImgLogin.svg" alt="login" />
        </ImgAnimation>
      </div>
      <main className="ContainerRight">{children}</main>
      {loaderForm && <LoaderForm />}
      <Toaster />
    </MainDiv>
  );
};

export default MainLoginLayout;
