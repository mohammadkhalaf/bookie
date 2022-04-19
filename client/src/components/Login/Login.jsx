import { useState } from 'react';
import Register from '../Register/Register';
const userObject = {};

const Login = () => {
  const [user, setUser] = useState(userObject);
  const [register, setRegister] = useState(false);

  const changeHandler = (e) => {
    console.log(e.target);
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const toggleHandler = () => {
    setRegister(!register);
  };
  return (
    <div>
      {register && <Register />}
      {!register && (
        <>
          <form onSubmit={submitHandler}>
            <h1>Login</h1>

            <label>
              <span>Email:</span>
              <input type='email' />
            </label>
            <label>
              <span>Password:</span>
              <input type='password' />
            </label>
            <button>Login</button>
            <p>
              Do not have an account
              <button onClick={toggleHandler}>Register here</button>
            </p>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
