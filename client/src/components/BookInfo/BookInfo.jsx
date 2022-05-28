import React, { useState } from 'react';
import classes from './Book.module.css';
import Modal from '../Modal/Modal';
import Bar from '../Bar/Bar';
import { useAppContext } from '../../context/context';

const BookInfo = ({ title, author, pages, _id, hasRead }) => {
  // const [num, setNumb] = useState(((hasRead / pages) * 100).toFixed(0));
  // const [num, setNumb] = useState(20);
  // console.log(num);

  const numOfReadPage = ((hasRead / pages) * 100).toFixed(0);
  // console.log(test);
  // console.log(numOfReadPage);

  const [showModal, setShowModal] = useState(false);

  const updateStatus = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal
          updateStatus={updateStatus}
          pages={pages}
          hasRead={hasRead}
          id={_id}
          // setNumb={setNumb}
        />
      )}
      <div className={classes.book}>
        <h1>{title}</h1>
        <h1>{author}</h1>
        <h1> {hasRead}</h1>
        <h1> {pages}</h1>
        <p>you have completed {numOfReadPage}%</p>
        {/* <div className={classes.bar}>
          <div
            className={classes.line}
            style={{ width: `${numOfReadPage}%` }}
          ></div>
        </div> */}
        <Bar numOfReadPage={numOfReadPage} />
        <button onClick={updateStatus}>update</button>
      </div>
    </>
  );
};

export default BookInfo;
