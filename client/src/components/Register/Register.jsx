import { useState } from 'react';
import Login from '../Login/Login';
const userObject = {};

const Register = () => {
  const [user, setUser] = useState(userObject);
  const [register, setRegister] = useState(true);

  const changeHandler = (e) => {
    console.log(e.target);
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const toggleHandler = () => {
    setRegister(!register);
    console.log('s');
  };
  return (
    <div>
      {register && <Login />}
      {!register && (
        <>
          <form onSubmit={submitHandler}>
            <h1>Register</h1>
            <label>
              <span>Name:</span>
              <input type='text' />
            </label>
            <label>
              <span>Email:</span>
              <input type='email' />
            </label>
            <label>
              <span>Password:</span>
              <input type='password' />
            </label>
            <label>
              <span>Confirm Password:</span>
              <input type='password' />
            </label>
            <button>Register</button>
            <p>
              Do you have an account?
              <button onClick={toggleHandler}>Login</button>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Register;
