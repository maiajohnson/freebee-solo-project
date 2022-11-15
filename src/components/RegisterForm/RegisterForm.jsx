import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        phoneNum: phoneNum,
      },
    });
  }; // end registerUser

  return (
    <form className="reg-formPanel" onSubmit={registerUser}>
      <h2 className='register-text'>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          <input
            className='reg-username'
            type="text"
            name="username"
            placeholder='Username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          <input
            className="reg-password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
      <label htmlFor="phoneNum">
          <input
            className='phoneNum'
            type="number"
            name="phone_num"
            placeholder='Phone Number'
            value={phoneNum}
            required
            onChange={(event) => setPhoneNum(event.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="reg-btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
