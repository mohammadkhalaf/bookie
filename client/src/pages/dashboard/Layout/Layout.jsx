import SearchContainer from '../../../components/searchContainer/SearchContainer';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../../context/context';

import avatar from '../../../assets/user.svg';
import classes from './layout.module.css';
import Sidebar from '../../../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const { user } = useAppContext();
  const location = useLocation();
  let showSearch = location.pathname === '/dashboard/allbooks' ? true : null;

  return (
    <>
      <main className={classes.main}>
        <div className={`${classes.sidebar} ${classes.show}`}>
          <Sidebar />
        </div>

        <div className={classes.wrapper}>
          <nav className={classes['dashboard-nav']}>
            {showSearch && <SearchContainer />}

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
