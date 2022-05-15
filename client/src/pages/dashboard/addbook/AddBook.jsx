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
    // if (!title || !pages) {
    //   displayAlert();
    //   return
    // }
    if (isEdited) {
      return;
    }
    createBook();
  };

  return (
    <div>
      {alert && <Alert />}
      <form onSubmit={submitHandler}>
        <label>
          <span>Title:</span>
          <input
            type='text'
            value={title}
            name='title'
            onChange={changeHandler}
          />
        </label>
        <label>
          <span>Author:</span>
          <input
            type='text'
            value={author}
            name='author'
            onChange={changeHandler}
          />
        </label>

        <label>
          <span>Pages:</span>
          <input
            type='text'
            value={pages}
            name='pages'
            onChange={changeHandler}
          />
        </label>
        <select onChange={changeHandler} value={genre} name='genre'>
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
