import React from 'react';
import './Register.css';

function Register() {
    return (
        <div className="register">
            <form>
                <div className='register-header'>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
