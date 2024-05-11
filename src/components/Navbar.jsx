import { useContext, useState } from 'react';
import '../css/Navbar.css'; // Importing CSS file for styling
import { GlobalContext } from '../context/Context';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { isLogin, userData } = useContext(GlobalContext);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src='./logo.png' alt='logo'></img>
          </a>
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          {/* Hamburger menu icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M2 6h20v2H2zm0 5h20v2H2zm0 5h20v2H2z" />
          </svg>
        </div>
        <ul className={`nav-menu ${showMenu ? 'show' : ''}`}>
          <li className="nav-item">
            <a href="/" className="nav-link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="/blog" className="nav-link">Blog</a>
          </li>
          {
            isLogin ? <p className='userOnNav'>{userData.name}</p>:null
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
