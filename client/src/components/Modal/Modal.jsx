import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../context/context';

import classes from './Modal.module.css';
import { useState } from 'react';

const Modal = ({ updateStatus, pages, hasRead, id }) => {
  const [err, setError] = useState('');
  const { updateReadPages } = useAppContext();
  const inputEl = useRef(null);
  const closeModal = () => {
    updateStatus();
  };
  const readingDiff = pages - hasRead;

  const updatePages = () => {
    if (Number(inputEl.current.value) <= 0) {
      setError('The number should be more than 0');
    } else if (Number(inputEl.current.value) + hasRead > pages) {
      setError(`number should not  be more than${readingDiff} `);
    } else {
      updateReadPages(+inputEl.current.value + hasRead, id);

      closeModal();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 2000);
  }, [err]);

  return (
    <>
      <div className={classes.modal}>
        <div className={classes.overlay} onClick={closeModal}></div>
        <div className={classes.modalContent}>
          <p>Well done! Insert the number of pages that you read today</p>

          <input
            className={classes.inputfield}
            type='number'
            min={0}
            ref={inputEl}
          />

          {err && <span className={classes.error}>{err}</span>}
          <div className={classes.btncontainer}>
            <button className={classes.closebtn} onClick={closeModal}>
              Close
            </button>
            <button className={classes.updatebtn} onClick={updatePages}>
              Update pages
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
