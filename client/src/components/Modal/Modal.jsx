import React, { useState, useRef } from 'react';
import { useAppContext } from '../../context/context';

import classes from './Modal.module.css';

const Modal = ({ updateStatus, pages, hasRead, id, read, setNumb }) => {
  const { test } = useAppContext();
  console.log(hasRead);
  console.log(id);

  const { updateReadPages } = useAppContext();
  const inputEl = useRef(null);
  const closeModal = () => {
    updateStatus();
  };
  console.log(hasRead);

  const updatePages = () => {
    if (Number(inputEl.current.value) <= 0) {
      console.log('number should be more than 0');
    } else if (Number(inputEl.current.value) + hasRead > pages) {
      console.log(`number should not  be more than${pages} `);
    } else {
      updateReadPages(+inputEl.current.value + hasRead, id);
      // setNumb(
      //   1 *
      //     (((Number(inputEl.current.value) + hasRead) / pages) * 100).toFixed(0)
      // );
      // setNumb(+inputEl.current.value);

      // console.log(
      //   (((Number(inputEl.current.value) + hasRead) / pages) * 100).toFixed(10)
      // );
      closeModal();
    }
  };
  console.log('modal');
  return (
    <>
      <div className={classes.modal}>
        <div className={classes.overlay} onClick={closeModal}></div>
        <div className={classes.modalContent}>
          <button onClick={closeModal}>x</button>
          {!read && <input type='number' min={0} ref={inputEl} />}
          <div>
            <button onClick={updatePages}>Update pages</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
