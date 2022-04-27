import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppContext } from '../../../context/context';
import classes from './layout.module.css';

const Layout = () => {
  const { logOut } = useAppContext();
  return (
    <>
      <main className={classes.main}>
        <nav className={classes.nav}>
          <Link to='stats'>stats</Link>
          <Link to=''>iamreading</Link>
          <button onClick={logOut}>logout</button>
        </nav>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
