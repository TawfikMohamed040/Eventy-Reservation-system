import './NavBar.css';
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <nav className="navbar">
      
      <div className="navbar__logo">Eventy</div>
      <ul className="navbar__links">
        <li>
          <Link to={"/"}>
            Home
          </Link>
        </li>
        <li>
          <Link to={"/eventsDashboard"}>
            Dashboard
          </Link>
        </li>
      </ul>
      <div className="navbar__actions">

        {/* <div>Welcome , Tawfik040 </div> */}
          {/* <button className="navbar__logout">Logout</button> */}
        
        <Link to={"/login"}>
          <button className="navbar__login">Login</button>
        </Link>
        <Link to={"/register"}>
          <button className="navbar__signup">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}
export default NavBar;