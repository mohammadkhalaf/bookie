import classes from './Landing.module.css';
import img from '../../assets/landingimg.svg';

import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const naviagte = useNavigate();

  return (
    <>
      <main className={classes.landingpage}>
        <nav className={classes.nav}>
          <h2>Logo</h2>
        </nav>
        <div className={`${classes.container} ${classes.page}`}>
          <div className={classes.info}>
            <h1>Header</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              ducimus quis qui dolore tempora? Vitae laboriosam, voluptatum nam
              commodi numquam nesciunt eligendi accusamus voluptatibus quod amet
              labore culpa, repellat sed.
            </p>
            <button
              onClick={() => {
                naviagte('/register');
              }}
              className={classes.landingbtn}
            >
              Register/Login{' '}
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
