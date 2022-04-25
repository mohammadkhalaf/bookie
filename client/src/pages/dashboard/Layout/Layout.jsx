import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <Link to='stats'>stats</Link>
        <Link to='/'>iamreading</Link>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
