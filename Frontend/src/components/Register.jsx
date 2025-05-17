import React, { useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from '../rtk/slices/account-slice';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.account);

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!username || !email || !password) {
      alert('All fields are required.');
      return;
    }

    dispatch(fetchRegister({ userName: username, email, password }));
  };

  useEffect(() => {
    if (status === 'succeeded') {
      alert('Registered successfully!');
      navigate('/login');
    }
  }, [status, navigate]);

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="register-header">
          <h1>Register</h1>
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Registering...' : 'Register'}
        </button>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </form>
    </div>
  );
}

export default Register;
