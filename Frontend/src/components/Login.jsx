import React from 'react';
import'./Login.css'; // Import your CSS file
function Login() {
  return (
    <div className="login-container">
       <form className="login-form">
         <h1>Login</h1>
         <label>
           Username:
           <input type="text" name="username" />
         </label>
         <label>
           Password:
           <input type="password" name="password" />
         </label>
         <button type="submit">Register</button>
       </form>
     </div>
  );
}

export default Login;