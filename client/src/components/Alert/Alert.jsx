import React from 'react';
import './alert.css';
import { useAppContext } from '../../context/context';

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={`alert ${alertType}`}>{alertText} </div>;
};

export default Alert;
