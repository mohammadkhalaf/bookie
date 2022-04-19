import { useState } from 'react';

import classes from './Register.module.css';
import Input from '../Input/Input';
import Alert from '../Alert/Alert';
import { useAppContext } from '../../context/context';
const userObject = {
  name: '',
  email: '',
  password: '',
  isRegistered: false,
};

const Register = () => {
  const [user, setUser] = useState(userObject);
  const { isLoading, alert, displayAlert } = useAppContext();

  const changeHandler = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const { name, email, password, isRegistered } = user;
    if (!password || !email || (!isRegistered && !name)) {
      displayAlert();
      return;
    } else {
      console.log(user);
    }
  };
  const toggleHandler = () => {
    setUser({ ...user, isRegistered: !user.isRegistered });
  };
  return (
    <div>
      <>
        <form onSubmit={submitHandler}>
          <h1>{user.isRegistered ? 'Login' : 'Register'}</h1>
          {alert && <Alert />}
          {!user.isRegistered && (
            <Input
              style={classes.input}
              labelText='Name'
              name='name'
              changeHandler={changeHandler}
              value={user.name}
              type='text'
            />
          )}

          <Input
            labelText='Email'
            name='email'
            changeHandler={changeHandler}
            value={user.email}
            type='email'
            style={classes.input}
          />
          <Input
            labelText='Password'
            name='password'
            changeHandler={changeHandler}
            value={user.password}
            type='password'
            style={classes.input}
          />

          <button onClick={submitHandler}>
            {!user.isRegistered ? 'Register' : 'Login'}
          </button>
          <p>
            {!user.isRegistered
              ? 'Do you have an account?'
              : 'Do not you have an account?'}
            <button onClick={toggleHandler}>
              {user.isRegistered ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </>
    </div>
  );
};

export default Register;
