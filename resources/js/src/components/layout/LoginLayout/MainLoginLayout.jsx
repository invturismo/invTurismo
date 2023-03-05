import React from "react";
import {Toaster} from "react-hot-toast";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ButtonPage from "../../common/ButtonPage";
import LoaderForm from "../MainLayout/ComponentsMainLayout/LoaderForm";
import {ImgAnimation, MainDiv} from "./StyleMainLayout";

const ConocenosLink = ({className}) => {
  return (
    <Link
      to="/conocenos"
      style={{
        all: "unset",
        cursor: "pointer",
        position: "absolute",
        top: "10px",
        left: "10px",
      }}
      className={className}
    >
      <ButtonPage colorButton="white" style={{backgroundColor: "#28254e"}}>
        Conocenos
      </ButtonPage>
    </Link>
  );
};

const MainLoginLayout = ({children}) => {
  const loaderForm = useSelector(state => state.modalsSlice.loaderForm);
  return (
    <MainDiv>
      <div className="ContainerLeft">
        <ImgAnimation animate={{scale: [0.7, 1]}} transition={{duration: 0.5}}>
          <img src="/img/vectores/ImgLogin.svg" alt="login" />
        </ImgAnimation>
        <ConocenosLink className="LinkConocenos" />
      </div>
      <main className="ContainerRight">
        <ConocenosLink className="LinkConocenos2" />
        {children}
      </main>
      {loaderForm && <LoaderForm />}
      <Toaster />
    </MainDiv>
  );
};

export default MainLoginLayout;
