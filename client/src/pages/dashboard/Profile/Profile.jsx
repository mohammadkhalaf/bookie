import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../../../context/context';
import Alert from '../../../components/Alert/Alert';

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
    <div>
      <form onSubmit={submitHandler}>
        <h3>Profile</h3>
        {alert && <Alert />}

        <label>
          <span>Name:</span>
          <input
            type='text'
            value={name}
            name='name'
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type='email'
            value={email}
            name='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button>Update</button>
      </form>
    </div>
  );
};

export default Profile;
