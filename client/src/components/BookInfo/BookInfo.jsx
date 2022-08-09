import React, { useState } from 'react';
import classes from './Book.module.css';
import Modal from '../Modal/Modal';
import Bar from '../Bar/Bar';
import { useAppContext } from '../../context/context';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BookInfo = ({ title, author, pages, _id, hasRead }) => {
  const { user } = useAppContext();

  const numOfReadPage = ((hasRead / pages) * 100).toFixed(0);

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
        />
      )}
      <div className={classes.book}>
        <p>
          Great <span className={classes.highlight}>{user.name}</span> you
          picket <span className={classes.highlight}>{title} </span> a stunning
          book written by <span className={classes.highlight}>{author}</span>
        </p>
        <p>
          Have you read something today? Let us know how mnay pages have you
          accomplished
        </p>

        <button className={classes.btn} onClick={updateStatus}>
          update
        </button>

        <div className={classes.barcontainer}>
          <CircularProgressbar
            value={numOfReadPage}
            styles={buildStyles({
              pathTransitionDuration: 0.5,

              pathColor: `rgba(251, 133, 188, ${numOfReadPage / 100})`,
              textColor: '#484c7f',
            })}
            text={`${numOfReadPage}%`}
          />
        </div>
      </div>
    </>
  );
};

export default BookInfo;
