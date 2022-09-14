import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useAppContext } from '../../context/context';
import classes from './searchbar.module.css';

const SearchContainer = () => {
  const { handleChange, isLoading, search } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;

    handleChange({ name: e.target.name, value: e.target.value });
  };
  return (
    <div className={classes.inputbox}>
      <FaSearch className={classes.icon} />

      <input
        type='text'
        placeholder='Search'
        name='search'
        className={classes.input}
        onChange={handleSearch}
        value={search}
      />
    </div>
  );
};

export default SearchContainer;
