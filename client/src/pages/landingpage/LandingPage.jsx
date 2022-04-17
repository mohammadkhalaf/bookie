import classes from './Landing.module.css';
import book from '../../assets/landingimg.png';
import Register from '../../components/Register/Register';
import { useState } from 'react';

const LandingPage = () => {
  const [register, setRegister] = useState(false);
  const RegisterHandler = () => {
    setRegister(!register);
  };
  return (
    <>
      {/* <nav className={classes.nav}>
        <h1>header</h1>
      </nav> */}
      <main className={classes.landingpage}>
        <div className={classes.info}>
          {register && <Register />}
          {!register && (
            <>
              <h1>Header</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem,
                rerum fugiat distinctio fuga aperiam laudantium. Eveniet,
                accusantium aspernatur. Quisquam, blanditiis!
              </p>
              <button onClick={RegisterHandler}>Start</button>
            </>
          )}
        </div>
        <div className={classes.imgContainer}>
          <div className={classes.img}>
            <img src={book} alt='' />
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
