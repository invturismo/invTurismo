import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { closeModalLayoutState } from '../../features/modalsSlice';
import { helpLogout } from "../../helpers/helpLogout";
import { LOGIN } from '../router/paths';
import ButtonPage from './ButtonPage';

const StyleModalLogout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: grid;
  place-items: center center;
  z-index: 51;
  .backgroundModal {
    position: absolute;
    inset: 0;
    z-index: 1;
    background-color: #000000ba;
  }
`;

const MainModalLogout = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .ContainerButtons{
    display: flex;
    justify-content: space-between;
  }
`;

const ModalLogout = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {  
    return () => {
      dispatch(closeModalLayoutState());
    }
  }, []);
  

  const handleClickLogout = async () => {
    await helpLogout();
    navigate(LOGIN, { replace: true });
  }

  return (
    <StyleModalLogout>
      <div
        className="backgroundModal"
        onClick={() => dispatch(closeModalLayoutState())}
      />
      <MainModalLogout
        initial={{scale:0.8}}
        animate={{ scale: [0.8, 1] }}
        transition={{ duration: 0.3 }}
      >
        <p>Esta seguro que desea cerrar sesion?</p>
        <div className="ContainerButtons">
          <span onClick={() => handleClickLogout()}>
            <ButtonPage colorButton="green">SI</ButtonPage>
          </span>
          <span onClick={() => dispatch(closeModalLayoutState())}>
            <ButtonPage colorButton="red">NO</ButtonPage>
          </span>
        </div>
      </MainModalLogout>
    </StyleModalLogout>
  );
}

export default ModalLogout