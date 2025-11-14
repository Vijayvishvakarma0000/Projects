import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.css";
function Navbar({ colorTheme, colorChangeTheme }) {
  return (
    <nav className="nav-bar">
      {/* Logo */}
      <Link to="/" className="logo">MyBrand</Link>

      {/* Links */}
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
      </ul>

      {/* Theme toggle button */}
      <button className="btn-back" onClick={colorChangeTheme}>
        {colorTheme ? <IoSunnyOutline /> : <FaMoon />}
      </button>
    </nav>
  );
}

export default Navbar;
