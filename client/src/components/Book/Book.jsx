import React, { useEffect } from 'react';
import moment from 'moment';
import classes from './Book.module.css';

import { useAppContext } from '../../context/context';

const Book = ({ title, createdAt, _id, isReading }) => {
  const { startReading, isLoading, getAllBooks } = useAppContext();
  const date = moment(createdAt).format('MMM Do YY');
  useEffect(() => {}, [startReading]);

  return (
    <>
      <div className={classes.book}>
        <h2>{title}</h2>
        <h2>{date}</h2>
        <button>Delete</button>
        <button disabled={isReading} onClick={() => startReading(_id)}>
          start reading
        </button>
      </div>
    </>
  );
};

export default Book;
