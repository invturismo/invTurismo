import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalLayoutState } from '../../../../features/modalsSlice';
import { MainModalPopper, StyleModalPopper } from './StyleModalPopper';
import { AnimatePresence, motion } from "framer-motion";

const ModalPopper = () => {
  const dispatch = useDispatch();
  const {
    textMessage1,
    textMessage2,
    textButton,
    srcImg,
    handleFunction,
  } = useSelector((state) => state.modalsSlice.dataModalPopper);
  const modalLayoutState = useSelector(
    (state) => state.modalsSlice.modalLayoutState
  );

  useEffect(() => {
    return () => {
      dispatch(closeModalLayoutState());
    };
  }, []);

  return (
    <AnimatePresence>
      {modalLayoutState && (
        <StyleModalPopper>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="backgroundModal"
            onClick={() => dispatch(closeModalLayoutState())}
          />
          <MainModalPopper
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <div className="body">
              <div className="text">
                <img src={`/img/iconsGeneral/${srcImg}.svg`} alt="delete" />
                <div>
                  <span>{textMessage1}</span>
                  <span className="bold">{textMessage2}</span>
                </div>
              </div>
            </div>
            <div className="footer">
              <div className="container">
                <button
                  className="bttn button-outline"
                  onClick={() => dispatch(closeModalLayoutState())}
                >
                  no, cancelar
                </button>
                <button
                  className="bttn button-inline"
                  onClick={() => handleFunction()}
                >
                  si, {textButton}
                </button>
              </div>
            </div>
          </MainModalPopper>
        </StyleModalPopper>
      )}
    </AnimatePresence>
  );
};

export default ModalPopper;