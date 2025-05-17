import React from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../rtk/slices/account-slice';
import { setCredentials } from '../rtk/slices/credentials-slice';
import { useNavigate } from 'react-router-dom';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.account);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const result = await dispatch(fetchLogin({ userName: username, password })).unwrap();

      localStorage.setItem('token', result.token);

      const user = parseJwt(result.token); 
      dispatch(setCredentials({ token: result.token, user }));

      alert('Login successful');
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>
          Username:
          <input type="text" name="username" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>

        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
