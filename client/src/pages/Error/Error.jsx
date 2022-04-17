import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <h1>Not found</h1>

      <Link to='/'>Back home</Link>
    </div>
  );
};

export default Error;
