import React, { useEffect } from 'react';
import BookInfo from '../../../components/BookInfo/BookInfo';
import Loading from '../../../components/Loading/Loading';
import classes from './iamReading.module.css';
import { useAppContext } from '../../../context/context';

const IamReading = () => {
  const { getAllBooks, books, isLoading } = useAppContext();

  useEffect(() => {
    getAllBooks();
    // eslint-disable-next-line
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (
    books.filter((b) => b.isReading === true && b.pages !== b.hasRead)
      .length === 0
  ) {
    return (
      <h1 className={classes.header}>
        You have not read any book yet!!. Grab a book and enjoy reading
      </h1>
    );
  }

  return (
    <div>
      {books &&
        books
          .filter((b) => b.isReading === true && b.pages !== b.hasRead)
          .map((book) => {
            return <BookInfo {...book} key={book._id} />;
          })}
    </div>
  );
};

export default IamReading;
