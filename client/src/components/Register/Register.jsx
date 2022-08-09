import { useState, useEffect } from 'react';

import classes from './Register.module.css';

import Alert from '../Alert/Alert';
import { useAppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import FormRow from '../formrow/Formrow';

const userObject = {
  name: '',
  email: '',
  password: '',
  isRegistered: true,
};

const Register = () => {
  const [values, setUser] = useState(userObject);
  const { isLoading, alert, displayAlert, registerUser, user, loginUser } =
    useAppContext();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser({ ...values, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password, isRegistered } = values;
    if (!password || !email || (!isRegistered && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isRegistered) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/dashboard/iamreading');
      }, 3000);
    }
  }, [user, navigate]);

  const toggleHandler = () => {
    setUser({ ...values, isRegistered: !values.isRegistered });
  };
  return (
    <div className={classes.page}>
      <>
        <form className={classes.form} onSubmit={submitHandler}>
          <h3>{values.isRegistered ? 'Login' : 'Register'}</h3>
          {alert && <Alert />}
          {!values.isRegistered && (
            <FormRow
              labelText='Name'
              name='name'
              changeHandler={changeHandler}
              value={values.name}
              type='text'
            />
          )}

          <FormRow
            labelText='Email'
            name='email'
            changeHandler={changeHandler}
            value={values.email}
            type='email'
          />
          <FormRow
            labelText='Password'
            name='password'
            changeHandler={changeHandler}
            value={values.password}
            type='password'
          />

          <button
            onClick={submitHandler}
            className={classes.submitbtn}
            disabled={isLoading}
          >
            {!values.isRegistered ? 'Register' : 'Login'}
          </button>
        </form>
        <p>
          {!values.isRegistered
            ? 'Do you have an account?'
            : 'Do not you have an account?  '}
          <button onClick={toggleHandler} className={classes.btn}>
            {values.isRegistered ? 'Register' : 'Login'}
          </button>
        </p>
      </>
    </div>
  );
};

export default Register;
