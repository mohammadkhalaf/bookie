import React from 'react';
import { Circle } from 'rc-progress';

import classes from '../BookInfo/Book.module.css';

const Bar = ({ numOfReadPage }) => {
  return (
    <>
      <Circle
        percent={+numOfReadPage}
        trailWidth={7}
        strokeWidth={7}
        trailColor='red'
        strokeColor='#D3D3D3'
        className={classes.bar}
      />
    </>
  );
};

export default Bar;
