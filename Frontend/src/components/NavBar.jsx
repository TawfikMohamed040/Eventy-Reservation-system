import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../rtk/slices/credentials-slice';

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.credentials.user);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };

  const getUsernameFromToken = () => {
    return user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  };

  const getRoleFromToken = () => {
    return user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')}>Eventy</div>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        {getRoleFromToken() === 'Admin' && (
          <li><Link to="/eventsDashboard">Dashboard</Link></li>
        )}
      </ul>
      <div className="navbar__actions">
        {user ? (
          <div id="UserLog" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Welcome, {getUsernameFromToken()}</span>
            <button className="navbar__logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login"><button className="navbar__login">Login</button></Link>
            <Link to="/register"><button className="navbar__signup">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
