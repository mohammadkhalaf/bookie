import { useState } from 'react';
import { useAppContext } from '../../../context/context';
import Alert from '../../../components/Alert/Alert';
import classes from './profile.module.css';

const Profile = () => {
  const { updateUser, user, displayAlert, alert } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email) {
      displayAlert();
      return;
    }
    updateUser({ name, email });
  };

  return (
    <div className={classes.formcontainer}>
      <form onSubmit={submitHandler} className={classes.form}>
        <h3>Profile</h3>
        {alert && <Alert />}

        <label>
          <span className={classes.title}>Name:</span>
          <input
            type='text'
            value={name}
            name='name'
            className={classes.inputfield}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span className={classes.title}>Email:</span>
          <input
            type='email'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            className={classes.inputfield}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Profile;
