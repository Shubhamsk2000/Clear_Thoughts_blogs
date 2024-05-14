import { useContext, useState } from 'react';
import '../css/Navbar.css'; // Importing CSS file for styling
import { logOut } from '../appwrite/appwriteFun';
import { useNavigate } from 'react-router';
import { GlobalContext } from '../context/Context';
const Navbar = ({ isLoginProp = false, userDataProp }) => {
  const {setIsLogin} = useContext(GlobalContext)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  function logOutBtn(){
    logOut().then(()=>{
      navigate("/")
      console.log("logout successefuly")
      setIsLogin(false);
    })
  }

  console.log(isLoginProp, userDataProp, "inside prope")
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <a href="/">
            <img src='./logo.png' draggable="false" alt='logo'></img>
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
            isLoginProp ? <>
              <li className="nav-item"><a href="/create-post">Create</a></li>
              <li className="nav-item" onClick={toggleDropdown}>
                <p className='usernav'>{userDataProp?.name}</p>
                {isDropdownOpen && (
                  <ul>
                    <li>Account</li>
                    <li className='logoutBtn' onClick={logOutBtn}>Logout</li>
                  </ul>
                )}
              </li>
            </> :
              <li className='sign-in'><a href="/register">Sign In</a></li>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
