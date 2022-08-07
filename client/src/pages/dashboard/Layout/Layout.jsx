import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAppContext } from '../../../context/context';
import { FaSearch } from 'react-icons/fa';
import avatar from '../../../assets/user.svg';
import classes from './layout.module.css';

const Layout = () => {
  const { logOut, user } = useAppContext();
  return (
    <>
      <main className={classes.main}>
        <aside className={classes.sidebar}>
          <h1>Bookie</h1>
          <Link to='/dashboard'>Iam reading</Link>
          <Link to='stats'>stats</Link>
          <Link to='allbooks'>all books</Link>
          <Link to='addbook'>add books</Link>
          <Link to='profile'>Profile</Link>
          <button onClick={logOut}>logout</button>
        </aside>
        <div className={classes.wrapper}>
          <nav className={classes['dashboard-nav']}>
            <div className={classes.inputbox}>
              <FaSearch className={classes.icon} />
              <input
                type='text'
                placeholder='Search'
                className={classes.input}
              />
            </div>
            <div className={classes.info}>
              <span>{user.name}</span>
              <img src={avatar} alt='' />
            </div>
          </nav>

          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
