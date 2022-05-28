import React from 'react';
import { Circle } from 'rc-progress';
import { useAppContext } from '../../context/context';
import classes from '../BookInfo/Book.module.css';

const Bar = ({ numOfReadPage }) => {
  const { test } = useAppContext();
  return (
    <>
      <Circle
        percent={+numOfReadPage}
        trailWidth={7}
        strokeWidth={7}
        trailColor='red'
        strokeColor='#D3D3D3'
        style={{ width: '100px' }}
        className={classes.bar}
      />
    </>
  );
};

export default Bar;
