import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppContext } from '../../../context/context';
import classes from './layout.module.css';

const Layout = () => {
  const { logOut, user } = useAppContext();
  return (
    <>
      <main className={classes.main}>
        <nav className={classes.nav}>
          <Link to='stats'>stats</Link>
          <Link to=''>iamreading</Link>
          <button onClick={logOut}>logout</button>

          <h2>hello {user.name}</h2>
        </nav>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
