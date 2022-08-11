import React from "react";
import useTittle from "../../../hooks/useTittle";
import FormLogin from "./Form/FormLogin";
import { ContainerLogin, LoginStyle } from "./StylesMainLogin";

const MainLogin = () => {
  useTittle("Login");

  return (
    <ContainerLogin>
      <LoginStyle animate={{ y: [100, 0] }} transition={{ duration: 0.5 }}>
        <div className="MainContent">
          <div className="ContainerImage">
            <img src="/img/logos/LogoLogin.svg" alt="login" />
          </div>
          <h2>Login</h2>
          <FormLogin />
        </div>
        <div className="ContainerWhiteBackground">
          <p>Terms & Conditions</p>
        </div>
      </LoginStyle>
    </ContainerLogin>
  );
};

export default MainLogin;
