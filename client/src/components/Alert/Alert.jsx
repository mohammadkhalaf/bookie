import React from 'react';
import { useAppContext } from '../../context/context';

const Alert = () => {
  const { alertType, alertText } = useAppContext();
  return <div className={alertType}>{alertText}</div>;
};

export default Alert;
