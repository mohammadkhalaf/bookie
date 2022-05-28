import React, { useState } from 'react';
import moment from 'moment';
import classes from './Book.module.css';

import { useAppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

const Book = ({ title, createdAt, _id, isReading, author, pages, hasRead }) => {
  const [read, setRead] = useState(false);
  const { startReading } = useAppContext();
  const date = moment(createdAt).format('MMM Do YY');
  const navigate = useNavigate();
  const readBookHandler = () => {
    startReading(_id);
    navigate('/dashboard');
  };

  return (
    <>
      {/* {read && <Modal read={read} />} */}
      <div className={classes.book}>
        <h2>{title}</h2>
        <p>{author}</p>
        <h2>{date}</h2>
        <button>Delete</button>
        {hasRead !== pages && (
          <button disabled={isReading} onClick={() => readBookHandler()}>
            {isReading ? 'You`re currently reading ' : 'Start reading'}
          </button>
        )}

        <p>{hasRead === pages && <span>You have finished this book</span>} </p>
      </div>
    </>
  );
};

export default Book;
