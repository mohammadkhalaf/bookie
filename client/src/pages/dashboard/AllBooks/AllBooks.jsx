import React from 'react';
import BooksContainer from '../../../components/BooksContainer/BooksContainer';
import SearchContainer from '../../../components/searchContainer/SearchContainer';

const AllBooks = () => {
  return (
    <>
      <div>
        <SearchContainer />
        <BooksContainer />
      </div>
    </>
  );
};

export default AllBooks;
