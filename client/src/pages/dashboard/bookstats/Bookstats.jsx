import React from 'react';
import { useEffect } from 'react';
import { useAppContext } from '../../../context/context';

const Bookstats = () => {
  const { getAllBooks } = useAppContext();
  useEffect(() => {
    getAllBooks();
  }, []);
  return <div>Bookstats</div>;
};

export default Bookstats;
