import classes from './Landing.module.css';
import img from '../../assets/landingimg.svg';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const naviagte = useNavigate();

  return (
    <>
      <main className={classes.landingpage}>
        <nav className={classes.nav}>
          <h1>Bookiee</h1>
        </nav>
        <div className={`${classes.container} ${classes.page}`}>
          <div className={classes.info}>
            <p className={classes.p}>
              Kepp track of all your books and make a habit out of reading!
            </p>
            <p className={classes.p}>Don't go another day without reading</p>
            <button
              onClick={() => {
                naviagte('/register');
              }}
              className={classes.landingbtn}
            >
              Register/Login
            </button>
          </div>

          <div className={classes.imgContainer}>
            <div className={`${classes['main-img']} ${classes.img}`}>
              <img src={img} alt='' />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
