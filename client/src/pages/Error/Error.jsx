import React from 'react';
import { Link } from 'react-router-dom';
import error from '../../assets/error.svg';
import classes from './Error.module.css';

const Error = () => {
  return (
    <div className={classes.page}>
      <div className={classes.imgcontainer}>
        <img src={error} alt='' className={classes.img} />
      </div>
      <p className={classes.text}>Ohh! Page Not Found</p>

      <Link className={classes.btn} to='/landing'>
        Back home
      </Link>
    </div>
  );
};

export default Error;
