import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import useResponsive from '../../../hooks/useResponsive';
import HeaderMovil from './ComponentsMainLayout/HeaderMovil';
import Navbar from './Navbar/Navbar';
import { useDispatch, useSelector } from "react-redux";
import { StyleLeandingLayout } from './StyleLeadingLayout';
import { closeMenu } from '../../../features/mainLayoutSlice';
import ModalLogout from '../../common/ModalLogout';
import { AnimatePresence } from 'framer-motion';
import HeaderDesktop from './ComponentsMainLayout/HeaderDesktop';
import { Toaster } from "react-hot-toast";
import LoaderForm from './ComponentsMainLayout/LoaderForm';

const MovileLeandingLayout = () => {
  const menuState = useSelector((state) => state.mainLayoutSlice.menuState);
  const dispatch = useDispatch();

  return (
    <>
      <HeaderMovil />
      <AnimatePresence>{menuState && <Navbar movile={true} />}</AnimatePresence>
      {menuState && (
        <div
          className="backgroungMenuMovile"
          onClick={() => dispatch(closeMenu())}
        />
      )}
    </>
  );
}

const LeadingLayout = () => {
  const movile = useResponsive(0,783);
  const desktop = useResponsive(783);
  const modalLayoutState = useSelector(
    (state) => state.modalsSlice.modalLayoutState
  );
  const loaderForm = useSelector((state) => state.modalsSlice.loaderForm);

  return (
    <StyleLeandingLayout resize={{ movile: movile, desktop: desktop }}>
      {movile && <MovileLeandingLayout />}
      {desktop && <Navbar desktop={true} />}
      {desktop && <HeaderDesktop />}
      <main>
        <Outlet />
      </main>
      {modalLayoutState && <ModalLogout />}
      {loaderForm && <LoaderForm/>}
      <Toaster />
    </StyleLeandingLayout>
  );
}

export default LeadingLayout;