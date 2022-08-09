import { NavLink } from 'react-router-dom';
import { GiOpenBook } from 'react-icons/gi';
import { IoStatsChartOutline } from 'react-icons/io5';
import { ImBooks } from 'react-icons/im';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import { GoSignOut } from 'react-icons/go';
import classes from './sidebar.module.css';
import { useAppContext } from '../../context/context';

const Sidebar = () => {
  const { logOut } = useAppContext();
  return (
    <aside className={classes.sidebar}>
      <h1>Bookie</h1>

      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.activelink} ${classes.link} `
                : `${classes.link}`
            }
            to='iamreading'
          >
            <GiOpenBook className={classes.sidebaricon} />
            <span>Iam reading</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.activelink} ${classes.link} `
                : `${classes.link}`
            }
            to='stats'
          >
            <IoStatsChartOutline className={classes.sidebaricon} />
            <span>stats</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.activelink} ${classes.link} `
                : `${classes.link}`
            }
            to='allbooks'
          >
            <ImBooks className={classes.sidebaricon} />

            <span>all books</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.activelink} ${classes.link} `
                : `${classes.link}`
            }
            to='addbook'
          >
            <AiOutlineFileAdd className={classes.sidebaricon} />

            <span>add books</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${classes.activelink} ${classes.link} `
                : `${classes.link}`
            }
            to='profile'
          >
            <ImProfile className={classes.sidebaricon} />
            <span>Profile</span>
          </NavLink>
        </li>

        <li onClick={logOut}>
          <GoSignOut />

          <span>Log out</span>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
