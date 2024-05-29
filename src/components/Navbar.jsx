import { useContext, useState, useEffect } from 'react';
import '../css/Navbar.css'; // Importing CSS file for styling
import { logOut } from '../appwrite/appwriteFun';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';
import Logo from '../assets/logo.png'
import ProfilePic from '../assets/profile-pic-modified.png'
const Navbar = () => {
  const { setIsLogin, userData, isLogin, } = useContext(GlobalContext)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    console.log(isLogin, "component loaded");
  }, [isLogin]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  function logOutBtn() {
    logOut().then(() => {
      navigate("/")
      console.log("logout successefuly")
      setIsLogin(false);
    })
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src={Logo} draggable="false" alt='logo'></img>
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

          {
            isLogin ? <>
              <div className='user-navbar-info-div'>

                <li className="nav-item"><a href="/create-post">Create</a></li>
                <li className="nav-item user-navbar-info" onClick={toggleDropdown}>
                  <p className='usernav'>{userData?.name}</p>
                  <img src={ProfilePic} alt="Pro" />
                  {isDropdownOpen && (
                    <ul className='navbar-user-dropdown'>
                      <li>Account</li>
                      <li className="nav-item">
                        <a href="/my-blogs" >My Blogs</a>
                      </li>
                      <li className='logoutBtn' onClick={logOutBtn}><p>Logout</p></li>
                    </ul>
                  )}
                </li>
              </div>
            </> :
              <li className='sign-in'><a href="/register">Sign In</a></li>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
