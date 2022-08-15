import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../../../context/context';
import classes from './addbook.module.css';
import Alert from '../../../components/Alert/Alert';

const AddBook = () => {
  const {
    alert,
    title,
    author,
    status,
    statusOptions,
    genre,
    pages,
    isEdited,
    handleChange,
    displayAlert,
    clearInputs,
    createBook,
    types,
  } = useAppContext();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    handleChange(name, value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (!title || !author || !pages || !genre || pages <= 0) {
      console.log('some hting is wrng');
      return;
    }
    createBook();
  };

  return (
    <div className={classes.formcontainer}>
      {alert && <Alert />}
      <h2>Add a book</h2>
      <form onSubmit={submitHandler} className={classes.form}>
        <label>
          <span className={classes.title}>Title:</span>
          <input
            type='text'
            value={title}
            name='title'
            onChange={changeHandler}
            className={classes.inputfield}
          />
        </label>
        <label>
          <span className={classes.title}>Author:</span>
          <input
            type='text'
            value={author}
            name='author'
            onChange={changeHandler}
            className={classes.inputfield}
          />
        </label>

        <label>
          <span className={classes.title}>Pages:</span>
          <input
            type='text'
            value={pages}
            name='pages'
            onChange={changeHandler}
            className={classes.inputfield}
          />
        </label>
        <select
          onChange={changeHandler}
          className={classes.inputfield}
          value={genre}
          name='genre'
        >
          {types.map((g, index) => {
            return (
              <option value={g} key={index} name={g}>
                {g}
              </option>
            );
          })}
        </select>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddBook;
