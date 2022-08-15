import React, { useEffect } from 'react';
import Loading from '../Loading/Loading';
import Book from '../Book/Book';
import { useAppContext } from '../../context/context';
import classes from './bookcontainer.module.css';

const BooksContainer = () => {
  const { getAllBooks, books, isLoading, alert, alertText } = useAppContext();

  useEffect(() => {
    getAllBooks();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (books.length === 0) {
    return <h2>There are no books here!!!</h2>;
  }
  return (
    <>
      {alert && <p className={classes.alertText}> {alertText}</p>}

      <div className={classes.container}>
        {books.map((book) => {
          return <Book key={book._id} {...book} />;
        })}
      </div>
    </>
  );
};

export default BooksContainer;
