//betterreads/routes/auth.js

import { Link, useNavigate } from 'react-router-dom';
import * as userService from '../../utilities/users-service';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    userService.logOut();
    setUser(null);
    navigate('/');
  }

  function handleLogoClick() {
    if (user) {
      navigate('/');
    } else {
      navigate('/');
    }
  }

  return (
    <nav className="navbar">
      <img
        src="/images/Logo.png"
        alt="Logo"
        onClick={handleLogoClick}
        className="logo"
      />
      <div className="nav-links">
        <Link to="/books">My Books</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/search">Search Books</Link>
        <span>Welcome, {user.name}</span>
        <Link to="" onClick={handleLogOut}>
          Log Out
        </Link>
      </div>
    </nav>
  );
}
