import React from 'react';
import { FaSearch } from 'react-icons/fa';
import classes from './searchbar.module.css';

const SearchContainer = () => {
  return (
    <div className={classes.inputbox}>
      <FaSearch className={classes.icon} />
      <input type='text' placeholder='Search' className={classes.input} />
    </div>
  );
};

export default SearchContainer;
