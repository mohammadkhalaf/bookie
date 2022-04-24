import { useState, useEffect } from 'react';

import classes from './Register.module.css';
import Input from '../Input/Input';
import Alert from '../Alert/Alert';
import { useAppContext } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const userObject = {
  name: '',
  email: '',
  password: '',
  isRegistered: false,
};

const Register = () => {
  const [values, setUser] = useState(userObject);
  const { isLoading, alert, displayAlert, registerUser, user, loginUser } =
    useAppContext();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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
        navigate('/home');
      }, 3000);
    }
  }, [user, navigate]);

  const toggleHandler = () => {
    setUser({ ...values, isRegistered: !values.isRegistered });
  };
  return (
    <div>
      <>
        <form onSubmit={submitHandler}>
          <h1>{values.isRegistered ? 'Login' : 'Register'}</h1>
          {alert && <Alert />}
          {!values.isRegistered && (
            <Input
              style={classes.input}
              labelText='Name'
              name='name'
              changeHandler={changeHandler}
              value={values.name}
              type='text'
            />
          )}

          <Input
            labelText='Email'
            name='email'
            changeHandler={changeHandler}
            value={values.email}
            type='email'
            style={classes.input}
          />
          <Input
            labelText='Password'
            name='password'
            changeHandler={changeHandler}
            value={values.password}
            type='password'
            style={classes.input}
          />

          <button onClick={submitHandler} disabled={isLoading}>
            {!values.isRegistered ? 'Register' : 'Login'}
          </button>
        </form>
        <p>
          {!values.isRegistered
            ? 'Do you have an account?'
            : 'Do not you have an account?'}
          <button onClick={toggleHandler}>
            {values.isRegistered ? 'Register' : 'Login'}
          </button>
        </p>
      </>
    </div>
  );
};

export default Register;
