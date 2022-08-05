import classes from './Landing.module.css';
import img from '../../assets/landingimg.svg';
import Register from '../../components/Register/Register';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [register, setRegister] = useState(false);
  const RegisterHandler = () => {
    setRegister(!register);
  };
  const getData = async () => {
    try {
      const res = await fetch('/test');
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {/* <nav className={classes.nav}>
        <h1>header</h1>
      </nav> */}
      <main className={classes.landingpage}>
        <nav>
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
            <button className={classes.landingbtn}>Register/Login </button>
          </div>
          {/* <div className={classes.info}>
            {register && <Register />}
            {!register && (
              <>
                <h1>Header</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Autem, rerum fugiat distinctio fuga aperiam laudantium.
                  Eveniet, accusantium aspernatur. Quisquam, blanditiis!
                </p>
                <button onClick={RegisterHandler}>Start</button>
              </>
            )}
          </div> */}
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
