import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { useAppContext } from '../../context/context';
import classes from './pagination.module.css';

const PaginationContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const next = () => {
    let newPage = page + 1;
    if (newPage > 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  const prev = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };
  return (
    <>
      <div>
        <button onClick={prev} className={classes.prev}>
          <FiChevronLeft />
        </button>
        <div className={classes.btns}>
          {pages.map((b, index) => {
            return (
              <button onClick={() => changePage(b)} key={index}>
                {b}
              </button>
            );
          })}
        </div>

        <button onClick={next} className={classes.next}>
          <FiChevronRight />
        </button>
      </div>
    </>
  );
};

export default PaginationContainer;
